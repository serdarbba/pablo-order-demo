/* Network-first: online'ken HER ZAMAN en güncel sürüm gelir, offline'da cache fallback (kurulabilirlik bonusu) */
const CACHE = "pablo-demo-v28";
const ASSETS = ["./","./index.html","./app.js","./ai.js","./manifest.json","./icons/icon-192.png","./icons/icon-512.png"];

self.addEventListener("install", e=>{
  e.waitUntil(caches.open(CACHE).then(c=>c.addAll(ASSETS)).then(()=>self.skipWaiting()));
});
self.addEventListener("activate", e=>{
  e.waitUntil(caches.keys().then(ks=>Promise.all(ks.filter(k=>k!==CACHE).map(k=>caches.delete(k)))).then(()=>self.clients.claim()));
});
self.addEventListener("fetch", e=>{
  if(e.request.method!=="GET") return;
  e.respondWith(
    fetch(e.request).then(resp=>{
      const copy=resp.clone();
      caches.open(CACHE).then(c=>c.put(e.request,copy)).catch(()=>{});
      return resp;
    }).catch(()=> caches.match(e.request).then(r=> r || caches.match("./index.html")))
  );
});
