var cacheName = 'lamp!';
var filesToCache = [
    '/',
    '/index.html',
    '/404.html',
    '/css/styles.css',
    '/js/main.js',
    '/js_rb_polyfills',
    '/js/_main-behavior',
    '/js/_js__crucial-behavior',
    '/manifest.json'
];

/* Start the service worker and cache all of the app's content */
self.addEventListener('install', function(e) {
    e.waitUntil(
        caches.open(cacheName).then(function(cache) {
            return cache.addAll(filesToCache);
        })
    );
});

/* Serve cached content when offline */
self.addEventListener('fetch', function(e) {
    e.respondWith(
        caches.match(e.request).then(function(response) {
            return response || fetch(e.request);
        })
    );
});