/* ===========================================================
   Pablo · Sırada Bekleme — Demo (white-label çekirdek: BBAI)
   POS-bağımsız satış demosu. Veri sahteleri mock.
   =========================================================== */

/* ---------- Veri (white-label config: tema + menü) ---------- */
const BRAND = { name:"PABLO", accent:"#c98a3f" };

const BRANCHES = [
  { id:"alsancak", name:"Pablo Alsancak", addr:"Kıbrıs Şehitleri Cd. · 0.4 km", busy:"Yoğun" },
  { id:"bostanli", name:"Pablo Bostanlı", addr:"Cemal Gürsel Cd. · 2.1 km", busy:"Sakin" },
  { id:"gaziemir", name:"Pablo Gaziemir (Merkez)", addr:"Fatih Mah. 1203 Sk. · 6.8 km", busy:"Normal" },
];

// Gerçek Pablo Artisan Coffee menüsü (Yemeksepeti). o: M=sütlü kahve (süt+shot), B=sade kahve (shot), P=sabit (opsiyonsuz)
const MENU = [
  { cat:"Sıcak Kahveler", items:[
    { id:"americano",  name:"Americano",          emo:"☕", desc:"Espressoya sıcak su eklenerek hazırlanır.", price:240, o:"B" },
    { id:"filtre",     name:"Filtre Kahve",       emo:"🫖", desc:"Çekirdeklerin filtreden geçirilerek demlenmesi.", price:220, o:"B" },
    { id:"sutlufiltre",name:"Sütlü Filtre Kahve", emo:"🥛", desc:"Filtre kahvenin süt ile birleştirilmesi.", price:230, o:"M" },
    { id:"latte",      name:"Latte",              emo:"🥛", desc:"Espresso üzerine sıcak süt ve köpük.", price:250, o:"M" },
    { id:"cappuccino", name:"Cappuccino",         emo:"☕", desc:"Eşit oranda espresso, süt ve köpük.", price:260, o:"M" },
    { id:"cortado",    name:"Cortado",            emo:"☕", desc:"Eşit miktarda espresso ve süt.", price:280, o:"M" },
    { id:"flatwhite",  name:"Flat White",         emo:"☕", desc:"Espresso üzerine sıcak süt köpüğü.", price:280, o:"M" },
    { id:"mocha",      name:"Mocha",              emo:"🍫", desc:"Espresso, çikolata aroması ve süt köpüğü.", price:300, o:"M" },
    { id:"whitemocha", name:"White Mocha",        emo:"🤍", desc:"Süt, espresso, beyaz çikolata.", price:300, o:"M" },
    { id:"karamelmac", name:"Karamel Macchiato",  emo:"🍮", desc:"Sıcak süt, espresso ve karamel sosu katmanlı.", price:300, o:"M", tag:"Çok Satan" },
    { id:"salepicano", name:"Salepicano",         emo:"☕", desc:"Salepicano, süt, espresso.", price:280, o:"M", tag:"İmza" },
    { id:"tarvandesto",name:"Tarvandesto",        emo:"☕", desc:"Tarvandesto, süt, espresso.", price:250, o:"M" },
    { id:"tarumar",    name:"Tarumar",            emo:"☕", desc:"Süt, frambuaz, vanilya, espresso.", price:280, o:"M" },
    { id:"irishgus",   name:"Irish Gustavo",      emo:"☕", desc:"Irish cream, karamel, süt, espresso.", price:300, o:"M" },
    { id:"peanuts",    name:"Peanuts",            emo:"🥜", desc:"Fıstık aromalı sütlü kahve.", price:300, o:"M" },
    { id:"pistachio",  name:"Pistachio Latte",    emo:"🥜", desc:"Antep fıstıklı sıcak latte.", price:330, o:"M", tag:"Yeni" },
  ]},
  { cat:"Soğuk Kahveler", items:[
    { id:"iceamericano",name:"Iced Americano",    emo:"🧊", desc:"Buzlu su ve yoğun espresso ile.", price:260, o:"B" },
    { id:"icelatte",   name:"Iced Latte",         emo:"🧊", desc:"Espresso, süt ve soğuk süt köpüğü.", price:260, o:"M", tag:"Favori" },
    { id:"icecortado", name:"Iced Cortado",       emo:"🧊", desc:"Süt ve yoğun espresso ile.", price:290, o:"M" },
    { id:"iceflat",    name:"Iced Flat White",    emo:"🧊", desc:"El Cartel ristretto, süt ve buz.", price:290, o:"M" },
    { id:"icemocha",   name:"Iced Mocha",         emo:"🍫", desc:"Çikolata sos, espresso, süt ve buz.", price:310, o:"M" },
    { id:"icewhitemocha",name:"Iced White Mocha", emo:"🤍", desc:"Süt, espresso, beyaz çikolata.", price:310, o:"M" },
    { id:"icekaramel", name:"Iced Karamel Macchiato",emo:"🍮",desc:"Soğuk süt, espresso, karamel sosu, köpük.", price:290, o:"M", tag:"Çok Satan" },
    { id:"icecaramel2",name:"Iced Caramel Macchiato",emo:"🍮",desc:"Karamel, süt, süt köpüğü ve espresso.", price:290, o:"M" },
    { id:"icesaltedcar",name:"Iced Salted Caramel Latte",emo:"🧊",desc:"Tuzlu karamel, soğuk servis.", price:300, o:"M" },
    { id:"icefiltre",  name:"Iced Filtre Kahve",  emo:"🧊", desc:"Soğuk servis edilir.", price:230, o:"B" },
    { id:"icesutlufiltre",name:"Iced Sütlü Filtre Kahve",emo:"🥛",desc:"Soğuk servis edilir.", price:230, o:"M" },
    { id:"coldbrew",   name:"Cold Brew",          emo:"🧋", desc:"Soğuk su ile uzun süre demlenmiş kahve.", price:270, o:"B", tag:"Favori" },
    { id:"icepistachio",name:"Iced Pistachio Latte",emo:"🥜",desc:"Antep fıstığı.", price:330, o:"M", tag:"Yeni" },
    { id:"icelotus",   name:"Iced Lotus Latte",   emo:"🧊", desc:"Lotus.", price:330, o:"M" },
    { id:"icetarumar", name:"Iced Tarumar",       emo:"🧊", desc:"Böğürtlen, vanilya ve sütün buzla uyumu.", price:280, o:"M" },
    { id:"icetarvend", name:"Iced Tarvendesto",   emo:"🧊", desc:"Tarvendesto aroması, espresso ve süt.", price:280, o:"M" },
    { id:"iceirish",   name:"Iced Irish Gustavo", emo:"🧊", desc:"İrlanda aroması, karamel, süt, espresso.", price:290, o:"M" },
    { id:"icechai",    name:"Iced Chai Tea Latte",emo:"🧊", desc:"Baharat ve siyah çay, süt ve buz.", price:290, o:"P" },
  ]},
  { cat:"Sıcak İçecekler", items:[
    { id:"hotchoc",    name:"Hot Chocolate",      emo:"🍫", desc:"Sıcak süt ve çikolata.", price:280, o:"P" },
    { id:"coconutmayo",name:"Coconut Mayo",       emo:"🥥", desc:"Coconut, süt.", price:280, o:"P" },
    { id:"oreocoron",  name:"Oreo Coron",         emo:"🍪", desc:"Oreo, süt, espresso.", price:280, o:"P" },
    { id:"chai",       name:"Chai Tea Latte",     emo:"🍵", desc:"Baharat, sıcak süt ve siyah çay.", price:280, o:"P" },
    { id:"matcha",     name:"Matcha Latte",       emo:"🍵", desc:"Sıcak servis edilir.", price:280, o:"P" },
    { id:"saltedcar",  name:"Salted Caramel Latte",emo:"🍮",desc:"Sıcak servis edilir.", price:290, o:"P" },
    { id:"salep",      name:"Salep",              emo:"🥛", desc:"Sıcak servis edilir.", price:280, o:"P" },
    { id:"cay",        name:"Çay",                emo:"🫖", desc:"Sıcak servis edilir.", price:190, o:"P" },
  ]},
  { cat:"Soğuk İçecekler", items:[
    { id:"icechoc",    name:"Iced Chocolate",     emo:"🧊", desc:"Çikolatalı mocha aroması, süt ve buz.", price:290, o:"P" },
    { id:"icecoconut", name:"Iced Coconut Mayo",  emo:"🥥", desc:"Hindistan cevizi, çikolata parçacığı, süt, buz.", price:290, o:"P" },
    { id:"iceoreo",    name:"Iced Oreo Coron",    emo:"🍪", desc:"Soğuk servis edilir.", price:290, o:"P" },
    { id:"icesalepic", name:"Iced Salepicano",    emo:"🧊", desc:"Salep ve yoğun espresso, buzla.", price:290, o:"P" },
    { id:"icematcha",  name:"Ice Matcha Latte",   emo:"🍵", desc:"Soğuk servis edilir.", price:290, o:"P" },
    { id:"matchacream",name:"Matcha Cream",       emo:"🍵", desc:"Soğuk servis edilir.", price:290, o:"P" },
    { id:"coollime",   name:"Cool Lime",          emo:"🍋", desc:"Misket limon, bahçe nanesi, cool lime özü.", price:290, o:"P" },
    { id:"coolberry",  name:"Cool Berry",         emo:"🫐", desc:"Soğuk meyveli serinletici.", price:290, o:"P" },
    { id:"coolacai",   name:"Cool Açai",          emo:"🫐", desc:"Soğuk servis edilir.", price:290, o:"P" },
    { id:"mangoroi",   name:"Mango Roiboos",      emo:"🥭", desc:"Soğuk servis edilir.", price:290, o:"P" },
    { id:"forevermelon",name:"Forever Melon",     emo:"🍈", desc:"Soğuk servis edilir.", price:290, o:"P" },
    { id:"eldorado",   name:"Eldorado",           emo:"🥤", desc:"Eldorado, süt ve buz.", price:300, o:"P" },
    { id:"grassias",   name:"Grassias",           emo:"🥤", desc:"Soğuk servis edilir.", price:320, o:"P" },
  ]},
  { cat:"Tatlılar", items:[
    { id:"lotusmono",  name:"Lotus Mono Cheesecake",emo:"🍰",desc:"Dilim.", price:340, o:"P", tag:"Çok Satan" },
    { id:"karaorman",  name:"Karaorman Pasta",    emo:"🍰", desc:"Dilim olarak servis edilir.", price:315, o:"P" },
    { id:"monstercookie",name:"Monster Cookie",   emo:"🍪", desc:"Akışkan çikolata.", price:280, o:"P" },
    { id:"pablobomba", name:"Pablo Bomba",        emo:"🍩", desc:"Adet olarak servis edilir.", price:200, o:"P" },
    { id:"lotusberliner",name:"Lotuslu Berliner", emo:"🍩", desc:"Adet olarak servis edilir.", price:220, o:"P" },
  ]},
  { cat:"Bakery & Atıştırmalık", items:[
    { id:"bagel",      name:"Hindi Füme Dana Jambon Bagel",emo:"🥯",desc:"Bagel ekmek, hindi füme, dana jambon, cheddar.", price:300, o:"P" },
    { id:"mahlepli",   name:"Mahlepli Tuzlu Kurabiye",emo:"🥨",desc:"Un, mahlep, tuz, su, maya, zeytinyağı.", price:190, o:"P" },
    { id:"shotmood",   name:"Shot Mood",          emo:"⚡", desc:"Tek kişilik.", price:100, o:"P" },
  ]},
  { cat:"İçecekler", items:[
    { id:"cola",       name:"Coca-Cola (33 cl.)", emo:"🥤", desc:"Kutu içecek.", price:160, o:"P" },
    { id:"colazero",   name:"Coca-Cola Zero (33 cl.)",emo:"🥤",desc:"Kutu içecek.", price:160, o:"P" },
    { id:"colalight",  name:"Coca-Cola Light (33 cl.)",emo:"🥤",desc:"Kutu içecek.", price:160, o:"P" },
    { id:"fanta",      name:"Fanta (33 cl.)",     emo:"🥤", desc:"Kutu içecek.", price:160, o:"P" },
    { id:"sprite",     name:"Sprite (33 cl.)",    emo:"🥤", desc:"Kutu içecek.", price:160, o:"P" },
    { id:"fusetea",    name:"Fuse Tea (33 cl.)",  emo:"🧃", desc:"Kutu içecek.", price:160, o:"P" },
    { id:"redbull",    name:"Red Bull (25 cl.)",  emo:"🪫", desc:"Enerji içeceği.", price:195, o:"P" },
    { id:"redbullorg", name:"Red Bull Organic (25 cl.)",emo:"🪫",desc:"Organik enerji içeceği.", price:195, o:"P" },
    { id:"churchill",  name:"Churchill",          emo:"🥤", desc:"Soğuk servis edilir.", price:180, o:"P" },
    { id:"soda",       name:"Soda (20 cl)",       emo:"💧", desc:"Sade soda.", price:95,  o:"P" },
    { id:"limsoda",    name:"Limonlu Soda (20 cl.)",emo:"🍋",desc:"Cam şişe.", price:95,  o:"P" },
    { id:"su",         name:"Su (50 cl.)",        emo:"💧", desc:"Pet şişe.", price:60,  o:"P" },
  ]},
  { cat:"Kapsül Kahve", items:[
    { id:"kapadagio",  name:"Kapsül Adagio · Yumuşak",emo:"📦",desc:"Paketli.", price:330, o:"P" },
    { id:"kapallegretto",name:"Kapsül Allegretto · Orta",emo:"📦",desc:"Paketli.", price:330, o:"P" },
    { id:"kapallegro", name:"Kapsül Allegro · Sert",emo:"📦",desc:"Paketli.", price:330, o:"P" },
    { id:"kapharmony", name:"Kapsül Harmony",     emo:"📦", desc:"Paketli.", price:330, o:"P" },
  ]},
  { cat:"Ekstralar", items:[
    { id:"buzlubardak",name:"Buzlu Bardak",       emo:"🧊", desc:"Ekstra buzlu bardak.", price:65, o:"P" },
    { id:"poset",      name:"Plastik Poşet",      emo:"🛍️", desc:"Çevre Kanunu kapsamında ücretlidir.", price:1, o:"P" },
  ]},
];

