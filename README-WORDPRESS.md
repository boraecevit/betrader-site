# BoraEcevit WordPress Membership Setup

Bu repodaki statik siteye ek olarak WordPress tabanli, davet odakli kapali erisim platformu kuruldu.

## Hangi dosyalar eklendi?

- `docker-compose.yml` - local staging WordPress + MySQL
- `.env.example` - ortama gore duzenlenecek veritabani degiskenleri
- `wordpress/wp-content/plugins/boraecevit-membership-platform/boraecevit-membership-platform.php` - kapali erisim ve icerik platform eklentisi
- `wordpress/README.md` - hizli kurulum
- `wordpress/GO_LIVE_CHECKLIST.md` - canliya alma adimlari

## Hizli baslangic

1. `.env.example` -> `.env`
2. Sifreleri duzenle
3. Komutu calistir:

```bash
docker compose up -d
```

4. `http://localhost:8080` uzerinden WordPress kurulumunu bitir.
5. Plugins ekranindan `BoraEcevit Membership Platform` eklentisini aktif et.

## Otomatik gelen sayfalar

- `/uye-giris`
- `/uye-dashboard`
- `/analiz-kutuphanesi`
- `/tradingview-kutuphanesi`

Not: Disaridan hesap olusturma rotasi yoktur. Hesaplar yalnizca yonetici tarafindan acilir ve kullanicilara ozel iletilir.

## Otomatik gelen icerik tipleri

- `Analiz Sunumlari` (`analysis_presentation`)
- `TradingView Stratejileri` (`tradingview_strategy`)

Her icerikte:
- PDF URL
- Video URL
- TradingView embed kodu
- Erisim seviyesi (`public` veya `member`)

alanlari bulunur.
