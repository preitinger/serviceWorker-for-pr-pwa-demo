/// <reference no-default-lib="true"/>
/// <reference lib="esnext" />
/// <reference lib="webworker" />

import { GetVersionReq, logMessages, TGetVersionRes } from "./messages";
import { PushData } from "./PushData";

export type { };

// NOTE: We must export or import at least one thing so we are not in
// the "global" scope, but in a module scope which is re-declarable.
//
// The error from tsserver is: 2451: Cannot redeclare block-scoped
// variable 'self'.
//
// Even though this is not really a module and cannot be: ServiceWorkers
// cannot be modules.



type Version = number
const MANIFEST_PATH = '/manifest.webmanifest'

const version: Version = 109

declare const self: ServiceWorkerGlobalScope;

console.debug = () => { }
console.info('Custom service worker functions for pr-newsletter: version=', version);

const CACHE_PREFIX = 'pr-newsletter-cache-';

type TCacheState = {
    oldCache: number | null;
    newCache: number | null;
}

function cacheName(index: number) {
    if (index < 0 || index > 2) throw new Error('cache index not between 0 and 2');
    return CACHE_PREFIX + index;
}

async function cacheState_detect(): Promise<TCacheState> {
    const s: TCacheState = {
        oldCache: null,
        newCache: null,
    }
    const has0 = caches.has(cacheName(0))
    const has1 = caches.has(cacheName(1))
    const has2 = caches.has(cacheName(2))
    if (await has0) {
        if (await has1) {
            if (await has2) {
                console.error('Undefined cache state because all 3 cache indexes in use!');
                caches.delete(cacheName(2)); // for the sake of robustness, but should never happen, or if worker is installed, then stopped, and then activated?
            }

            s.oldCache = 0;
            s.newCache = 1;
        } else {
            if (await has2) {
                s.oldCache = 2;
                s.newCache = 0;
            } else {
                s.oldCache = null;
                s.newCache = 0;
            }
        }
    } else {
        if (await has1) {
            if (await has2) {
                s.oldCache = 1;
                s.newCache = 2;
            } else {
                s.oldCache = null;
                s.newCache = 1;
            }
        } else {
            if (await has2) {
                s.oldCache = null;
                s.newCache = 2;
            } else {
                s.oldCache = null;
                s.newCache = null;
            }
        }
    }

    return s;
}

// TODO cacheState_cycle in install event handler aufrufen
function cacheState_cycle(s0: TCacheState): TCacheState {
    if (s0.newCache == null) {
        if (s0.oldCache != null) throw new Error('Illegal cache state: newCache null, but oldCache not null');
        return {
            oldCache: null,
            newCache: 0
        }
    } else {
        if (s0.oldCache != null) {
            if (s0.newCache !== (1 + s0.oldCache) % 3) throw new Error('Illegal cache state: oldCache=' + s0.oldCache + ' and newCache=' + s0.newCache);
            // console.debug('delete cache ', cacheName(s0.oldCache));
            // caches.delete(cacheName(s0.oldCache));
        }
        return {
            oldCache: s0.newCache,
            newCache: (1 + s0.newCache) % 3
        }
    }
}

function myAssert(x: boolean): asserts x {
    if (!x) throw new Error('myAssert failed');
}

let cacheState = cacheState_detect();

function fetchNetworkFirst(request: Request): Promise<Response> {
    const fetchedResponse = fetch(request);

    return cacheState.then(s => {
        myAssert(s.newCache != null);
        return caches.open(cacheName(s.newCache)).then(newCache => {
            return fetchedResponse.then(response => {
                if (!response.ok) throw new Error('network response not ok')
                newCache.put(request, response.clone());
                return response;
            }).catch(reason => {
                console.error('network fetch failed, gonna take from new cache or old cache...', reason);
                return newCache.match(request).then(response => {
                    if (response != undefined) {
                        // console.debug('response from new cache', response)
                        console.debug(request.url, 'found in new cache');
                        return response;
                    }
                    console.debug(request.url, 'not found in new cache, old cache...');
                    // try old cache
                    if (s.oldCache == null) {
                        console.error('no old cache, so no response for', request.url);
                        return Response.error();
                    }
                    return caches.open(cacheName(s.oldCache)).then(oldCache => {
                        return oldCache.match(request).then(response => {
                            if (response != undefined) {
                                // console.debug('response from old cache put to new cache', response)
                                console.debug(request.url, 'found in old cache (and put into new cache)')
                                newCache.put(request, response.clone());
                                return response;
                            } else {
                                console.error('not in old cache, so no response for', request.url);
                                return Response.error();
                            }
                        })
                    })
                })
            })
        })
    })
}

