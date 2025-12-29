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

// Fetch event - Network-First for core assets, Exclude API
self.addEventListener('fetch', (event) => {
    const url = new URL(event.request.url);

    // 1. SECURITY: Only handle http/https
    if (url.protocol !== 'http:' && url.protocol !== 'https:') return;

    // 2. EXCLUDE API: Never cache Supabase/API calls
    if (url.hostname.includes('supabase.co')) {
        return; // Let it go to network normally
    }

    // 3. NETWORK-FIRST strategy for everything else (Assets)
    event.respondWith(
        fetch(event.request)
            .then((response) => {
                // If network works, update cache and return
                if (response && response.status === 200 && response.type === 'basic') {
                    const responseToCache = response.clone();
                    caches.open(CACHE_NAME).then((cache) => {
                        cache.put(event.request, responseToCache);
                    });
                }
                return response;
            })
            .catch(() => {
                // If network fails (offline), try cache
                return caches.match(event.request);
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
