  const CACHE_NAME = "pwamigus-v1";
  
  self.addEventListener('fetch', function(event) {
    event.respondWith(
      caches.match(event.request, {cacheName:CACHE_NAME})
      .then(function(response) {
        if (response) {
          return response;
        }
        var fetchRequest = event.request.clone();
        return fetch(fetchRequest).then(
          function(response) {
            if(!response || response.status !== 200) {
              return response;
            }
            var responseToCache = response.clone();
            caches.open(CACHE_NAME)
            .then(function(cache) {
              cache.put(event.request, responseToCache);
            });
            return response;
          }
        );
      })
      .then(function(response) {
        if (response) {
          console.log("ServiceWorker: Gunakan aset dari cache: ", response.url);
          return response;
        }
 
        console.log(
          "ServiceWorker: Memuat aset dari server: ",
          event.request.url
        );
        return fetch(event.request);
      })
      
    );
  });

  self.addEventListener('activate', function(event) {
    console.log('Aktivasi service worker baru');
    event.waitUntil(
      caches.keys().then(function(cacheNames) {
        return Promise.all(
          cacheNames.map(function(cacheName) {
            if (cacheName !== CACHE_NAME && cacheName.startsWith("pwamigus-v1")) {
              return caches.delete(cacheName);
            }
          })
        );
      })
    );
  });
