var CACHE_NAME = "Aiueo-cache-v17-1";
var urlsToCache = [
    "https://aiueo-learn.web.app/v17/",
    "https://aiueo-learn.web.app/v17/word_list.html",
    "https://aiueo-learn.web.app/v17/edit_list.html",
    "https://aiueo-learn.web.app/v17/edit.html",
];

self.addEventListener('install', function(event) {
    event.waitUntil(
        caches.open(CACHE_NAME)
        .then(
            function(cache) {
                return cache.addAll(urlsToCache);
            })
    );
});

self.addEventListener('fetch', function(event) {
    event.respondWith(
        caches.match(event.request)
        .then(
            function(response) {
                if (response) {
                    return response;
                }
                return fetch(event.request);
            })
    );
});