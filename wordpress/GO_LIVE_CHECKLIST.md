# WordPress Go-Live Checklist

Bu dosya staging ortamindan canliya gecis icin uygulanacak adimlari icerir.

## 1) Staging testleri

- [ ] `http://localhost:8080` aciliyor
- [ ] `BoraEcevit Membership Platform` eklentisi aktif
- [ ] Uye giris formu calisiyor (`/uye-giris`)
- [ ] Uye dashboard calisiyor (`/uye-dashboard`)
- [ ] Analiz kutuphanesi sadece girisli kullaniciya acik
- [ ] TradingView kutuphanesi sadece girisli kullaniciya acik
- [ ] Disaridan hesap olusturma endpoint/rota erisime kapali
- [ ] `analysis_presentation` icerik tipine PDF/video/embed eklenebiliyor
- [ ] `tradingview_strategy` icerik tipine PDF/video/embed eklenebiliyor

## 2) Production altyapi hazirligi

- [ ] Hosting uzerinde WordPress kurulumu tamamlandi
- [ ] SSL sertifikasi aktif
- [ ] Otomatik yedekleme aktif (UpdraftPlus)
- [ ] Guvenlik eklentisi aktif (Wordfence)
- [ ] SEO eklentisi aktif (Rank Math)

## 3) Domain gecisi

Secenek A (tam gecis):
- [ ] `boraecevit.com` DNS kayitlari WordPress hostuna yonlendirildi
- [ ] `www.boraecevit.com` canonical yonlendirmesi ayarlandi

Secenek B (kademeli gecis):
- [ ] `members.boraecevit.com` WordPress platformuna yonlendirildi
- [ ] Ana statik site mevcut haliyle korunuyor
- [ ] Ana siteden uye platformuna belirgin CTA linkleri eklendi

## 4) Canli kontrol

- [ ] Yetkili kullanici giris + cikis senaryolari test edildi
- [ ] Yetkisiz kullanici icin hesap olusturma akisi disaridan kapali
- [ ] Uye olmayan kullanici member-only iceriklere giremiyor
- [ ] E-posta bildirimleri calisiyor
- [ ] Mobil gorunum kontrol edildi
- [ ] Sayfa hizi temel kontrolu yapildi

## 5) Geri donus plani

- [ ] DNS eski hedefe donus adimlari hazir
- [ ] Son yedek geri yukleme adimlari dokumante
