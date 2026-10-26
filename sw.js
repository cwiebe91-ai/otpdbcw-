const V='offthepitch-V177';
const BILDER=["haustiere-katze-hauskatze-1.jpg", "haustiere-katze-hauskatze-2.jpg", "haustiere-katze-maine-coon-1.jpg", "haustiere-katze-maine-coon-2.jpg", "haustiere-katze-perserkatze-1.jpg", "haustiere-katze-perserkatze-2.jpg", "haustiere-katze-siamkatze-1.jpg", "haustiere-katze-siamkatze-2.jpg", "gebrauchter-kleinwagen.jpg", "skoda-octavia-kombi.jpg", "vw-golf.jpg", "vw-polo.jpg", "audi-rs6-avant.jpg", "bmw-3er.jpg", "mercedes-e-klasse.jpg", "vw-golf-gti.jpg", "alter-camper-bus.jpg", "alter-kleinwagen-mit-frischem-tuv.jpg", "ford-fiesta-14-jahre-alt.jpg", "opel-astra-kombi-12-jahre-alt.jpg", "rostlaube-baujahr-2001.jpg", "alter-roller-50-ccm.jpg", "gebrauchtes-e-bike.jpg", "gebrauchtes-fahrrad.jpg", "ferrari-roma.jpg", "lamborghini-huracan.jpg", "porsche-911-carrera.jpg", "rolls-royce-ghost.jpg", "luxus-motorboot-sportboot.jpg", "luxus-motoryacht-20-m.jpg", "luxus-segelyacht-12-m.jpg", "luxus-superyacht-45-m.jpg", "luxus-klassischer-sportwagen.jpg", "luxus-landschaftsgemalde.jpg", "luxus-moderne-kunst.jpg", "luxus-oldtimer-youngtimer.jpg", "luxus-weinsammlung.jpg", "luxus-langstrecken-jet.jpg", "luxus-leichter-helikopter.jpg", "luxus-privatjet-light-jet.jpg", "luxus-propellerflugzeug.jpg", "luxus-turbinen-helikopter.jpg", "luxus-chopper.jpg", "luxus-naked-bike.jpg", "luxus-superbike.jpg", "luxus-diamantkollier.jpg", "luxus-goldene-herrenuhr.jpg", "luxus-luxusuhr-edelstahl.jpg", "luxus-sammleruhr.jpg", "aktivitaten-abendessen.jpg", "aktivitaten-ausflug.jpg", "aktivitaten-gebraucht-grundausstattung.jpg", "aktivitaten-geschenk.jpg", "aktivitaten-gesellschaftliches-event.jpg", "aktivitaten-gunstiger-alltag.jpg", "aktivitaten-haustier.jpg", "aktivitaten-hochzeit.jpg", "aktivitaten-kind-bekommen.jpg", "aktivitaten-urlaub.jpg", "hobbys-golf.jpg", "hobbys-motorsport.jpg", "hobbys-segeln.jpg", "hobbys-tauchen.jpg", "hobbys-tennis.jpg", "bereiche-garage.jpg", "bereiche-luxus.jpg"];
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
