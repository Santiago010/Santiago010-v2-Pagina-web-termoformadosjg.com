const CACHE = "cache_v1";

const element = [
  "/",
  "/index.html",
  "/style.css",
  "/src/css/contact.css",
  "/src/css/header.css",
  "/src/css/index.css",
  "/src/css/products.css",
  "/src/js/data.json",
  "/src/js/elements.js",
  "/src/js/main.js",
  "/src/js/sendData.js",
  "/src/docs/cuna-0.png",
  "/src/docs/cuna-1.png",
  "/src/docs/cuna-2.png",
  "/src/docs/cuna-3.png",
  "/src/docs/empaque-blister-0.png",
  "/src/docs/empaque-blister-1.png",
  "/src/docs/empaque-blister-2.png",
  "/src/docs/empaque-blister-3.png",
  "/src/docs/estuche-0.png",
  "/src/docs/estuche-1.png",
  "/src/docs/estuche-2.png",
  "/src/docs/estuche-3.png",
  "/src/docs/exhibidor-0.png",
  "/src/docs/exhibidor-1.png",
  "/src/docs/exhibidor-2.png",
  "/src/docs/exhibidor-3.png",
  "/src/docs/icon-termoformados-jg.ico",
  "/src/docs/index0.png",
  "/src/docs/index1.png",
  "/src/docs/index2.png",
  "/src/docs/index3.png",
  "/src/docs/molde-0.png",
  "/src/docs/molde-1.png",
  "/src/docs/molde-2.png",
  "/src/docs/molde-3.png",
  "/src/docs/others-1.png",
  "/src/docs/others-2.png",
  "/src/docs/others-3.png",
  "/src/docs/others-4.png",
  "/src/docs/others-5.png",
  "/src/docs/others-6.png",
  "/src/docs/others-7.png",
  "/src/docs/others-8.png",
  "/src/docs/others-9.png",
  "/src/docs/others-10.png",
  "/src/docs/others-11.png",
  "/src/docs/others-12.png",
  "/src/docs/others-13.png",
  "/src/docs/others-14.png",
  "/src/docs/others-15.png",
  "/src/docs/others-16.png",
  "/src/docs/others-17.png",
  "/src/docs/probador-0.png",
  "/src/docs/probador-1.png",
  "/src/docs/probador-2.png",
  "/src/docs/probador-3.png",
  "/src/docs/termoformados.jpg",
];

self.addEventListener("install", (event) => {
  event.waitUntil(preCache());
});

self.addEventListener("fetch", (event) => {
  const req = event.request;

  if (req.method !== "GET") {
    return;
  }

  event.respondWith(cachedResponse(req));

  event.waitUntil(updateCache(req));
});

async function preCache() {
  const cache = await caches.open(CACHE);
  return cache.addAll(element);
}

async function cachedResponse(req) {
  const cache = await caches.open(CACHE);
  const response = await cache.match(req);
  return response || fetch(req);
}

async function updateCache(req) {
  const cache = await caches.open(CACHE);
  const response = await fetch(req);
  return cache.put(req, response);
}
