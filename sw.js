
let dynamic_cache = "dynamic-cache-v2"

self.addEventListener('activate', function (event) {
    event.waitUntil(
      caches.keys().then(function (cacheNames) {
        return Promise.all(
          cacheNames.filter(function (cacheName) {
            if (dynamic_cache !== cacheName) {
              return true
            }
          }).map(function (cacheName) {
            console.log("deleting", cacheName)
            return caches.delete(cacheName);
          })
        );
      })
    );
  });
  
  
  self.addEventListener('fetch', function (event) {
    event.respondWith(
      caches.open(dynamic_cache).then(function (cache) {
        return caches.match(event.request).then(function (response) {
          return response || fetch(event.request).then(function (response) {
            cache.put(event.request.url, response.clone());
            return response;
          })
        });
      })
    );
  });


