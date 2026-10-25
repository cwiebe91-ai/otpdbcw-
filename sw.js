const V='offthepitch-V174';
const BILDER=["bilder/pool/autos-modelle/skoda-octavia-kombi.jpg", "bilder/pool/autos-modelle/vw-golf.jpg", "bilder/pool/autos-modelle/vw-polo.jpg", "bilder/pool/autos-modelle/audi-rs6-avant.jpg", "bilder/pool/autos-modelle/bmw-3er.jpg", "bilder/pool/autos-modelle/mercedes-e-klasse.jpg", "bilder/pool/autos-modelle/vw-golf-gti.jpg", "bilder/pool/autos-modelle/alter-camper-bus.jpg", "bilder/pool/autos-modelle/alter-kleinwagen-mit-frischem-tuv.jpg", "bilder/pool/autos-modelle/ford-fiesta-14-jahre-alt.jpg", "bilder/pool/autos-modelle/opel-astra-kombi-12-jahre-alt.jpg", "bilder/pool/autos-modelle/rostlaube-baujahr-2001.jpg", "bilder/pool/autos-modelle/alter-roller-50-ccm.jpg", "bilder/pool/autos-modelle/gebrauchtes-e-bike.jpg", "bilder/pool/autos-modelle/gebrauchtes-fahrrad.jpg", "bilder/pool/autos-modelle/ferrari-roma.jpg", "bilder/pool/autos-modelle/lamborghini-huracan.jpg", "bilder/pool/autos-modelle/porsche-911-carrera.jpg", "bilder/pool/autos-modelle/rolls-royce-ghost.jpg", "bilder/banner/hobbys-golf.jpg", "bilder/banner/hobbys-segeln.jpg", "bilder/banner/hobbys-tauchen.jpg", "bilder/banner/hobbys-tennis.jpg", "bilder/banner/bereiche-garage.jpg", "bilder/banner/bereiche-luxus.jpg"];
const SHELL=['./','index.html','manifest.webmanifest','icon-192-v2.png','icon-512-v2.png','apple-touch-icon-v2.png'];
self.addEventListener('install',e=>{e.waitUntil(caches.open(V).then(c=>c.addAll(SHELL).then(()=>Promise.allSettled(BILDER.map(u=>c.add(u))))).then(()=>self.skipWaiting()))});
self.addEventListener('activate',e=>{e.waitUntil(caches.keys().then(k=>Promise.all(k.filter(x=>x!==V).map(x=>caches.delete(x)))).then(()=>self.clients.claim()))});
self.addEventListener('fetch',e=>{
  const r=e.request;if(r.method!=='GET')return;
  const u=new URL(r.url);
  if(u.origin===location.origin){
    /* Netzwerk zuerst, damit Updates ankommen; offline aus dem Cache */
    e.respondWith(fetch(r).then(res=>{const cp=res.clone();caches.open(V).then(c=>c.put(r,cp));return res}).catch(()=>caches.match(r).then(m=>m||caches.match('index.html'))));
  }else if(u.hostname.endsWith('googleapis.com')||u.hostname.endsWith('gstatic.com')){
    /* Schriften: einmal laden, dann dauerhaft aus dem Cache */
    e.respondWith(caches.match(r).then(m=>m||fetch(r).then(res=>{const cp=res.clone();caches.open(V).then(c=>c.put(r,cp));return res})));
  }
});
