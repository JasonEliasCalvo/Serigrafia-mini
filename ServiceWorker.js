const cacheName = "DefaultCompany-Metaverso-0.1.0";
const contentToCache = [
    "Build/cee3bfd5589651a8b16e2a12b8abe5b3.loader.js",
    "Build/ac2fe3c7e045960c22ae6310845d704d.framework.js.unityweb",
    "Build/320a7317cdcf280f8df9ba6b31d52c69.data.unityweb",
    "Build/9b2fba01c9d53599e8f8d1aac982df18.wasm.unityweb",
    "TemplateData/style.css"

];

self.addEventListener('install', function (e) {
    console.log('[Service Worker] Install');
    
    e.waitUntil((async function () {
      const cache = await caches.open(cacheName);
      console.log('[Service Worker] Caching all: app shell and content');
      await cache.addAll(contentToCache);
    })());
});

self.addEventListener('fetch', function (e) {
    e.respondWith((async function () {
      let response = await caches.match(e.request);
      console.log(`[Service Worker] Fetching resource: ${e.request.url}`);
      if (response) { return response; }

      response = await fetch(e.request);
      const cache = await caches.open(cacheName);
      console.log(`[Service Worker] Caching new resource: ${e.request.url}`);
      cache.put(e.request, response.clone());
      return response;
    })());
});
