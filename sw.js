const V='offthepitch-V175';
const BILDER=["skoda-octavia-kombi.jpg", "vw-golf.jpg", "vw-polo.jpg", "audi-rs6-avant.jpg", "bmw-3er.jpg", "mercedes-e-klasse.jpg", "vw-golf-gti.jpg", "alter-camper-bus.jpg", "alter-kleinwagen-mit-frischem-tuv.jpg", "ford-fiesta-14-jahre-alt.jpg", "opel-astra-kombi-12-jahre-alt.jpg", "rostlaube-baujahr-2001.jpg", "alter-roller-50-ccm.jpg", "gebrauchtes-e-bike.jpg", "gebrauchtes-fahrrad.jpg", "ferrari-roma.jpg", "lamborghini-huracan.jpg", "porsche-911-carrera.jpg", "rolls-royce-ghost.jpg", "hobbys-golf.jpg", "hobbys-segeln.jpg", "hobbys-tauchen.jpg", "hobbys-tennis.jpg", "bereiche-garage.jpg", "bereiche-luxus.jpg"];
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
