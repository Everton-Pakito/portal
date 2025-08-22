const CACHE_VERSION = "icons-v1";
const CACHE_NAME = `portal-cache-${CACHE_VERSION}`;
const FILES_TO_CACHE = [
  "index.html",
  "padrao_css_sistema.css",
  "manifest.json",
  "icons/icon-192-v1.png",
  "icons/icon-512-v1.png",
  "medir-curva.html",
  "velocidade-curva.html"
];

self.addEventListener("install", (event) => {
  event.waitUntil(caches.open(CACHE_NAME).then((cache) => cache.addAll(FILES_TO_CACHE)));
  self.skipWaiting();
});

self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches.keys().then((keys) => Promise.all(keys.map((k) => (k !== CACHE_NAME ? caches.delete(k) : null))))
  );
  self.clients.claim();
});

self.addEventListener("fetch", (event) => {
  event.respondWith(caches.match(event.request).then((resp) => resp || fetch(event.request)));
});
