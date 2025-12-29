const CACHE_VERSION = 'v2.3.5';
const CACHE_NAME = `helpzy-${CACHE_VERSION}`;

// Install event - clean start, don't precache
self.addEventListener('install', (event) => {
    console.log(`[SW ${CACHE_VERSION}] Installing...`);
    self.skipWaiting(); // Activate immediately
});

// Activate event - AGGRESSIVELY delete all old caches
self.addEventListener('activate', (event) => {
    console.log(`[SW ${CACHE_VERSION}] Activating...`);
    event.waitUntil(
        caches.keys().then((cacheNames) => {
            return Promise.all(
                cacheNames.map((cacheName) => {
                    // Delete ALL caches that don't match current version
                    if (cacheName !== CACHE_NAME) {
                        console.log(`[SW ${CACHE_VERSION}] Deleting old cache:`, cacheName);
                        return caches.delete(cacheName);
                    }
                })
            );
        }).then(() => {
            console.log(`[SW ${CACHE_VERSION}] Claiming clients...`);
            return self.clients.claim();
        })
    );
});

// Fetch event - NETWORK-ONLY for critical files, no caching of app shell
self.addEventListener('fetch', (event) => {
    const url = new URL(event.request.url);

    // 1. SECURITY: Only handle http/https
    if (url.protocol !== 'http:' && url.protocol !== 'https:') return;

    // 2. NEVER CACHE API CALLS
    if (url.hostname.includes('supabase.co')) {
        return; // Let browser handle normally
    }

    // 3. NEVER CACHE critical files - always fetch fresh
    const neverCache = ['index.html', 'sw.js', 'version.json', 'manifest.json'];
    if (neverCache.some(file => url.pathname.endsWith(file)) || url.pathname === '/') {
        event.respondWith(
            fetch(event.request, { cache: 'no-store' })
                .catch(() => caches.match(event.request))
        );
        return;
    }

    // 4. For all other assets: Network-first, fallback to cache
    event.respondWith(
        fetch(event.request)
            .then((response) => {
                // Only cache successful same-origin responses
                if (response && response.status === 200 && response.type === 'basic') {
                    const responseToCache = response.clone();
                    caches.open(CACHE_NAME).then((cache) => {
                        cache.put(event.request, responseToCache);
                    });
                }
                return response;
            })
            .catch(() => {
                // Offline fallback
                return caches.match(event.request);
            })
    );
});

// Listen for skip waiting message from update notification
self.addEventListener('message', (event) => {
    if (event.data && event.data.type === 'SKIP_WAITING') {
        self.skipWaiting();
    }
});
