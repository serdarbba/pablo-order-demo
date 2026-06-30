# Pablo · Sırada Bekleme — Satış Demosu

White-label kahve sipariş & sadakat platformu (çekirdek: **BBAI**), Pablo Artisan Coffee teması ile.
**POS-bağımsız satış demosu** — Mert'e/karar vericilere göstermek için. Gerçek ödeme/POS yok; akış tam çalışır.

## Akış
QR (her masanın QR'ı kendi şube+masasına bağlı) → menü (kahve + tatlı) → ürün özelleştir → sepet →
ödeme (Apple/Google Pay/kart) → sipariş durumu (hazırlanıyor → hazır) → **"sipariş hazır" bildirimi** →
Pablo Club sadakat (damga + puan). *Şube seçtirme yok — QR zaten şubeyi belirler.*

## Çalıştırma
```bash
cd /home/bba1/bba-order
python3 -m http.server 8745
# tarayıcıda: http://localhost:8745/index.html
```
Telefonda denemek için aynı ağdan `http://<bilgisayar-ip>:8745/index.html`. "Ana ekrana ekle" ile PWA olarak kurulabilir (bonus).

## Demo derin-linkleri (sunum kolaylığı)
- `?b=bostanli&t=7` — splash: Bostanlı şubesi, Masa 7 QR'ı (gerçekte QR bunu kodlar)
- `?b=alsancak&screen=menu` — doğrudan menü
- `?seed=1&screen=cart` — dolu sepet
- `?seed=1&screen=pay` — ödeme ekranı
- `?screen=status` — "sipariş hazır" + bildirim
- `?screen=loy` — sadakat kartı

## White-label notu
Marka/menü `app.js` içinde `BRAND`, `BRANCHES`, `MENU`, `OPTIONS` ile konfig. İkinci müşteri = sadece bu config + tema değişimi (çekirdek çatallanmaz). Ödeme = iyzico/PayTR; POS = adaptör katmanı (gerçek entegrasyon Kapı A sonrası).

## Dosyalar
- `index.html` — ekranlar + tasarım sistemi
- `app.js` — tüm akış mantığı + mock veri
- `manifest.json`, `sw.js`, `icons/` — PWA (kurulabilirlik)
