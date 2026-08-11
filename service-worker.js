const CACHE_NAME = "swish-v1.0.10";

const urlsToCache = [
  "./",
  "./index.html",
  "./style.css",
  "./script.js",
  "./manifest.json",

  "./icon-192.png",
  "./icon-512.png",

  "./img/card/werwolf/werwolf-card.png",
  "./img/card/container-card.png",
  "./img/banner/container-banner.png",
  "./img/player/container-player.png"
];


self.addEventListener("install", event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => cache.addAll(urlsToCache))
  );
});


self.addEventListener("activate", event => {
  event.waitUntil(
    caches.keys().then(keys => {
      return Promise.all(
        keys
          .filter(key => key !== CACHE_NAME)
          .map(key => caches.delete(key))
      );
    })
  );
});

self.addEventListener("message", event => {
  if (event.data && event.data.type === "GET_CACHE_NAME" && event.ports[0]) {
    event.ports[0].postMessage(CACHE_NAME);
  }
});


self.addEventListener("fetch", event => {
  event.respondWith(
    caches.match(event.request)
      .then(response => {
        return response || fetch(event.request);
      })
  );
});