const OPTIONS = {
  milk:   { title:"Süt Tercihi", choices:[ {k:"tam",label:"Tam Yağlı",d:0,def:1},{k:"yagsiz",label:"Yağsız",d:0},{k:"laktoz",label:"Laktozsuz",d:15},{k:"badem",label:"Badem Sütü",d:20},{k:"yulaf",label:"Yulaf Sütü",d:20} ] },
  shot:   { title:"Ekstra Shot", choices:[ {k:"0",label:"Yok",d:0,def:1},{k:"1",label:"+1 Shot",d:25},{k:"2",label:"+2 Shot",d:45} ] },
};
const OPT_MAP = { M:["milk","shot"], B:["shot"], P:[] };
const itemOpts = (id)=>{ const it=findItem(id); return OPT_MAP[it && it.o ? it.o : "P"]; };

/* ---------- Durum ---------- */
// branch QR'dan gelir (her şubenin QR'ı farklı). Self-servis: masa yok, sipariş tezgahtan no ile alınır.
let state = { branch:"alsancak", cart:[], pay:"card", tab:"menu", phone:"+90 532 418 22 07", name:(localStorage.getItem("pablo_name")||""), pickupMin:0, member:(localStorage.getItem("pablo_member")==="1"), remote:false, suspendAdd:0 };
const PICKUPS = [{m:0,l:"Hemen"},{m:15,l:"15 dk"},{m:30,l:"30 dk"},{m:60,l:"1 saat"}];
function pickupLabel(min){ return new Date(Date.now()+min*60000).toLocaleTimeString("tr-TR",{hour:'2-digit',minute:'2-digit'}); }
function selPickup(m){ state.pickupMin=m; renderPay(); }
let currentOrder = { no:"P-204", name:"" };
function onName(v){ state.name=v; localStorage.setItem("pablo_name", v); }
const LOY_KEY = "pablo_loyalty";
let loyalty = JSON.parse(localStorage.getItem(LOY_KEY) || '{"stamps":3,"points":640}');
function saveLoy(){ localStorage.setItem(LOY_KEY, JSON.stringify(loyalty)); }

/* Cüzdan & seviye */
let wallet = parseInt(localStorage.getItem("pablo_wallet") ?? "250", 10);
function saveWallet(){ localStorage.setItem("pablo_wallet", wallet); }
const TIERS = [{n:"Bronze",min:0,emo:"🥉"},{n:"Silver",min:1000,emo:"🥈"},{n:"Gold",min:3000,emo:"🥇"}];
const curTier = p => TIERS.reduce((t,x)=> p>=x.min? x : t, TIERS[0]);
const nextTier = p => TIERS.find(x=>x.min>p) || null;

/* Canlı yoğunluk (tezgah/hazırlık yükü — şubeye göre) */
const BUSY = {
  "Sakin":  { bars:1, t:"Sakin", wait:"~2 dk", color:"#2f7d5b" },
  "Normal": { bars:2, t:"Orta",  wait:"~5 dk", color:"#c98a3f" },
  "Yoğun":  { bars:3, t:"Yoğun", wait:"~9 dk", color:"#c0512f" },
};
const busyOf = id => { const b=BRANCHES.find(x=>x.id===id)||BRANCHES[0]; return { ...BUSY[b.busy], raw:b.busy }; };
// önündeki sipariş = barista ekranındaki bekleyen iş (canlı bağ)
const aheadCount = () => kdsLoad().filter(o=>o.status!=="ready").length;

