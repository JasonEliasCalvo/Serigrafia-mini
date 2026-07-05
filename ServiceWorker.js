const cacheName = "DefaultCompany-Metaverso-0.1.0";
const contentToCache = [
    "Build/cee3bfd5589651a8b16e2a12b8abe5b3.loader.js",
    "Build/6e52ad0ab2e86d80c0034b7af4ce28b7.framework.js.unityweb",
    "Build/2b148b38bb34c774ebc4a3d2df89c49d.data.unityweb",
    "Build/102f83738c060cb50ef3ff23d70fbd7a.wasm.unityweb",
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