// function fetchAndCache(request: Request) {
//     console.debug('fetch headers for ', request.url);
//     request.headers.forEach((val, key) => {
//         console.debug('request header', key, ': ', val);
//     })
//     const isOnline = self.navigator.onLine;

//     console.debug('fetch ', request.url, request.cache);
//     return fetch(request)
//         .then(response => {
//             if (!response.ok) {
//                 throw Error('Network response was not ok.');
//             }
//             const responseToCache = response.clone();
//             caches.open('my-cache').then(cache => {
//                 cache.put(request, responseToCache);
//                 responseToCache.headers.forEach((val, key) => {
//                     console.debug('response header: ', key, ':', val);
//                 })
//                 const dateStr = responseToCache.headers.get('date');

//                 if (dateStr != null) {
//                     const date = new Date(dateStr);
//                     console.debug('date as string', dateStr, 'hours', date.getHours(), 'mins', date.getMinutes(), 'secs', date.getSeconds());
//                 } else {
//                     console.warn('date header null!');
//                 }
//                 console.debug('typeof date header', typeof (dateStr));
//                 console.debug('RESPONSE url, cache-control, last-modified', responseToCache.url, responseToCache.headers.get('cache-control'), responseToCache.headers.get('last-modified'));
//                 console.debug('put to cache the response for request', request, 'response', response);
//             });
//             return response;
//         })
//         .catch(() => {
//             const res = caches.match(request)
//             res.then(r => {
//                 console.debug('response from cache for request', request, ' - response: ', r);
//             })
//             return res;
//         });
// }

self.addEventListener('fetch', event => {
    // neu:
    if (event.request.method !== 'GET') return;
    if (event.request.url.includes('?_rsc=')) {
        console.debug('default behavior for', event.request.url);
        return; // default behavior
    }

    if (event.request.url.includes(MANIFEST_PATH)) {
        return event.respondWith(fetchNetworkFirst(event.request));
    }

    if (event.request.url.includes('hot-update')) {
        return; // default behavior
    }

    const selfHost = self.location.host;
    const url = new URL(event.request.url);
    console.debug('fetch', url.toString());
    const isOwnHost = selfHost === url.host;
    // console.debug('selfHost', selfHost, 'url.host', url.host);
    if (!isOwnHost) {
        return; // default browser behavior
    }

    const res = cacheState.then(s => {
        // console.debug('fetch: cacheState=', s);
        if (s.newCache == null) return Response.error()
        const newCacheProm = caches.open(cacheName(s.newCache))
        const res = newCacheProm.then(newCache => {
            const res = newCache.match(event.request).then(response => {
                if (response != undefined) {
                    // console.debug('response from new cache', response)
                    console.debug(event.request.url, 'found in new cache');
                    return response;
                }
                console.debug(event.request.url, 'not found in new cache, old cache...');
                // try old cache
                if (s.oldCache == null) {
                    return fetchFromNetworkPutToNewCache()
                }
                const res = caches.open(cacheName(s.oldCache)).then(oldCache => {
                    return oldCache.match(event.request).then(response => {
                        if (response != undefined) {
                            const etag = response.headers.get('ETag');
                            if (etag == null) return fetchFromNetworkPutToNewCache();
                            const newRequest = new Request(event.request);
                            newRequest.headers.set('If-None-Match', etag);
                            console.debug('fetch with If-None-Match for', event.request.url, 'new request object', newRequest);
                            return fetch(newRequest).then(networkResponse => {
                                if (networkResponse.ok) {
                                    console.debug('ok response, put it to newCache ', networkResponse.url)
                                    newCache.put(event.request, networkResponse.clone())
                                    return networkResponse;
                                } else if (networkResponse.status === 304) {
                                    console.debug('304 response, return stale entry of old cache, but do not put it to new cache')
                                    return response;
                                } else {
                                    throw new Error('Unexpected network response status: ' + networkResponse.status);
                                }
                            })
                        } else {
                            return fetchFromNetworkPutToNewCache();
                        }
                    })
                })
                return res;
            })
            return res;

            function fetchFromNetworkPutToNewCache(): Response | PromiseLike<Response> {
                console.debug('fetch from network', event.request.url);
                const res = fetch(event.request).then(response => {
                    if (!response.ok) throw new Error('network response was not ok for: ' + event.request.url);
                    // console.debug('response from network put to new cache', response);
                    console.debug(event.request.url, 'got by network (and put into new cache');
                    newCache.put(event.request, response.clone());
                    return response;
                });
                return res;
            }
        })
        return res;
    })


    event.respondWith(res);

    // erster geh-versuch war folgendes:

    // nicht ganz so gut denke ich da respondWith auch aufgerufen wird wenn nichts gefunden wird aber dann sollte normal fortgefahren werden
    // switch (event.request.cache) {
    //     case 'default':
    // }
    // event.respondWith(
    //     fetchAndCache(event.request).catch(() => {
    //         return caches.match(event.request).then(cachedResponse => {
    //             if (cachedResponse) {
    //                 return cachedResponse;
    //             }
    //             // Optional: Return a default fallback page for certain requests
    //             if (event.request.mode === 'navigate') {
    //                 return caches.match('/offline.html');
    //             }
    //         });
    //     })
    // );
});


