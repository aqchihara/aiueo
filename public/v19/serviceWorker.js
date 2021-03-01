var CACHE_NAME = "Aiueo-cache-v19-1";
var urlsToCache = [
    "https://aiueo-learn.web.app/v19/",
    "https://aiueo-learn.web.app/v19/word_list.html",
    "https://aiueo-learn.web.app/v19/edit_list.html",
    "https://aiueo-learn.web.app/v19/edit.html",
    "https://aiueo-learn.web.app/css/main.css",
    "https://aiueo-learn.web.app/js/main.js",
    "https://cdn.jsdelivr.net/npm/vue@2.6.12/dist/vue.js",
    "https://aiueo-learn.web.app/images/　.JPG",
    "https://aiueo-learn.web.app/images/、.JPG",
    "https://aiueo-learn.web.app/images/。.JPG",
    "https://aiueo-learn.web.app/images/あ.JPG",
    "https://aiueo-learn.web.app/images/い.JPG",
    "https://aiueo-learn.web.app/images/う.JPG",
    "https://aiueo-learn.web.app/images/え.JPG",
    "https://aiueo-learn.web.app/images/お.JPG",
    "https://aiueo-learn.web.app/images/か.JPG",
    "https://aiueo-learn.web.app/images/き.JPG",
    "https://aiueo-learn.web.app/images/く.JPG",
    "https://aiueo-learn.web.app/images/け.JPG",
    "https://aiueo-learn.web.app/images/こ.JPG",
    "https://aiueo-learn.web.app/images/さ.JPG",
    "https://aiueo-learn.web.app/images/し.JPG",
    "https://aiueo-learn.web.app/images/す.JPG",
    "https://aiueo-learn.web.app/images/せ.JPG",
    "https://aiueo-learn.web.app/images/そ.JPG",
    "https://aiueo-learn.web.app/images/た.JPG",
    "https://aiueo-learn.web.app/images/ち.JPG",
    "https://aiueo-learn.web.app/images/つ.JPG",
    "https://aiueo-learn.web.app/images/て.JPG",
    "https://aiueo-learn.web.app/images/と.JPG",
    "https://aiueo-learn.web.app/images/な.JPG",
    "https://aiueo-learn.web.app/images/に.JPG",
    "https://aiueo-learn.web.app/images/ぬ.JPG",
    "https://aiueo-learn.web.app/images/ね.JPG",
    "https://aiueo-learn.web.app/images/の.JPG",
    "https://aiueo-learn.web.app/images/は.JPG",
    "https://aiueo-learn.web.app/images/ひ.JPG",
    "https://aiueo-learn.web.app/images/ふ.JPG",
    "https://aiueo-learn.web.app/images/へ.JPG",
    "https://aiueo-learn.web.app/images/ほ.JPG",
    "https://aiueo-learn.web.app/images/ま.JPG",
    "https://aiueo-learn.web.app/images/み.JPG",
    "https://aiueo-learn.web.app/images/む.JPG",
    "https://aiueo-learn.web.app/images/め.JPG",
    "https://aiueo-learn.web.app/images/も.JPG",
    "https://aiueo-learn.web.app/images/や.JPG",
    "https://aiueo-learn.web.app/images/ゆ.JPG",
    "https://aiueo-learn.web.app/images/よ.JPG",
    "https://aiueo-learn.web.app/images/ら.JPG",
    "https://aiueo-learn.web.app/images/り.JPG",
    "https://aiueo-learn.web.app/images/る.JPG",
    "https://aiueo-learn.web.app/images/れ.JPG",
    "https://aiueo-learn.web.app/images/ろ.JPG",
    "https://aiueo-learn.web.app/images/わ.JPG",
    "https://aiueo-learn.web.app/images/を.JPG",
    "https://aiueo-learn.web.app/images/ん.JPG",
    "https://aiueo-learn.web.app/images/一消.JPG",
    "https://aiueo-learn.web.app/images/再生.JPG",
    "https://aiueo-learn.web.app/images/小.JPG",
    "https://aiueo-learn.web.app/images/切替.JPG",
    "https://aiueo-learn.web.app/images/全消.JPG",
    "https://aiueo-learn.web.app/images/単語.JPG",
    "https://aiueo-learn.web.app/images/登録.JPG",
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