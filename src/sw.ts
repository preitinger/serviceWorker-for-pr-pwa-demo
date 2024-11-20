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

const version: Version = 59

declare const self: ServiceWorkerGlobalScope;

logMessages();

console.log('Custom service worker functions for pr-newsletter: version=', version);

function fetchAndCache(request: Request) {
    console.log('fetch headers for ', request.url);
    request.headers.forEach((val, key) => {
        console.log('request header', key, ': ', val);
    })
    console.log('fetch ', request.url, request.cache);
    return fetch(request)
        .then(response => {
            if (!response.ok) {
                throw Error('Network response was not ok.');
            }
            const responseToCache = response.clone();
            caches.open('my-cache').then(cache => {
                cache.put(request, responseToCache);
                responseToCache.headers.forEach((val, key) => {
                    console.log('response header: ', key, ':', val);
                })
                const dateStr = responseToCache.headers.get('date');

                if (dateStr != null) {
                    const date = new Date(dateStr);
                    console.log('date as string', dateStr, 'hours', date.getHours(), 'mins', date.getMinutes(), 'secs', date.getSeconds());
                } else {
                    console.warn('date header null!');
                }
                console.log('typeof date header', typeof(dateStr));
                console.log('RESPONSE url, cache-control, last-modified', responseToCache.url, responseToCache.headers.get('cache-control'), responseToCache.headers.get('last-modified'));
                console.log('put to cache the response for request', request, 'response', response);
            });
            return response;
        })
        .catch(() => {
            const res = caches.match(request)
            res.then(r => {
                console.log('response from cache for request', request, ' - response: ', r);
            })
            return res;
        });
}

self.addEventListener('fetch', event => {

    // nicht ganz so gut denke ich da respondWith auch aufgerufen wird wenn nichts gefunden wird aber dann sollte normal fortgefahren werden
    // switch (event.request.cache) {
    //     case 'default':
    // }
    event.respondWith(
      fetchAndCache(event.request).catch(() => {
        return caches.match(event.request).then(cachedResponse => {
          if (cachedResponse) {
            return cachedResponse;
          }
          // Optional: Return a default fallback page for certain requests
          if (event.request.mode === 'navigate') {
            return caches.match('/offline.html');
          }
        });
      })
    );
  });


const CACHE_NAME = 'pr-newsletter-cache_v1'
const PRE_CACHE = ['/', '/favicon.ico', '/manifest.webmanifest', '/newsletterSettings', '/overview']

self.addEventListener('install', e => {
    console.log('handling install event');
    self.skipWaiting();

    e.waitUntil(caches.open(CACHE_NAME).then(cache => {
        return cache.addAll(PRE_CACHE)
    }))
})

// this would be cache-first strategy, but we use network first strategy (see above)
// self.addEventListener('fetch', function (event) {
//     console.log('handling fetch event', event, 'request', event.request);
//     event.respondWith(
//         caches.open(CACHE_NAME).then(function (cache) {
//             return cache.match(event.request).then(function (response) {
//                 console.log('response for request', response);
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
        // console.log('self.origin', self.origin);

        e.waitUntil(
            self.clients.openWindow(e.notification.data.url)
        );

        // old:
        // const p = self.clients.matchAll({ type: "window", includeUncontrolled: true }).then(c => {
        //     // let couldFocus = false;
        //     for (let client of c) {
        //         if (client instanceof WindowClient) {
        //             // console.log('instanceof WindowClient', client);
        //             if ('focus' in client && typeof client.focus === 'function') {
        //                 try {
        //                     return client.focus().catch(reason => {
        //                         console.error(reason, 'for client', client);
        //                     });
        //                     // couldFocus = true;
        //                     // console.log('focus successful for client', client);
        //                 } catch (reason) {
        //                     console.error(reason, 'for client', client);
        //                 }
        //             } else {
        //                 console.warn('no focus method in client');
        //             }
        //         } else {
        //             // console.log('not instanceof WindowClient', client);
        //         }
        //         // console.log('client', client);

        //     }

        //     // if (!couldFocus) {
        //     // console.log('open window for url', e.notification.data.url)
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

    // console.log('push event: e=', e);
    const pushData = e.data?.json();
    // console.log('e.data?.json()', pushData)
    // if (!PushData.guard(pushData)) {
    //     console.error('Unexpected pushData', pushData)
    //     return;
    // }
    console.log('received push event with pushData', pushData);
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
    //   // console.log('clients.length', clients.length);
    //   clients.forEach(client => {
    //     // console.log('sending push to', client);
    //     client.postMessage(e.data?.json());
    //   })
    // })
    e.waitUntil(Promise.all([promise1/* , promise2 */]))
})

self.addEventListener('message', (e) => {
    console.log('received message in service worker (version ' + version + '): data', e.data);
    if (GetVersionReq.guard(e.data)) {
        const res: TGetVersionRes = {
            type: 'success',
            version: version
        }
        e.source.postMessage(res);
        console.log('sent response to client');
    } else {
        console.log('guard failed?!');
    }
})