const CACHE_NAME = 'boiler-pwa-v1';
const STATIC_CACHE = 'static-cache-v1';
const DYNAMIC_CACHE = 'dynamic-cache-v1';

const STATIC_ASSETS = [
  '/',
  '/index.html',
  '/styles/style.css',
  '/core/app.js',
  '/core/domain.js',
  '/core/ports.js',
  '/adapters/dom.js',
  '/adapters/storage.js',
  '/adapters/time.js',
  '/manifest.json',
  '/assets/icons/favicon.ico',
  '/assets/icons/favicon-16x16.png',
  '/assets/icons/favicon-32x32.png',
  '/assets/icons/favicon-96x96.png',
  '/assets/icons/favicon-192x192.png',
  '/assets/icons/favicon-512x512.png'
];

// Install Service Worker
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(STATIC_CACHE)
      .then(cache => {
        console.log('[Service Worker] Caching static assets');
        return cache.addAll(STATIC_ASSETS);
      })
      .then(() => {
        console.log('[Service Worker] Skipping waiting');
        return self.skipWaiting();
      })
  );
});

// Activate Service Worker
self.addEventListener('activate', event => {
  const currentCaches = [STATIC_CACHE, DYNAMIC_CACHE];
  event.waitUntil(
    caches.keys()
      .then(cacheNames => {
        return cacheNames.filter(
          cacheName => !currentCaches.includes(cacheName)
        );
      })
      .then(cachesToDelete => {
        return Promise.all(
          cachesToDelete.map(cacheToDelete => {
            return caches.delete(cacheToDelete);
          })
        );
      })
      .then(() => self.clients.claim())
  );
});

// Fetch Event Strategy
self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request)
      .then(cachedResponse => {
        if (cachedResponse) {
          return cachedResponse;
        }
        return fetch(event.request)
          .then(response => {
            // Check if we received a valid response
            if (!response || response.status !== 200 || response.type !== 'basic') {
              return response;
            }

            // Clone the response as it can only be consumed once
            const responseToCache = response.clone();

            caches.open(DYNAMIC_CACHE)
              .then(cache => {
                // Cache new resources for offline use
                cache.put(event.request, responseToCache);
              });

            return response;
          })
          .catch(() => {
            // Return fallback for HTML
            if (event.request.headers.get('accept').includes('text/html')) {
              return caches.match('/offline.html');
            }
          });
      })
  );
});
