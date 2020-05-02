var CACHE = "cache-and-update";

// On install, cache some resources.
self.addEventListener("install", function(evt) {
  console.log("The service worker is being installed.");
  // Ask the service worker to keep installing until the returning promise resolves.
  evt.waitUntil(precache());

  console.log("new version yay");
});

// On fetch, use cache but update the entry with the latest contents from the server.
self.addEventListener("fetch", function({ request }) {
  if (
    request.method !== "GET" ||
    !request.url.startsWith(self.location.origin) ||
    request.url.includes("socket.io")
  ) {
    return;
  }

  if (request.url.match(/\/$/)) {
    console.log("trying to load page");
    return getAndFallbackToCache(request);
  }

  return cacheFirst();
});

function getAndCache(request) {
  return caches.open(CACHE).then(cache => {
    return fetch(request).then(response => {
      console.log("response", response);
      // Put a copy of the response in the runtime cache.
      return cache.put(request, response.clone()).then(() => {
        return response;
      });
    });
  });
}

function cacheFirst() {
  caches.match(request).then(cachedResponse => {
    // if we have a cached asset
    if (cachedResponse) {
      // run this in the background to refresh the cache
      getAndCache(request);

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