const CACHE_NAME = 'pr-newsletter-cache_v1'
const PRE_CACHE = ['/', '/favicon.ico', '/manifest.webmanifest']
const PRE_CACHE2: string[] = [
    // "/_next/static/chunks/117-e2e453979b05c14c.js"
    // , "/_next/static/chunks/139-358b2cb6930bb649.js"
    // , "/_next/static/chunks/821-15c475abf6aee938.js"
    // , "/_next/static/chunks/889-38e65d1e11cf0d72.js"
    // , "/_next/static/chunks/972-354db0c52b4639ba.js"
    // , "/_next/static/chunks/app/install/page-28a37d307b193e9d.js"
    // , "/_next/static/chunks/app/layout-a28c289a9fe378a0.js"
    // , "/_next/static/chunks/app/newsletterSettings/page-3a93d75f682b638d.js"
    // , "/_next/static/chunks/app/_not-found/page-acf7c1e8ed93a8f9.js"
    // , "/_next/static/chunks/app/overview/page-2c3be4ab46170cd9.js"
    // , "/_next/static/chunks/app/page-1b1718be1be69873.js"
    // , "/_next/static/chunks/app/verify-email/[email]/[secret]/page-c3934906379f5d1e.js"
    // , "/_next/static/chunks/fd9d1056-ee845b033c65438d.js"
    // , "/_next/static/chunks/main-app-8e1f1dc68201c22b.js"
    // , "/_next/static/chunks/webpack-e4a661ced2e0834a.js"
    // , "/_next/static/css/27b4d6b789fddb24.css"
    // , "/_next/static/css/e5f550f3c35a9c69.css"
]

self.addEventListener('install', e => {
    // console.debug('handling install event for version', version);
    // self.skipWaiting();

    e.waitUntil(
        cacheState.then(s => {
            s = cacheState_cycle(s)
            cacheState = Promise.resolve(s)
            const allToCache = [...PRE_CACHE, ...PRE_CACHE2];
            myAssert(s.newCache != null);
            return caches.open(cacheName(s.newCache)).then(cache => {
                let next = 0;
                function cacheNext(): Promise<void> {
                    console.debug('cacheNext: next=', next);
                    if (next >= allToCache.length) return Promise.resolve();
                    const caching = allToCache[next++]
                    return cache.add(caching).then(cacheNext).catch(() => {
                        console.error('could not cache', caching);
                        return cacheNext();
                    })
                }
                // return cache.addAll(allToCache);
                return cacheNext();
            })
        }))
})

self.addEventListener('activate', e => {
    // console.debug('handling activate event for version', version);
    e.waitUntil(
        cacheState.then(s => {
            myAssert(s.newCache != null);
            return caches.delete(cacheName((s.newCache + 1) % 3));
        })
    )
})

