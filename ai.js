/* ai.js — BBAI Doğal Dil Sipariş Asistanı (işi kolaylaştıran AI)
   app.js global'lerini kullanır: MENU, findItem, itemOpts, OPTIONS, state, cartTotal, refreshCartBar, go, TL, $.
   Aynı motor WhatsApp tarafında da kullanılacak (metin → sipariş). */

const NUM = { bir:1, iki:2, "üç":3, uc:3, "dört":4, dort:4, "beş":5, bes:5, alti:6, "altı":6 };

// Anahtar kelime → ürün (spesifik olanlar önce). not: bu kelimeler varsa eşleşme iptal.
const AI_KEYS = [
  { id:"icelatte",   k:["iced latte","ice latte","buzlu latte","soğuk latte","soguk latte"] },
  { id:"iceamericano",k:["iced americano","buzlu americano","soğuk americano","soguk americano"] },
  { id:"icecaramel2",k:["iced caramel","iced karamel","buzlu karamel"] },
  { id:"icemocha",   k:["iced mocha","buzlu mocha","soğuk mocha"] },
  { id:"latte",      k:["latte"], not:["iced","ice ","buzlu","soğuk","soguk","pistachio","flat","white","karamel","caramel","macchiato","salted","chai"] },
  { id:"americano",  k:["americano","amerikano"], not:["iced","buzlu","soğuk","soguk"] },
  { id:"flatwhite",  k:["flat white","flatwhite","flat vayt"] },
  { id:"cappuccino", k:["cappuccino","capuccino","kapuçino","kapucino"] },
  { id:"cortado",    k:["cortado"], not:["iced","buzlu","soğuk"] },
  { id:"coldbrew",   k:["cold brew","coldbrew","kold bru"] },
  { id:"karamelmac", k:["karamel macchiato","caramel macchiato","macchiato"], not:["iced","buzlu","soğuk","salted"] },
  { id:"whitemocha", k:["white mocha","beyaz mocha"] },
  { id:"mocha",      k:["mocha","moka"], not:["white","beyaz","iced","buzlu","soğuk"] },
  { id:"pistachio",  k:["pistachio","fıstık latte","fistik latte","antep latte"], not:["iced","buzlu","soğuk"] },
  { id:"salepicano", k:["salepicano"] },
  { id:"salep",      k:["salep"], not:["salepicano"] },
  { id:"matcha",     k:["matcha"], not:["iced","buzlu","soğuk","cream"] },
  { id:"hotchoc",    k:["sıcak çikolata","hot chocolate","sicak cikolata"] },
  { id:"cay",        k:["çay","cay "], not:["latte","chai"] },
  { id:"lotusmono",  k:["cheesecake","cheescake","lotus mono","mono cheesecake","çizkek"] },
  { id:"monstercookie",k:["cookie","kurabiye","monster"] },
  { id:"karaorman",  k:["karaorman","kara orman"] },
];

function aiDetectMilk(t){
  if(t.includes("yulaf")) return "yulaf";
  if(t.includes("badem")) return "badem";
  if(t.includes("laktoz")) return "laktoz";
  if(t.includes("yağsız")||t.includes("yagsiz")) return "yagsiz";
  return null;
}
function aiParse(text){
  const t = " " + text.toLowerCase().replace(/[.,;]/g," ") + " ";
  const milk = aiDetectMilk(t);
  const res = [];
  AI_KEYS.forEach(e=>{
    const kw = e.k.find(k=>t.includes(k)); if(!kw) return;
    if(e.not && e.not.some(n=>t.includes(n))) return;
    let qty = 1;
    const head = kw.split(" ")[0];
    const m = t.match(new RegExp("(\\d+|bir|iki|üç|uc|dört|dort|beş|bes|altı|alti)\\s+\\S{0,14}?" + head));
    if(m) qty = parseInt(m[1]) || NUM[m[1]] || 1;
    res.push({ id:e.id, qty, milk });
  });
  const seen=new Set();
  return res.filter(r=> !seen.has(r.id) && seen.add(r.id));
}
function aiAddItem(id, qty, milk){
  const it = findItem(id); if(!it) return null;
  const opts = itemOpts(id);
  let unit = it.price; const labels=[]; let usedMilk=null;
  opts.forEach(o=>{
    let c = (o==="milk" && milk) ? OPTIONS.milk.choices.find(x=>x.k===milk) : null;
    if(!c) c = OPTIONS[o].choices.find(x=>x.def) || OPTIONS[o].choices[0];
    if(o==="milk") usedMilk=c.label;
    unit += c.d; labels.push(c.label);
  });
  state.cart.push({ uid:Date.now()+Math.random(), id, name:it.name, emo:it.emo, qty, opt:labels.join(" · "), unit });
  return { name:it.name, qty, unit, milk:usedMilk };
}