/* Dijital askıda kahve */
const SUSP_KEY="pablo_suspended";
let suspended = parseInt(localStorage.getItem(SUSP_KEY) ?? "12", 10);
function saveSusp(){ localStorage.setItem(SUSP_KEY, suspended); }
const SUSPEND_PRICE=50;
let askFeed = [
  { n:"Mehmet K.",   emo:"🙂", t:"az önce",    q:1 },
  { n:"Elif",        emo:"💛", t:"12 dk önce", q:2 },
  { n:"Bir Pablo dostu", emo:"🫶", t:"34 dk önce", q:1 },
];

/* Her zamanki (son sipariş) */
let usual = JSON.parse(localStorage.getItem("pablo_usual") || "null")
  || [ {id:"flatwhite",name:"Flat White",emo:"☕",qty:1,opt:"Tam Yağlı",unit:280},
       {id:"lotusmono",name:"Lotus Mono Cheesecake",emo:"🍰",qty:1,opt:"",unit:340} ];

/* Üyelik & geçmiş siparişler (üyelere özel) */
const HIST_KEY="pablo_history";
const histLoad = ()=> JSON.parse(localStorage.getItem(HIST_KEY)||"[]");
const histSave = h => localStorage.setItem(HIST_KEY, JSON.stringify(h));
function nowStamp(){ const d=new Date(Date.now()); return d.toLocaleDateString("tr-TR",{day:'numeric',month:'long'})+" · "+d.toLocaleTimeString("tr-TR",{hour:'2-digit',minute:'2-digit'}); }
function histSeed(){
  if(histLoad().length) return;
  const fmt=off=>{const x=new Date(Date.now()-off);return x.toLocaleDateString("tr-TR",{day:'numeric',month:'long'})+" · "+x.toLocaleTimeString("tr-TR",{hour:'2-digit',minute:'2-digit'})};
  histSave([
    {no:"P-187",date:fmt(86400000),total:620,lines:[{id:"flatwhite",name:"Flat White",emo:"☕",qty:1,opt:"Tam Yağlı",unit:280},{id:"lotusmono",name:"Lotus Mono Cheesecake",emo:"🍰",qty:1,opt:"",unit:340}]},
    {no:"P-165",date:fmt(3*86400000),total:520,lines:[{id:"icelatte",name:"Iced Latte",emo:"🧊",qty:2,opt:"Tam Yağlı",unit:260}]},
    {no:"P-142",date:fmt(6*86400000),total:280,lines:[{id:"salepicano",name:"Salepicano",emo:"☕",qty:1,opt:"Tam Yağlı",unit:280}]},
  ]);
}

const TL = n => "₺"+n.toLocaleString("tr-TR");
const $ = s => document.querySelector(s);

/* ---------- Navigasyon ---------- */
function go(id){
  document.querySelectorAll(".screen").forEach(s=>s.classList.remove("active"));
  const el = document.getElementById(id); el.classList.add("active");
  el.querySelector(".scroll") && (el.querySelector(".scroll").scrollTop = 0);
  if(id==="s-splash") renderSplash();
  if(id==="s-menu")   renderMenu();
  if(id==="s-cart")   renderCart();
  if(id==="s-pay")    renderPay();
  if(id==="s-loy")    renderLoy();
  if(id==="s-kds")    renderKDS();
  if(id==="s-history")renderHistory();
  if(id==="s-branch") renderBranches();
}
function openTab(t){ state.tab=t; go(t==="loy"?"s-loy":"s-menu"); }

/* ---------- Sahte QR (demo görseli) ---------- */
function drawQR(){
  const N=25, cell=8, pad=0, sz=N*cell;
  let rects="";
  // pseudo-random desen (deterministik)
  let seed=7;
  const rnd=()=>{ seed=(seed*1103515245+12345)&0x7fffffff; return seed/0x7fffffff; };
  const finder=(x,y)=>{ // 7x7 finder pattern
    for(let i=0;i<7;i++)for(let j=0;j<7;j++){
      const edge=(i===0||i===6||j===0||j===6), core=(i>=2&&i<=4&&j>=2&&j<=4);
      if(edge||core) rects+=`<rect x="${(x+j)*cell}" y="${(y+i)*cell}" width="${cell}" height="${cell}"/>`;
    }
  };
  for(let y=0;y<N;y++)for(let x=0;x<N;x++){
    if((x<8&&y<8)||(x>N-9&&y<8)||(x<8&&y>N-9)) continue; // finder alanları
    if(rnd()>0.55) rects+=`<rect x="${x*cell}" y="${y*cell}" width="${cell}" height="${cell}"/>`;
  }
  finder(0,0); finder(N-7,0); finder(0,N-7);
  $("#qrCard").innerHTML =
    `<svg width="180" height="180" viewBox="0 0 ${sz} ${sz}" fill="#1b1410">${rects}</svg>`;
}

/* ---------- Şube seç (uzaktan sipariş) ---------- */
function renderBranches(){
  $("#branchList").innerHTML = BRANCHES.map(b=>{
    const z=BUSY[b.busy]||BUSY["Normal"];
    return `
    <div class="branch ${state.branch===b.id?'sel':''}" onclick="selBranch('${b.id}')">
      <div class="pin">📍</div>
      <div class="info"><b>${b.name.replace('Pablo ','')}</b><span>${b.addr}</span>
        <span class="blive-sm" style="color:${z.color}"><span class="d"></span>Tezgah ${z.t} · hazırlık ${z.wait}</span>
      </div>
      <div style="text-align:right">
        <div class="badge-open">● Açık</div>
        <div class="bbars" style="--bz:${z.color};justify-content:flex-end;margin-top:6px">
          <i class="${z.bars>=1?'on':''}"></i><i class="${z.bars>=2?'on':''}"></i><i class="${z.bars>=3?'on':''}"></i></div>
      </div>
    </div>`;
  }).join("");
}
function selBranch(id){ state.branch=id; state.remote=true; state.pickupMin=state.pickupMin||15; go('s-menu'); }

/* ---------- Splash (QR = bu şube) ---------- */
function renderSplash(){
  const b = BRANCHES.find(x=>x.id===state.branch) || BRANCHES[0];
  const el = $("#splashLoc");
  if(el) el.innerHTML = `<span class="dot"></span>${b.name.replace("Pablo ","")} Şubesi`;
  renderSplashBusy();
  renderSplashAsk();
}
function busyHTML(id){
  const z=busyOf(id), ah=aheadCount();
  return `<div class="busy" style="--bz:${z.color}">
    <span class="blive"></span>
    <div class="bbars"><i class="${z.bars>=1?'on':''}"></i><i class="${z.bars>=2?'on':''}"></i><i class="${z.bars>=3?'on':''}"></i></div>
    <div class="btxt">Tezgah şu an <b>${z.t}</b><small>● Canlı · hazırlık ${z.wait}${ah?` · ${ah} sipariş önünde`:" · sıra yok"}</small></div>
  </div>`;
}
function renderSplashBusy(){ const el=$("#splashBusy"); if(el) el.innerHTML=busyHTML(state.branch); }
function renderSplashAsk(){
  const el=$("#splashAsk"); if(!el) return;
  el.innerHTML=`<div class="ask-chip" onclick="openTab('loy')">🫶 Şu an <b>${suspended}</b> kahve askıda · sen de bırak →</div>`;
}

/* ---------- Menü ---------- */
const CAT_EMO = { "Sıcak Kahveler":"☕","Soğuk Kahveler":"🧊","Sıcak İçecekler":"🍵","Soğuk İçecekler":"🥤",
  "Tatlılar":"🍰","Bakery & Atıştırmalık":"🥐","İçecekler":"🥫","Kapsül Kahve":"📦","Ekstralar":"➕" };
const FAVS = MENU.flatMap(c=>c.items).filter(it=>it.tag);   // etiketli = öne çıkan
let openCats = new Set(MENU.map((_,i)=>i));                 // hepsi açık başlar
let searchActive=false, menuWired=false, spyRAF=0;

