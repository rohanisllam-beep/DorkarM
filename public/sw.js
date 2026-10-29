// Dorkar — Service Worker for Real-Time Order Push Notifications
const SW_VERSION = 'v1.1.0';

self.addEventListener('install', (event) => {
  self.skipWaiting();
});

self.addEventListener('activate', (event) => {
  event.waitUntil(self.clients.claim());
});

self.addEventListener('push', (event) => {
  let data = {};
  if (event.data) {
    try {
      data = event.data.json();
    } catch (e) {
      data = {
        title: 'দরকার — অর্ডার স্ট্যাটাস আপডেট',
        body: event.data.text() || 'আপনার অর্ডারের নতুন স্ট্যাটাস আপডেট হয়েছে।',
      };
    }
  }

  const title = data.title || 'দরকার — অর্ডার আপডেট';
  const options = {
    body: data.body || 'আপনার অর্ডারের স্ট্যাটাস পরিবর্তিত হয়েছে।',
    icon: data.icon || '/assets/logo.png',
    badge: data.badge || '/assets/logo.png',
    tag: data.orderId ? `order-${data.orderId}` : 'dorkar-order-notification',
    renotify: true,
    data: {
      url: data.url || `/#track=${data.orderId || ''}`,
      orderId: data.orderId,
      status: data.status,
      timestamp: data.timestamp || Date.now(),
    },
    vibrate: [250, 100, 250, 100, 250],
    requireInteraction: true,
  };

  event.waitUntil(
    self.registration.showNotification(title, options).then(() => {
      // Also post message to any open client tabs
      return self.clients.matchAll({ type: 'window', includeUncontrolled: true }).then((clients) => {
        clients.forEach((client) => {
          client.postMessage({
            type: 'ORDER_PUSH_RECEIVED',
            data,
          });
        });
      });
    })
  );
});

self.addEventListener('notificationclick', (event) => {
  event.notification.close();
  const notifData = event.notification.data || {};
  const targetUrl = notifData.url || '/#ord';

  event.waitUntil(
    self.clients.matchAll({ type: 'window', includeUncontrolled: true }).then((clientList) => {
      for (const client of clientList) {
        if (client.url.includes(self.location.origin) && 'focus' in client) {
          if ('navigate' in client) {
            client.navigate(targetUrl);
          }
          return client.focus();
        }
      }
      if (self.clients.openWindow) {
        return self.clients.openWindow(targetUrl);
      }
    })
  );
});
