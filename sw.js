const cacheName = 'task-manager-v1';
const staticAssets = [
    '/',
    '/index.html',
    '/style.css',
    '/script.js',
    '/assets/bootstrap.min.css'
];

self.addEventListener('install', function (event) {
    event.waitUntil(
        caches.open(cacheName).then(function (cache) {
            return cache.addAll(staticAssets);
        })
    );
});

self.addEventListener('fetch', function (event) {
    event.respondWith(
        caches.match(event.request).then(function (response) {
            return response || fetch(event.request);
        })
    );
});