function itemCard(it){
  return `<div class="item" data-name="${it.name.toLowerCase()}" data-desc="${(it.desc||'').toLowerCase()}" onclick="openSheet('${it.id}')">
    <div class="thumb">${it.emo}</div>
    <div class="body">
      ${it.tag?`<span class="tag">${it.tag}</span>`:''}
      <b>${it.name}</b><p>${it.desc||''}</p>
      <div class="row"><span class="price">${TL(it.price)}</span>
        <button class="addbtn" onclick="event.stopPropagation();quickAdd('${it.id}')">+</button></div>
    </div>
  </div>`;
}
function renderMenu(){
  const b = BRANCHES.find(x=>x.id===state.branch);
  $("#menuBranch").textContent = b? b.name.replace("Pablo ","Pablo · ") : "Pablo";
  // tablar
  $("#cats").innerHTML = MENU.map((c,i)=>`<div class="chip" data-ci="${i}" onclick="goCat(${i})">${c.cat}</div>`).join("");
  // en sevilenler vitrini
  $("#favRail").innerHTML = `<div class="fav-wrap" id="favWrap">
    <div class="fav-h">⭐ En Sevilenler</div>
    <div class="fav-rail">${FAVS.map(it=>`
      <div class="fav-card" onclick="openSheet('${it.id}')">
        <div class="ph">${it.emo}<span class="tag">${it.tag}</span></div>
        <div class="meta"><b>${it.name}</b>
          <div class="pr"><span class="price">${TL(it.price)}</span>
            <button class="addbtn" onclick="event.stopPropagation();quickAdd('${it.id}')">+</button></div>
        </div>
      </div>`).join("")}</div></div>`;
  // akordeon kategoriler
  $("#menuList").innerHTML = MENU.map((c,ci)=>`
    <div class="acc ${openCats.has(ci)?'open':''}" id="acc-${ci}" data-ci="${ci}">
      <button class="acc-head" onclick="toggleAcc(${ci})">
        <span class="acc-emo">${CAT_EMO[c.cat]||'•'}</span>
        <span class="acc-name">${c.cat}</span>
        <span class="acc-count">${c.items.length}</span>
        <span class="chev">⌄</span>
      </button>
      <div class="acc-body"><div class="acc-inner">${c.items.map(itemCard).join("")}</div></div>
    </div>`).join("");
  renderUsual();
  searchActive=false; const si=$("#searchInput"); if(si) si.value="";
  $("#sclear").style.display="none"; $("#searchEmpty").style.display="none";
  setActiveChip(0);
  if(!menuWired){ $("#menuScroll").addEventListener("scroll", onMenuScroll, {passive:true}); menuWired=true; }
  refreshCartBar();
}
function renderUsual(){
  const bar=$("#usualBar"); if(!bar) return;
  if(!usual || !usual.length){ bar.innerHTML=""; return; }
  const tot=usual.reduce((s,i)=>s+i.unit*i.qty,0);
  const names=usual.map(i=>`${i.qty>1?i.qty+'× ':''}${i.name}`).join(" + ");
  bar.innerHTML=`<div class="usual" onclick="reorderUsual()">
    <div class="u-ic">↻</div>
    <div class="u-body"><div class="u-t">Her Zamankini Tekrarla</div><div class="u-s">${names}</div></div>
    <div class="u-act"><div class="u-pr">${TL(tot)}</div><button class="u-add" onclick="event.stopPropagation();reorderUsual()">+ Sepete</button></div>
  </div>`;
}
function reorderUsual(){
  usual.forEach(i=>state.cart.push({uid:Date.now()+Math.random(), id:i.id, name:i.name, emo:i.emo, qty:i.qty, opt:i.opt, unit:i.unit}));
  refreshCartBar(); go("s-cart");
}
function setActiveChip(ci){
  document.querySelectorAll("#cats .chip").forEach(c=>c.classList.toggle("on", +c.dataset.ci===ci));
  const on=document.querySelector("#cats .chip.on");
  if(on) on.scrollIntoView({inline:"center",block:"nearest",behavior:"smooth"});
}
function toggleAcc(ci){
  const el=document.getElementById("acc-"+ci);
  if(el.classList.toggle("open")) openCats.add(ci); else openCats.delete(ci);
}
function goCat(ci){
  const el=document.getElementById("acc-"+ci), sc=$("#menuScroll");
  el.classList.add("open"); openCats.add(ci);
  const top = el.getBoundingClientRect().top - sc.getBoundingClientRect().top + sc.scrollTop - 6;
  sc.scrollTo({top, behavior:"smooth"});
  setActiveChip(ci);
}
function onMenuScroll(){
  if(spyRAF) return;
  spyRAF=requestAnimationFrame(()=>{
    spyRAF=0; if(searchActive) return;
    const sc=$("#menuScroll"); const line=sc.getBoundingClientRect().top+72;
    let cur=0;
    MENU.forEach((c,ci)=>{ const el=document.getElementById("acc-"+ci); if(el && el.getBoundingClientRect().top<=line) cur=ci; });
    setActiveChip(cur);
  });
}
function onSearch(v){
  const term=(v||"").toLowerCase().trim();
  searchActive=!!term;
  $("#sclear").style.display = term? "block":"none";
  const fav=$("#favWrap"); if(fav) fav.style.display = term? "none":"block";
  const ub=$("#usualBar"); if(ub) ub.style.display = term? "none":"block";
  let total=0;
  MENU.forEach((c,ci)=>{
    const acc=document.getElementById("acc-"+ci); let shown=0;
    acc.querySelectorAll(".item").forEach(it=>{
      const hit = !term || it.dataset.name.includes(term) || it.dataset.desc.includes(term);
      it.style.display = hit? "flex":"none"; if(hit) shown++;
    });
    const cnt=acc.querySelector(".acc-count"); if(cnt) cnt.textContent = term? shown : c.items.length;
    acc.style.display = (term && !shown)? "none":"block";
    if(term) acc.classList.add("open"); else acc.classList.toggle("open", openCats.has(ci));
    total+=shown;
  });
  $("#searchEmpty").style.display = (term && total===0)? "flex":"none";
}
function clearSearch(){ const si=$("#searchInput"); si.value=""; onSearch(""); si.focus(); }
const findItem = id => MENU.flatMap(c=>c.items).find(i=>i.id===id);
// Damga sayımı: yalnızca gerçek kahveler (Sıcak/Soğuk Kahve kategorileri)
const COFFEE_IDS = new Set(
  MENU.filter(c=>["Sıcak Kahveler","Soğuk Kahveler"].includes(c.cat)).flatMap(c=>c.items.map(i=>i.id))
);

/* ---------- Ürün sheet ---------- */
let sheetSel = {};
function openSheet(id){
  const it = findItem(id); const opts = itemOpts(id);
  sheetSel = { id, qty:1, opt:{} };
  opts.forEach(o=>{ const def=OPTIONS[o].choices.find(c=>c.def)||OPTIONS[o].choices[0]; sheetSel.opt[o]=def.k; });
  $("#sheet").innerHTML = `
    <div class="grab"></div>
    <div class="big">${it.emo}</div>
    <h3>${it.name}</h3><p class="desc">${it.desc}</p>
    ${opts.map(o=>`
      <div class="opt-title">${OPTIONS[o].title}</div>
      <div class="opts">${OPTIONS[o].choices.map(c=>`
        <div class="opt ${sheetSel.opt[o]===c.k?'on':''}" data-o="${o}" data-k="${c.k}" onclick="pickOpt('${o}','${c.k}')">
          ${c.label}${c.d?` +${TL(c.d)}`:''}</div>`).join("")}</div>
    `).join("")}
    <div class="qtyrow">
      <button onclick="sheetQty(-1)">−</button><b id="sQty">1</b><button onclick="sheetQty(1)">+</button>
    </div>
    <button class="btn amber" id="sheetAdd" onclick="addFromSheet()" style="margin-top:14px"></button>`;
  updateSheetBtn();
  $("#sheetWrap").classList.add("show");
}
function pickOpt(o,k){ sheetSel.opt[o]=k;
  document.querySelectorAll(`.opt[data-o="${o}"]`).forEach(e=>e.classList.toggle("on",e.dataset.k===k));
  updateSheetBtn();
}
function sheetQty(d){ sheetSel.qty=Math.max(1,sheetSel.qty+d); $("#sQty").textContent=sheetSel.qty; updateSheetBtn(); }
function sheetPrice(){
  const it=findItem(sheetSel.id); let p=it.price;
  itemOpts(sheetSel.id).forEach(o=>{ const c=OPTIONS[o].choices.find(c=>c.k===sheetSel.opt[o]); if(c)p+=c.d; });
  return p*sheetSel.qty;
}
function updateSheetBtn(){ $("#sheetAdd").innerHTML = `Sepete Ekle · ${TL(sheetPrice())}`; }
function optLabel(){
  return itemOpts(sheetSel.id).map(o=>{
    const c=OPTIONS[o].choices.find(c=>c.k===sheetSel.opt[o]); return c?c.label:""; }).filter(Boolean).join(" · ");
}
function addFromSheet(){
  const it=findItem(sheetSel.id);
  state.cart.push({ uid:Date.now()+Math.random(), id:it.id, name:it.name, emo:it.emo,
    qty:sheetSel.qty, opt:optLabel(), unit:sheetPrice()/sheetSel.qty });
  closeSheet(); refreshCartBar(); bump();
}
function quickAdd(id){
  const it=findItem(id);
  const def = itemOpts(id).map(o=>{const c=OPTIONS[o].choices.find(c=>c.def)||OPTIONS[o].choices[0];return c.label}).join(" · ");
  let unit=it.price; itemOpts(id).forEach(o=>{const c=OPTIONS[o].choices.find(c=>c.def);if(c)unit+=c.d;});
  state.cart.push({ uid:Date.now()+Math.random(), id, name:it.name, emo:it.emo, qty:1, opt:def, unit });
  refreshCartBar(); bump();
}
function closeSheet(){ $("#sheetWrap").classList.remove("show"); }

