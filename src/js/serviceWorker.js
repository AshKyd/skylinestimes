var CACHE = "cache-and-update";

// On install, cache some resources.
self.addEventListener("install", function(evt) {
  // Ask the service worker to keep installing until the returning promise resolves.
  evt.waitUntil(precache());
});

// On fetch, use cache but update the entry with the latest contents from the server.
self.addEventListener("fetch", function(event) {
  const { request } = event;
  if (
    request.method !== "GET" ||
    !request.url.startsWith(self.location.origin) ||
    request.url.includes("socket.io")
  ) {
    return;
  }

  if (request.url.match(/\/$/)) {
    return event.respondWith(getAndFallbackToCache(request));
  }

  return event.respondWith(cacheFirst(request));
});

function getAndCache(request) {
  return fetch(request).then(response => {
    // Put a copy of the response in the runtime cache.
    return caches.open(CACHE).then(cache => {
      return cache.put(request, response.clone()).then(() => {
        return response;
      });
    });
  });
}

function cacheFirst(request) {
  return caches.match(request).then(cachedResponse => {
    // if we have a cached asset
    if (cachedResponse) {
      // run this in the background to refresh the cache
      getAndCache(request).catch(e =>
        console.error("could not load", request.url, e.message)
      );

      // return the request straight away.
      return cachedResponse;
    }

    return getAndCache(request);
  });
}

function getAndFallbackToCache(request) {
  return getAndCache(request).catch(e => {
    return caches.match(request);
  });
}

// Open a cache and use addAll() with an array of assets to add all of them to the cache. Return a promise resolving when all the assets are added.
function precache() {
  return caches.open(CACHE).then(function(cache) {
    return cache.addAll([]);
  });
}
