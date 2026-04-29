# WordPress Staging Kurulumu

Bu klasor, BoraEcevit uyelik platformunun WordPress staging yapisini icerir.

## 1) Ilk kurulum

1. Proje kokunde `.env.example` dosyasini `.env` olarak kopyala.
2. Sifreleri guncelle.
3. Asagidaki komutu calistir:

```bash
docker compose up -d
```

4. Tarayicida `http://localhost:8080` ac ve WordPress ilk kurulum adimlarini tamamla.

## 2) Onerilen temel eklentiler

- Rank Math SEO
- Wordfence Security
- UpdraftPlus Backup

## 3) Ozel platform eklentisi

Bu repoda `wp-content/plugins/boraecevit-membership-platform` eklentisi bulunur.
WordPress panelinde **Plugins** ekranindan aktif ederek:

- Ucretsiz uyelik akisi (kayit + giris + profil rolu)
- Ozel icerik tipleri
- Uye dashboard / kutuphane sayfalari

otomatik devreye alinir.