/* ---------- Sepet barı ---------- */
const cartQty   = ()=> state.cart.reduce((s,i)=>s+i.qty,0);
const cartTotal = ()=> state.cart.reduce((s,i)=>s+i.unit*i.qty,0);
function refreshCartBar(){
  const n=cartQty(); const bar=$("#goCart");
  if(!bar) return;
  bar.style.display = n? "flex":"none";
  if(n){ $("#cartCount").textContent=n; $("#cartTotal").textContent=TL(cartTotal()); }
}
function bump(){ const b=$("#goCart"); if(b){ b.style.transform="scale(1.04)"; setTimeout(()=>b.style.transform="",150);} }

/* ---------- Sepet ekranı ---------- */
function renderCart(){
  if(!state.cart.length){
    $("#cartBody").innerHTML = `<div class="center-empty"><div class="e">🛒</div><b>Sepetin boş</b><span>Menüden bir şeyler ekle</span></div>`;
    $("#cartFoot").innerHTML = `<button class="btn ghost" onclick="go('s-menu')">Menüye Dön</button>`; return;
  }
  $("#cartBody").innerHTML = state.cart.map(l=>`
    <div class="cart-line">
      <div class="ic">${l.emo}</div>
      <div class="m"><b>${l.name}</b><span>${l.opt||""}</span>
        <div class="stepper">
          <button onclick="chQty('${l.uid}',-1)">−</button><b>${l.qty}</b><button onclick="chQty('${l.uid}',1)">+</button>
          <span style="margin-left:auto;font-weight:800;color:var(--ink)">${TL(l.unit*l.qty)}</span>
        </div>
      </div>
    </div>`).join("");
  const sub=cartTotal(), pts=Math.round(sub);
  $("#cartFoot").innerHTML = `
    <div class="summary" style="margin-bottom:12px">
      <div class="l"><span>Ara toplam</span><span>${TL(sub)}</span></div>
      <div class="l"><span>Pablo Club puanı</span><span style="color:var(--amber-deep);font-weight:700">+${pts} puan</span></div>
      <div class="l tot"><span>Toplam</span><span>${TL(sub)}</span></div>
    </div>
    <button class="btn amber" onclick="go('s-pay')">Ödemeye Geç · ${TL(sub)}</button>`;
}
function chQty(uid,d){
  const l=state.cart.find(x=>x.uid==uid); if(!l)return;
  l.qty+=d; if(l.qty<=0) state.cart=state.cart.filter(x=>x.uid!=uid);
  renderCart(); refreshCartBar();
}

/* ---------- Ödeme ---------- */
function renderPay(){
  const sub=cartTotal();
  const extra=(state.suspendAdd||0)*SUSPEND_PRICE, grand=sub+extra;
  const methods = [
    {k:"wallet",   label:"Pablo Cüzdan", sub:`Bakiye ${TL(wallet)} · yükle, bonus kahve kazan`, badge:"EN HIZLI", bc:"fast", bg:"linear-gradient(135deg,#2f7d5b,#1c4e3a)", t:"₺"},
    {k:"card",     label:"Kayıtlı Kart ·· 4417", sub:"Tek dokunuş, tekrar yazma yok", bg:"linear-gradient(135deg,#c98a3f,#a96f2c)", t:"VISA"},
    {k:"applepay", label:"Apple Pay", sub:"Face ID ile öde", bg:"#000", t:""},
    {k:"googlepay",label:"Google Pay", sub:"Parmak izi ile öde", bg:"#4285F4", t:"G"},
    {k:"newcard",  label:"Yeni Kart Ekle", sub:"Kamerayla tara — bir kez, sonra tek dokunuş", badge:"İLK KEZ", bc:"nfc", bg:"#6b5847", t:"＋"},
  ];
  $("#payMethods").innerHTML = methods.map(p=>`
    <div class="pay-method ${state.pay===p.k?'sel':''}" onclick="selPay('${p.k}')">
      <div class="pic" style="background:${p.bg}">${p.t}</div>
      <div class="pm-txt"><b>${p.label}${p.badge?`<span class="pm-badge ${p.bc}">${p.badge}</span>`:''}</b><span>${p.sub}</span></div>
      <div class="radio"></div>
    </div>`).join("");
  // cüzdan bakiyesi yetersizse uyarı + hızlı yükle
  const note=$("#payNote");
  if(state.pay==="wallet" && wallet<grand){
    note.innerHTML=`<div class="pay-warn">Bakiye yetersiz (${TL(wallet)}). <button onclick="quickTop(${grand})">+${TL(Math.ceil((grand-wallet)/100)*100)} Yükle</button> ya da başka yöntem seç.</div>`;
  } else note.innerHTML="";
  renderAskPay();
  $("#paySummary").innerHTML = `
    <div class="l"><span>${cartQty()} ürün</span><span>${TL(sub)}</span></div>
    ${extra?`<div class="l"><span>🫶 Askıda kahve · ${state.suspendAdd} adet</span><span>${TL(extra)}</span></div>`:''}
    <div class="l"><span>Servis</span><span>Ücretsiz</span></div>
    <div class="l tot"><span>Toplam</span><span>${TL(grand)}</span></div>`;
  $("#pickups").innerHTML = PICKUPS.map(p=>`
    <div class="opt ${state.pickupMin===p.m?'on':''}" onclick="selPickup(${p.m})">
      ${p.l}<small>${p.m?pickupLabel(p.m)+"'de":"~4 dk içinde"}</small>
    </div>`).join("");
  $("#payBtn").innerHTML = state.pickupMin
    ? `${TL(grand)} Öde · ${pickupLabel(state.pickupMin)}'de hazır`
    : `${TL(grand)} Öde`;
  const ni=$("#nameInput"); if(ni) ni.value=state.name||"";
}
function renderAskPay(){
  const box=$("#askPay"); if(!box) return;
  const on=state.suspendAdd>0;
  box.innerHTML=`<div class="ask-pay ${on?'on':''}" onclick="toggleAskPay()">
    <div class="ap-emo">🫶</div>
    <div class="ap-t"><b>Bir kahve askıya bırak</b><span>İhtiyacı olan birine +${TL(SUSPEND_PRICE)} · şu an ${suspended} kahve askıda</span></div>
    <div class="ap-sw"></div>
  </div>`;
}
function toggleAskPay(){ state.suspendAdd = state.suspendAdd>0?0:1; renderPay(); }
function quickTop(target){
  const add=Math.max(100,Math.ceil((target-wallet)/100)*100); const b=walletBonus(add);
  wallet+=add+b; saveWallet(); renderPay();
  if(b) showToast(`+${TL(add)} yüklendi · ${TL(b)} HEDİYE 🎁`, `Yeni bakiye ${TL(wallet)}.`);
}
function selPay(k){ state.pay=k; renderPay(); }

