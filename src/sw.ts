/// <reference no-default-lib="true"/>
/// <reference lib="esnext" />
/// <reference lib="webworker" />

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

const version: Version = 35

declare const self: ServiceWorkerGlobalScope;

console.log('Custom service worker functions for pr-webrtc: version=', version);

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
  const promise2 = self.clients.matchAll().then(clients => {
    // console.log('clients.length', clients.length);
    clients.forEach(client => {
      // console.log('sending push to', client);
      client.postMessage(e.data?.json());
    })
  })
  e.waitUntil(Promise.all([promise1, promise2]))
})
