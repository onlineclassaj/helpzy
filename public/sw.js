const CACHE_NAME = 'helpzy-v4'; // Final push for new features
const urlsToCache = [
    '/',
    '/index.html'
];

// Install event - cache resources
self.addEventListener('install', (event) => {
    event.waitUntil(
        caches.open(CACHE_NAME)
            .then((cache) => {
                console.log('Opened cache v2');
                return cache.addAll(urlsToCache);
            })
    );
    self.skipWaiting();
});

// Fetch event - serve from cache, fallback to network
self.addEventListener('fetch', (event) => {
    const url = new URL(event.request.url);

    // SECURITY: Only handle http/https
    if (url.protocol !== 'http:' && url.protocol !== 'https:') return;

    event.respondWith(
        caches.match(event.request).then((cachedResponse) => {
            if (cachedResponse) return cachedResponse;

            return fetch(event.request).then((response) => {
                if (!response || response.status !== 200 || response.type !== 'basic') {
                    return response;
                }
                const responseToCache = response.clone();
                caches.open(CACHE_NAME).then((cache) => {
                    cache.put(event.request, responseToCache);
                });
                return response;
            }).catch(() => {
                return null;
            });
        })
    );
});

// Activate event - clean up old caches
self.addEventListener('activate', (event) => {
    const cacheWhitelist = [CACHE_NAME];
    event.waitUntil(
        caches.keys().then((cacheNames) => {
            return Promise.all(
                cacheNames.map((cacheName) => {
                    if (cacheWhitelist.indexOf(cacheName) === -1) {
                        return caches.delete(cacheName);
                    }
                })
            );
        })
    );
    self.clients.claim();
});

// Background Sync - retry failed requests when back online
self.addEventListener('sync', (event) => {
    if (event.tag === 'sync-quotes' || event.tag === 'sync-posts') {
        event.waitUntil(
            // Retrieve queued requests from IndexedDB and retry them
            syncQueuedRequests(event.tag)
        );
    }
});

async function syncQueuedRequests(tag) {
    // This would integrate with IndexedDB to store/retrieve failed requests
    console.log(`Syncing queued requests for: ${tag}`);
    // Implementation would retrieve and retry failed API calls
}

// Listen for skip waiting message from update notification
self.addEventListener('message', (event) => {
    if (event.data && event.data.type === 'SKIP_WAITING') {
        self.skipWaiting();
    }
});