/* ---------- Ödeme → Sipariş ---------- */
let orderTimer=null;
function pay(){
  const btn=$("#payBtn"); btn.innerHTML="İşleniyor…"; btn.disabled=true;
  setTimeout(()=>{ btn.disabled=false; startOrder(); }, 1100);
}
function startOrder(){
  // sadakat güncelle
  const coffees = state.cart.filter(l=>COFFEE_IDS.has(l.id)).reduce((s,l)=>s+l.qty,0);
  loyalty.stamps = (loyalty.stamps + coffees);
  loyalty.points = loyalty.points + Math.round(cartTotal());
  let reward=false;
  if(loyalty.stamps>=8){ loyalty.stamps=loyalty.stamps-8; reward=true; }
  saveLoy();
  // "her zamanki"yi bu siparişle güncelle
  usual = state.cart.map(l=>({id:l.id,name:l.name,emo:l.emo,qty:l.qty,opt:l.opt,unit:l.unit}));
  localStorage.setItem("pablo_usual", JSON.stringify(usual));
  // askıda kahve bağışı (opsiyonel) — bu siparişle birlikte
  const extra = (state.suspendAdd||0)*SUSPEND_PRICE;
  if(state.suspendAdd>0){
    suspended += state.suspendAdd; saveSusp();
    askFeed.unshift({ n: (state.name||"").trim()||"Sen", emo:"⭐", t:"şimdi", q:state.suspendAdd });
  }
  // cüzdanla ödendiyse bakiyeden düş (sipariş + bağış)
  if(state.pay==="wallet"){ wallet=Math.max(0, wallet-Math.round(cartTotal())-extra); saveWallet(); }

  const no = "P-"+(200+Math.floor(Math.random()*99));
  const nm = (state.name||"").trim();
  const sched = state.pickupMin>0;
  currentOrder = { no, name:nm, reward, scheduled:sched, time: sched?pickupLabel(state.pickupMin):null, pay:state.pay,
    items: state.cart.map(l=>l.name), emo: (state.cart[0]&&state.cart[0].emo)||"☕" };
  kdsPush(no, nm||"Misafir", state.cart, state.pay);   // barista ekranına düşür
  const sp=$("#statusPay"); sp.className="status-pay"; sp.textContent="✓ Ödeme uygulamadan alındı — kasaya uğrama yok";
  // geçmişe kaydet
  const hh=histLoad();
  hh.unshift({ no, date:nowStamp(), total:Math.round(cartTotal()),
    lines: state.cart.map(l=>({id:l.id,name:l.name,emo:l.emo,qty:l.qty,opt:l.opt,unit:l.unit})) });
  histSave(hh);
  $("#orderNo").textContent=no;
  $("#orderName").textContent = nm ? (sched?`${nm} adına`:`${nm} adına hazırlanıyor`) : "";
  $("#toastBody").textContent = `${no} numaralı siparişin hazır rafında, adınla alabilirsin.`;
  go("s-status");
  resetStatus();
  $("#statusAction").innerHTML="";
  if(sched) scheduledStatus(); else runStatus(reward);
}
function scheduledStatus(){
  $("#st-prep").classList.remove("on","done");
  $("#ringEmoji").textContent="🕒";
  $("#ringP").style.strokeDashoffset=311;            // hafif dolu, beklemede
  $("#eta").innerHTML = `🕒 <b>${currentOrder.time}</b>'de hazır olacak<br><span style="opacity:.7">Yaklaşınca hazırlamaya başlayacağız, hazır olunca bildirim göndereceğiz</span>`;
  $("#st-prep").querySelector("b").textContent="Zamanlandı";
  $("#st-prep").querySelector("span").textContent=`${currentOrder.time} için sıraya alındı`;
  $("#st-prep").classList.add("on");
  renderCam("sched");
  $("#statusAction").innerHTML = `<button class="btn amber" style="margin-bottom:10px" onclick="arrivePrep()">📍 Geldim, hazırlamaya başla</button>`;
}
function arrivePrep(){
  $("#statusAction").innerHTML="";
  $("#st-prep").querySelector("b").textContent="Hazırlanıyor";
  $("#st-prep").querySelector("span").textContent="Barista siparişini yapıyor";
  resetStatus();
  runStatus(currentOrder.reward);
}
function resetStatus(){
  ["st-prep","st-ready"].forEach(s=>{document.getElementById(s).classList.remove("on","done")});
  $("#ringP").style.strokeDashoffset=415; $("#ringEmoji").textContent="⏳";
  $("#eta").textContent="Tahmini hazırlık: ~4 dk";
}
/* ---------- Barista Cam (canlı izleme) ---------- */
function renderCam(mode){  // mode: 'prep' | 'ready' | 'sched' | 'hide'
  const box=$("#baristaCam"); if(!box) return;
  if(mode==="hide"){ box.innerHTML=""; return; }
  const b=BRANCHES.find(x=>x.id===state.branch)||BRANCHES[0];
  const who=b.name.replace("Pablo ","Pablo · ")+" · Tezgah 1";
  const emo=(currentOrder.emo)||"☕";
  const drink=(currentOrder.items&&currentOrder.items[0])||"Siparişin";
  const nm=currentOrder.name;
  const cfg={
    prep:  { tag:"CANLI", face:"🧑‍🍳", steam:true,  cap:`${drink} şu an hazırlanıyor — canlı izliyorsun ☕`, done:false },
    ready: { tag:"KAYIT", face:"🧑‍🍳", steam:true,  cap:`Hazır! ${nm?nm+", ":""}hazır rafından alabilirsin ✅`, done:true },
    sched: { tag:"BEKLEMEDE", face:"🕒", steam:false, cap:`${currentOrder.time}'de hazırlanmaya başlayacak · tezgah seni bekliyor`, done:false },
  }[mode];
  if(!cfg) return;
  box.innerHTML=`<div class="bcam ${cfg.done?'done':''}">
    <div class="bcam-top">
      <span class="bcam-live"><span class="rec"></span>${cfg.tag}</span>
      <span class="who">${who}</span>
    </div>
    <div class="bcam-stage">
      <div class="bcam-badge">☕ Barista Cam · EK MODÜL (opsiyonel)</div>
      <div class="bcam-scan"></div>
      <div class="bcam-scene">
        <span class="machine">${cfg.face}</span>
        <span class="bcam-cup">${cfg.done?"✅":emo}${cfg.steam?`<span class="steam"><i></i><i></i><i></i></span>`:""}</span>
      </div>
    </div>
    <div class="bcam-cap"><span class="cdot"></span>${cfg.cap}</div>
  </div>`;
}
function runStatus(reward){
  // demo hız: ~7 sn toplam
  const ring=$("#ringP"); let p=0;
  $("#st-prep").classList.add("on");
  $("#ringEmoji").textContent="☕";
  renderCam("prep");
  const iv=setInterval(()=>{
    p+=2.2; if(p>100)p=100;
    ring.style.strokeDashoffset = 415-(415*p/100);
    if(p>=100){
      clearInterval(iv);
      $("#st-prep").classList.remove("on"); $("#st-prep").classList.add("done");
      $("#st-ready").classList.add("on");
      $("#ringEmoji").textContent="✅"; $("#eta").textContent="Hazır rafından adınla al — sıraya girme yok";
      notifyReady(reward);
    }
  },150);
}
function notifyReady(reward){
  const nm=currentOrder.name;
  const title = nm ? `${nm}, siparişin hazır! 🔔` : "Siparişin hazır! 🔔";
  // Gerçek push izni varsa onu da dene (bonus); değilse toast
  try{
    if("Notification" in window && Notification.permission==="granted"){
      new Notification("Pablo · "+title, { body:$("#toastBody").textContent });
    }
  }catch(e){}
  showToast(title, $("#toastBody").textContent);
  renderCam("ready");
  if(reward) setTimeout(()=>showToast("Tebrikler! 🎁","10. kahven bizden — bu sipariş bedava sayıldı."),1600);
  if(navigator.vibrate) navigator.vibrate([40,60,40]);
}
function finishOrder(){ state.cart=[]; state.pickupMin=0; state.suspendAdd=0; renderCam("hide"); go("s-menu"); }

/* ---------- Toast ---------- */
let toastT=null;
function showToast(title,body){
  const t=$("#toast");
  $("#toastTitle").textContent=title;
  t.querySelector("span").textContent=body;
  t.classList.add("show"); clearTimeout(toastT);
  toastT=setTimeout(()=>t.classList.remove("show"),4200);
}