/* Saat bağlamlı öneri (öner/karar ver istekleri için) */
function aiSuggest(){
  const h = new Date(Date.now()).getHours();
  if(h<11) return { id:"flatwhite", why:"Güne başlamak için" };
  if(h<16) return { id:"icelatte",  why:"Öğleden sonra serinlik" };
  if(h<20) return { id:"karamelmac",why:"İkindi tatlısı isteğine" };
  return { id:"salepicano", why:"Akşam için sıcak ve yumuşak" };
}

/* ---------- Sohbet UI ---------- */
let aiLog = [];
function aiOpen(){ if(!aiLog.length) aiGreet(); aiRender(); go("s-ai"); setTimeout(()=>{const i=$("#aiText"); i&&i.focus();},250); }
function aiReset(){ aiLog=[]; aiGreet(); aiRender(); }
function aiGreet(){
  aiPush("ai", `Merhaba! Ne içmek istersin? <b>Yazman yeter</b> — örn: <i>"2 latte biri yulaf sütlü, 1 cheesecake"</i> ya da <i>"buz gibi bir şey öner"</i>.`);
}
function aiPush(who, html, cls){ aiLog.push({who, html, cls}); }
function aiRender(){
  $("#aiChat").innerHTML = aiLog.map(m=>`<div class="bub ${m.who} ${m.cls||''}">${m.html}</div>`).join("");
  $("#aiChips").innerHTML = ["2 latte 1 cheesecake","yulaf sütlü flat white","soğuk americano","buz gibi bir şey öner"]
    .map(s=>`<div class="ai-chip" onclick="aiQuick('${s}')">${s}</div>`).join("");
  const c=$("#aiChat"); c.scrollTop=c.scrollHeight;
}
function aiQuick(s){ $("#aiText").value=s; aiSend(); }
function aiMic(){
  aiPush("ai","🎤 Dinliyorum… (sesli sipariş)"); aiRender();
  setTimeout(()=>{ const i=$("#aiText"); if(i){ i.value="bir büyük latte yulaf sütlü, bir de cheesecake"; aiSend(); } }, 1000);
}
function aiSend(){
  const inp=$("#aiText"); const text=(inp.value||"").trim(); if(!text) return;
  aiPush("me", text); inp.value="";
  const t=text.toLowerCase();
  // öneri isteği
  if(/öner|oner|ne i[çc]sem|karar ver|bilmiyorum|sen se[çc]/.test(t)){
    const s=aiSuggest(); const r=aiAddItem(s.id,1,aiDetectMilk(t));
    aiPush("ai", `${s.why} <b>${r.name}</b> öneririm — sepetine ekledim. ✅`, "ai-added");
    aiPush("ai", aiCTA()); refreshCartBar(); aiRender(); return;
  }
  const parsed=aiParse(text);
  if(!parsed.length){
    aiPush("ai", `Tam anlayamadım 🤔 Şöyle deneyebilirsin: <i>"iki latte, bir cheesecake"</i> veya <i>"soğuk americano"</i>.`);
    aiRender(); return;
  }
  const added=parsed.map(p=>aiAddItem(p.id,p.qty,p.milk)).filter(Boolean);
  const lines=added.map(a=>`${a.qty}× ${a.name}${a.milk&&a.milk!=="Tam Yağlı"?` (${a.milk})`:""}`).join(", ");
  const tot=added.reduce((s,a)=>s+a.unit*a.qty,0);
  aiPush("ai", `Ekledim: <b>${lines}</b><span class="mini">Ara toplam ${TL(tot)}</span>`, "ai-added");
  aiPush("ai", aiCTA());
  refreshCartBar(); aiRender();
}
function aiCTA(){
  return `Başka bir şey? Yoksa <b onclick="go('s-cart')" style="text-decoration:underline;cursor:pointer">sepete gidip ödeyelim</b> → kasaya uğramadan.`;
}

/* ?screen=ai derin linki: sohbeti başlat (app.js go('s-ai') ekranı açar, biz dolduruyoruz) */
(function(){
  try{
    const q=new URLSearchParams(location.search);
    if(q.get("screen")==="ai"){ aiGreet(); aiRender(); }
  }catch(e){}
})();
