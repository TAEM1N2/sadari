const CACHE_NAME = "ladder-pwa-v1";
const ASSETS = [
  "./",
  "./index.html",
  "./manifest.json",
  "./icons/icon-kcw.jpg",
  "./sounds/사다리 타기.mp3",
  "./sounds/장성에 대한 경례 소장.mp3",
  "./icecream/더블비안코.jpeg",
  "./icecream/돼지바.jpeg",
  "./icecream/부라보.jpeg",
  "./icecream/오레오.jpeg",
  "./icecream/인절미콘.jpeg",
  "./icecream/주토피아.png",
  "./icecream/찰떡아이스.jpeg",
  "./icecream/파르페.png",
  "./icecream/하겐다즈.jpeg"
];

self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => cache.addAll(ASSETS))
  );
});

self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches.keys().then((keys) =>
      Promise.all(keys.map((key) => (key === CACHE_NAME ? null : caches.delete(key))))
    )
  );
});

self.addEventListener("fetch", (event) => {
  const { request } = event;
  if (request.method !== "GET") return;
  const url = new URL(request.url);
  if (url.origin !== self.location.origin) return;
  event.respondWith(
    caches.match(request).then((cached) => cached || fetch(request))
  );
});