/* ---------- Sadakat ekranı ---------- */
function renderLoy(){
  const s=loyalty.stamps;
  let html="";
  for(let i=1;i<=8;i++){
    if(i===8) html+=`<div class="stamp ${s>=8?'full':'reward'}">${s>=8?'☕':'🎁'}</div>`;
    else html+=`<div class="stamp ${i<=s?'full':''}">${i<=s?'☕':i}</div>`;
  }
  $("#stamps").innerHTML=html;
  $("#ptsVal").textContent=loyalty.points.toLocaleString("tr-TR");
  $("#loySub").textContent = s>=8? "Ödülün hazır! 🎉" : `${8-s} kahve sonra 8. kahve bedava`;
  renderWallet();
  renderAskida();
  $("#loyPhone").textContent = state.phone.replace(/(\d{3}) (\d{3}) (\d{2}) (\d{2})/,"$1 ••• •• $4");
}
/* ---------- Dijital askıda kahve ---------- */
function askFeedHTML(){
  return askFeed.slice(0,3).map(f=>`<div class="ask-row">
    <span class="ava">${f.emo}</span>
    <span class="at"><b>${f.n}</b> · ${f.q} kahve bıraktı</span>
    <span class="aw">${f.t}</span></div>`).join("");
}
function renderAskida(){
  const box=$("#askidaBox"); if(!box) return;
  box.innerHTML=`<div class="askida">
    <div class="ask-top"><div class="ask-emo">🫶</div>
      <div><div class="ask-t">Şu an <b id="askCount">${suspended}</b> kahve askıda</div>
      <div class="ask-s">İhtiyacı olan biri tezgahta ücretsiz alabilir</div></div></div>
    <p class="ask-desc">Bir yabancıya, bir öğrenciye kahve ısmarla. Sen bırak — ihtiyacı olan "askıda kahve var mı?" deyip alsın. Pablo aradaki köprü.</p>
    <div class="ask-feed">${askFeedHTML()}</div>
    <div class="ask-btns">${[1,2,5].map(n=>`<button class="ask-give" onclick="donate(${n})">+${n} kahve<small>${TL(n*SUSPEND_PRICE)}</small></button>`).join("")}</div>
  </div>`;
}
function donate(n){
  suspended+=n; saveSusp();
  askFeed.unshift({ n:(state.name||"").trim()||"Sen", emo:"⭐", t:"şimdi", q:n });
  renderAskida(); renderSplashAsk();
  showToast(`${n} kahve askıya bırakıldı 🫶`, `Teşekkürler! İhtiyacı olan biri içecek. Toplam ${suspended} kahve askıda.`);
}
function renderWallet(){
  const box=$("#walletBox"); if(!box) return;
  const p=loyalty.points, t=curTier(p), nt=nextTier(p);
  const pct = nt ? Math.min(100, Math.round((p-t.min)/(nt.min-t.min)*100)) : 100;
  box.innerHTML = `<div class="opt-title">Pablo Cüzdan</div>
    <div class="wallet">
      <div class="w-top">
        <div><div class="w-lbl">Bakiye</div><div class="w-bal">${TL(wallet)}</div></div>
        <div class="tier-badge">${t.emo} ${t.n}</div>
      </div>
      <div class="w-prog"><div class="w-bar" style="width:${pct}%"></div></div>
      <div class="w-next">${nt? `${nt.emo} ${nt.n} seviyesine <b>${(nt.min-p).toLocaleString("tr-TR")} puan</b>` : "En üst seviyedesin 🎉"}</div>
      <div class="w-bonus">🎁 <b>Yükle, bonus kazan:</b> ne kadar çok yüklersen o kadar bedava kahveye yaklaşırsın</div>
      <div class="w-btns">${[100,250,500].map(a=>{const b=walletBonus(a);return `<button class="w-load" onclick="topUp(${a})">+${TL(a)}${b?`<small>+${TL(b)} hediye</small>`:''}</button>`;}).join("")}</div>
    </div>`;
}
function walletBonus(a){ return a>=500?50 : a>=250?20 : 0; }
function topUp(a){
  const b=walletBonus(a); wallet+=a+b; saveWallet(); renderWallet();
  showToast(b?`+${TL(a)} yüklendi · ${TL(b)} HEDİYE 🎁`:`+${TL(a)} yüklendi 💳`,
    `Yeni bakiye ${TL(wallet)}.${b?` ${TL(b)} bonus bakiyeyle ekstra kahve!`:""}`);
}

/* ---------- KDS / Barista ekranı ---------- */
const KDS_KEY="pablo_kds";
const kdsLoad = ()=> JSON.parse(localStorage.getItem(KDS_KEY)||"[]");
const kdsSave = q => localStorage.setItem(KDS_KEY, JSON.stringify(q));
function kdsPush(no,name,cart,pay){ const q=kdsLoad(); q.unshift({no,name,items:cart.map(l=>({n:l.name,q:l.qty})),status:"new",ts:Date.now(),pay}); kdsSave(q); }
function kdsSeed(){
  if(kdsLoad().length) return;
  kdsSave([
    {no:"P-200",name:"Zeynep",items:[{n:"Flat White",q:1}],status:"ready",ts:Date.now()-300000},
    {no:"P-201",name:"Elif",items:[{n:"Latte",q:1},{n:"Çikolatalı Cookie",q:1}],status:"prep",ts:Date.now()-150000},
    {no:"P-202",name:"Can",items:[{n:"Iced Americano",q:2}],status:"new",ts:Date.now()-50000},
  ]);
}
function renderKDS(){
  kdsSeed(); const q=kdsLoad();
  const c={new:0,prep:0,ready:0}; q.forEach(o=>c[o.status]!=null&&c[o.status]++);
  $("#kdsStats").innerHTML=`<span><b>${c.new}</b> yeni</span><span><b>${c.prep}</b> hazırlanıyor</span><span><b>${c.ready}</b> hazır</span>`;
  const ord={new:0,prep:1,ready:2};
  const ST={new:{l:"YENİ",btn:"Hazırlamaya Başla →"},prep:{l:"HAZIRLANIYOR",btn:"Hazır ✓"},ready:{l:"HAZIR",btn:"Teslim Et"}};
  const sorted=[...q].sort((a,b)=> (ord[a.status]-ord[b.status]) || (a.ts-b.ts));
  $("#kdsList").innerHTML = sorted.length ? sorted.map(o=>{
    const m=Math.max(0,Math.round((Date.now()-o.ts)/60000)), s=ST[o.status];
    const payTag = `<span class="kds-pay paid">✓ Ödendi</span>`;
    return `<div class="kds-card ${o.status}">
      <div class="kds-h"><span class="kds-no">${o.no}</span><span class="kds-name">${o.name}</span>${payTag}</div>
      <div class="kds-sub"><span class="kds-min">${m} dk önce</span></div>
      <div class="kds-items">${o.items.map(i=>`<div>${i.q}× ${i.n}</div>`).join("")}</div>
      <div class="kds-foot"><span class="kds-pill ${o.status}">${s.l}</span>
        <button class="kds-btn" onclick="kdsAdvance('${o.no}')">${s.btn}</button></div>
    </div>`;
  }).join("") : `<div class="center-empty"><div class="e">✅</div><b>Sıra boş</b><span>Yeni sipariş bekleniyor</span></div>`;
}
function kdsAdvance(no){
  let q=kdsLoad(); const o=q.find(x=>x.no===no); if(!o) return;
  if(o.status==="new") o.status="prep";
  else if(o.status==="prep") o.status="ready";
  else q=q.filter(x=>x.no!==no);
  kdsSave(q); renderKDS();
}

/* ---------- Geçmiş Siparişler (üyelere özel) ---------- */
function renderHistory(){
  const body=$("#historyBody");
  if(!state.member){
    body.innerHTML=`<div class="gate">
      <div class="gate-ic">🔒</div>
      <h3>Üyelere özel</h3>
      <p>Geçmiş siparişlerini görmek, tek tuşla tekrar sipariş vermek ve puanlarını takip etmek için Pablo Club üyesi ol — saniyeler sürer.</p>
      <button class="btn amber" onclick="joinClub()">Üye Ol / Giriş Yap</button>
    </div>`;
    return;
  }
  histSeed(); const h=histLoad();
  if(!h.length){ body.innerHTML=`<div class="center-empty"><div class="e">🧾</div><b>Henüz sipariş yok</b><span>İlk siparişin burada listelenecek</span></div>`; return; }
  body.innerHTML = h.map((o,idx)=>`
    <div class="hist-card">
      <div class="hist-h"><span class="hist-no">${o.no}</span><span class="hist-date">${o.date}</span></div>
      <div class="hist-items">${o.lines.map(l=>`${l.qty}× ${l.name}`).join(" · ")}</div>
      <div class="hist-foot"><span class="hist-tot">${TL(o.total)}</span>
        <button class="hist-re" onclick="reorderHist(${idx})">↻ Tekrar Sipariş</button></div>
    </div>`).join("");
}
function joinClub(){
  state.member=true; localStorage.setItem("pablo_member","1");
  renderHistory();
  showToast("Pablo Club'a hoş geldin! ☕","Artık geçmiş siparişlerin ve puanların burada.");
}
function reorderHist(idx){
  const o=histLoad()[idx]; if(!o) return;
  o.lines.forEach(l=>state.cart.push({uid:Date.now()+Math.random(), id:l.id, name:l.name, emo:l.emo, qty:l.qty, opt:l.opt, unit:l.unit}));
  refreshCartBar(); go("s-cart");
}