// this would be cache-first strategy, but we use network first strategy (see above)
// self.addEventListener('fetch', function (event) {
//     console.debug('handling fetch event', event, 'request', event.request);
//     event.respondWith(
//         caches.open(CACHE_NAME).then(function (cache) {
//             return cache.match(event.request).then(function (response) {
//                 console.debug('response for request', response);
//                 return response || fetch(event.request).then(function (response) {
//                     cache.put(event.request, response.clone());
//                     return response;
//                 });
//             });
//         })
//     );
// });

self.addEventListener('notificationclick', e => {
    e.notification.close();

    if ('url' in e.notification.data) {
        // console.debug('self.origin', self.origin);

        e.waitUntil(
            self.clients.openWindow(e.notification.data.url)
        );

        // old:
        // const p = self.clients.matchAll({ type: "window", includeUncontrolled: true }).then(c => {
        //     // let couldFocus = false;
        //     for (let client of c) {
        //         if (client instanceof WindowClient) {
        //             // console.debug('instanceof WindowClient', client);
        //             if ('focus' in client && typeof client.focus === 'function') {
        //                 try {
        //                     return client.focus().catch(reason => {
        //                         console.error(reason, 'for client', client);
        //                     });
        //                     // couldFocus = true;
        //                     // console.debug('focus successful for client', client);
        //                 } catch (reason) {
        //                     console.error(reason, 'for client', client);
        //                 }
        //             } else {
        //                 console.warn('no focus method in client');
        //             }
        //         } else {
        //             // console.debug('not instanceof WindowClient', client);
        //         }
        //         // console.debug('client', client);

        //     }

        //     // if (!couldFocus) {
        //     // console.debug('open window for url', e.notification.data.url)
        //     return self.clients.openWindow(e.notification.data.url).catch(reason => {
        //         console.error(reason);
        //     });
        //     // }
        // })

        // e.waitUntil(p)
    }

})

// TODO funktioniert fuer Apple zumindest IOS nur wenn die App auf dem Homescreen gespeichert wurde.
// Zumindest laut MDN Dokumentation: https://developer.mozilla.org/en-US/docs/Web/API/PushEvent
// Fuer Apple Handys:
// "Notifications are supported in web apps saved to the home screen."
// (siehe: https://developer.mozilla.org/en-US/docs/Web/API/PushEvent)

// TODO evtl mal systematisch austesten ob diese datei ueberhaupt ausgefuehrt wird indem nur auf antworten gewartet wird
self.addEventListener('push', (e) => {

    // console.debug('push event: e=', e);
    const pushData = e.data?.json();
    // console.debug('e.data?.json()', pushData)
    // if (!PushData.guard(pushData)) {
    //     console.error('Unexpected pushData', pushData)
    //     return;
    // }
    console.debug('received push event with pushData', pushData);
    const notificationOptions: NotificationOptions = PushData.guard(pushData) ? {
        body: pushData.body,
        data: { url: pushData.url },
        // tag: 'pr-webRTC call',
        requireInteraction: true,
        silent: false,
        icon: pushData.icon,
        // icon: '/accept-call-64x64.png'
    } : {
        body: 'Unexpected push event (pr-webrtc)',
        // silent: false,
        // icon: '/accept-call-64x64.png'
    }
    const title = PushData.guard(pushData) ? pushData.title : 'Fehlerhafte PushMsg';
    const promise1 = self.registration.showNotification(title, notificationOptions);
    // const promise2 = self.clients.matchAll().then(clients => {
    //   // console.debug('clients.length', clients.length);
    //   clients.forEach(client => {
    //     // console.debug('sending push to', client);
    //     client.postMessage(e.data?.json());
    //   })
    // })
    e.waitUntil(Promise.all([promise1/* , promise2 */]))
})

self.addEventListener('message', (e) => {
    console.debug('received message in service worker (version ' + version + '): data', e.data);
    if (GetVersionReq.guard(e.data)) {
        const res: TGetVersionRes = {
            type: 'success',
            version: version
        }
        if (e.source == null) {
            console.error('e.source is null in message event');
        } else {
            e.source.postMessage(res);
            console.debug('sent response to client');
        }
    } else {
        console.debug('guard failed?!');
    }
})