/* ---------- Otomatik Tanıtım Demosu (anlatımlı, yavaş akan) ---------- */
let demoTimer=null, demoStop=true;
function demoSleep(ms){ return new Promise(r=>{ demoTimer=setTimeout(r,ms); }); }
function setCap(step,text,i,total){
  $("#demoStep").textContent=step; $("#demoCap").textContent=text;
  $("#demoDots").innerHTML=Array.from({length:total},(_,k)=>`<span class="demo-dot ${k<=i?'on':''}"></span>`).join("");
}
async function startDemo(){
  stopDemo(); demoStop=false;
  state.member=true; localStorage.setItem("pablo_member","1");
  state.name="Serdar"; state.cart=[]; state.pickupMin=0; state.pay="wallet"; wallet=750; saveWallet();
  const b=$("#demoBtn"); b.textContent="Kapat"; b.className=""; b.onclick=stopDemo;
  $("#demoBar").classList.add("show");
  const steps=[
    {fn:()=>go("s-splash"), s:"1 · Başlangıç", c:"Müşteri QR'ı okutur. Şube tanınır + tezgah yoğunluğu CANLI görünür (sakin/yoğun) — kasaya gitmek yok."},
    {fn:()=>{ aiReset(); aiOpen(); }, s:"2 · AI ile Sipariş", c:"İstersen menü bile gezme — uygulama içi AI'a yaz (çekirdek pakette). Aynı motor WhatsApp'ta da çalışır — WhatsApp kanalı istenirse eklenen EK MODÜL."},
    {fn:()=>{ const t=$("#aiText"); if(t){ t.value="2 latte biri yulaf sütlü, 1 cheesecake"; aiSend(); } }, s:"3 · AI Anladı ✨", c:"AI doğal dili çözdü; ürünleri (yulaf sütlü dahil) saniyede sepete ekledi. Tıklama derdi yok.", w:7800},
    {fn:()=>{ state.cart=[]; go("s-menu"); }, s:"4 · Menü", c:"Klasik menü de var: üstte '✨ AI'a yaz' girişi, arama, kategoriler ve 'En Sevilenler'. Sırada beklemeden seç."},
    {fn:()=>openSheet("karamelmac"), s:"5 · Özelleştirme", c:"Süt tercihi, ekstra shot... her kahve kişiye göre. Tezgahta 'nasıl olsun' muhabbeti yok."},
    {fn:()=>{ closeSheet(); quickAdd("karamelmac"); quickAdd("lotusmono"); }, s:"6 · Hızlı Ekleme", c:"Seçim saniyede sepete. 'Her Zamanki' ile düzenli müşteri tek tuşla sipariş verir."},
    {fn:()=>go("s-cart"), s:"7 · Sepet", c:"Ürünler, tutar ve kazanılacak sadakat puanı bir arada görünür."},
    {fn:()=>go("s-pay"), s:"8 · Ödeme", c:"Ödeme tamamen uygulamada: cüzdan, kayıtlı kart, Apple/Google Pay. Kasa YOK → sıra YOK."},
    {fn:()=>{ state.pay="wallet"; renderPay(); }, s:"9 · Cüzdanı Çalıştırıyoruz", c:"Pablo Go cüzdanı zaten var — ama kasada ödemek için bekliyor. Biz onu sipariş+sıra-atlamaya bağlıyoruz: müşteri masasından cüzdanla tek dokunuşta öder. Mevcut bakiyeniz nihayet iş yapar."},
    {fn:()=>pay(), s:"10 · Sipariş (+ Barista Cam opsiyonel)", c:"Ödeme alınınca sipariş anında mutfağa düşer; müşteri 'hazırlanıyor → hazır' akışını izler. Barista Cam ile canlı da izleyebilir — bu EK MODÜL, istenirse eklenir.", w:10000},
    {fn:()=>go("s-kds"), s:"11 · Barista Ekranı", c:"Sipariş barista ekranında belirir (✓Ödendi), hazırlanır, 'Hazır Rafı'na isimle konur. Barista para almaz, üretir."},
    {fn:()=>go("s-loy"), s:"12 · Sadakat + Cüzdan", c:"Mevcut Pablo Coffee Go damgaları korunur, üstüne cüzdan + seviye gelir. Yükle, bonus kahve kazan."},
    {fn:()=>go("s-loy"), s:"13 · Askıda Kahve", c:"Dijital askıda kahve: müşteri bir yabancıya kahve ısmarlar, sayaç canlı işler. Duygusal bağ + ücretsiz PR — Pablo köprü olur."},
    {fn:()=>go("s-biz"), s:"14 · Pablo Ne Kazanır", c:"Sahip ekranı: daha az personel, yoğun saatte daha çok müşteri, ön ödemeli cüzdanla ekstra gelir, kolay ödemeyle sadakat — peşin nakit ve sıfır kasa kuyruğu. İşte ROI."},
    {fn:()=>go("s-splash"), s:"✓ Özet", c:"Çekirdek paket: kasayı kaldıran, sırayı bitiren, peşin nakit getiren, AI ile kolaylaşan sistem — mevcut app'inizin ÜSTÜNE. İstenirse eklenir: WhatsApp sipariş & Barista Cam. Final ürün Web, Android ve iOS için geliştirilecek. BBAI."},
  ];
  for(let i=0;i<steps.length;i++){
    if(demoStop) return;
    steps[i].fn && steps[i].fn();
    setCap(steps[i].s, steps[i].c, i, steps.length);
    await demoSleep(steps[i].w||6800);
  }
  if(demoStop) return;
  $("#demoStep").textContent="✓ Demo bitti";
  $("#demoCap").textContent="Tüm akışı gördün — baştan almak ister misin?";
  const rb=$("#demoBtn"); rb.textContent="▶ Tekrar"; rb.className="demo-replay"; rb.onclick=startDemo;
}
function stopDemo(){ demoStop=true; clearTimeout(demoTimer); $("#demoBar").classList.remove("show");
  const b=$("#demoBtn"); if(b){ b.textContent="Kapat"; b.className=""; b.onclick=stopDemo; } }

/* ---------- Derin link (QR doğrudan şube/menü açabilir + demo) ---------- */
function deepLink(){
  const q=new URLSearchParams(location.search);
  if(q.get("b") && BRANCHES.some(x=>x.id===q.get("b"))) state.branch=q.get("b");
  if(q.get("member")){ state.member=true; localStorage.setItem("pablo_member","1"); }
  if(q.get("pm")) state.pay=q.get("pm");
  if(q.get("seed")){ quickAdd("flatwhite"); quickAdd("icelatte"); quickAdd("lotusmono"); }
  const s=q.get("screen");
  if(s==="status"){
    currentOrder={no:"P-204",name:"Serdar",reward:false,scheduled:false,time:null,items:["Flat White"],emo:"☕"};
    go("s-status"); resetStatus();
    document.getElementById("st-prep").classList.add("done");
    const r=document.getElementById("st-ready"); r.classList.add("on");
    $("#ringP").style.strokeDashoffset=0; $("#ringEmoji").textContent="✅";
    renderCam("ready");
    $("#orderName").textContent="Serdar adına hazırlandı";
    $("#eta").textContent="Hazır rafından adınla al — sıraya girme yok";
    $("#statusPay").className="status-pay"; $("#statusPay").textContent="✓ Ödeme uygulamadan alındı — kasaya uğrama yok";
    $("#toastBody").textContent="P-204 numaralı siparişin hazır rafında, adınla alabilirsin.";
    showToast("Serdar, siparişin hazır! 🔔","P-204 numaralı siparişin hazır rafında, adınla alabilirsin.");
  } else if(s==="sched"){
    state.cart=[{uid:1,id:"flatwhite",name:"Flat White",emo:"☕",qty:1,opt:"Tam Yağlı",unit:280}];
    state.name="Serdar"; state.pickupMin=30; go("s-pay");
  } else if(s==="schedstatus"){
    currentOrder={no:"P-204",name:"Serdar",reward:false,scheduled:true,time:pickupLabel(30)};
    go("s-status"); resetStatus(); $("#statusAction").innerHTML="";
    $("#orderName").textContent="Serdar adına"; scheduledStatus();
  } else if(s==="live"){
    // Barista Cam canlı "hazırlanıyor" anı (prep → ready animasyonu)
    currentOrder={no:"P-204",name:"Serdar",reward:false,scheduled:false,time:null,items:["Karamel Macchiato"],emo:"🍮"};
    go("s-status"); resetStatus(); $("#statusAction").innerHTML="";
    $("#orderNo").textContent="P-204"; $("#orderName").textContent="Serdar adına hazırlanıyor";
    $("#statusPay").className="status-pay"; $("#statusPay").textContent="✓ Ödeme uygulamadan alındı — kasaya uğrama yok";
    $("#toastBody").textContent="P-204 numaralı siparişin hazır rafında, adınla alabilirsin.";
    runStatus(false);
  } else if(s){ go("s-"+s); }
  if(q.get("q") && document.getElementById("searchInput")){
    const si=$("#searchInput"); si.value=q.get("q"); onSearch(q.get("q"));
  }
  if(q.get("demo")) startDemo();
}

/* ---------- Başlat ---------- */
drawQR();
deepLink();
renderSplash();
// Canlı yoğunluk: splash açıkken periyodik tazele (canlı his)
setInterval(()=>{ const sp=document.getElementById("s-splash"); if(sp && sp.classList.contains("active")){ renderSplashBusy(); renderSplashAsk(); } }, 5000);
// Bildirim iznini sessizce dene (bonus; reddedilirse toast'a düşer)
window.addEventListener("load",()=>{ try{ if("Notification" in window && Notification.permission==="default"){ /* kullanıcı etkileşiminde isteyeceğiz */ } }catch(e){} });
// Service worker (kurulabilirlik bonusu)
if("serviceWorker" in navigator){ navigator.serviceWorker.register("sw.js").catch(()=>{}); }
