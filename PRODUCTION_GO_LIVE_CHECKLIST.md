# Production Go-Live Checklist

Bu kontrol listesi, `boraecevit.com` (vitrin) ve `members.boraecevit.com` (VIP panel) yayinina cikmadan once son kontroller icindir.

## 1) Pre-Flight

- [ ] Vercel production deployment `Ready` durumda.
- [ ] Ana site (`boraecevit.com`) aciliyor.
- [ ] VIP panel (`members.boraecevit.com`) aciliyor.
- [ ] Supabase URL Configuration dogru:
  - [ ] Site URL: `https://members.boraecevit.com`
  - [ ] Redirect URLs: `https://members.boraecevit.com/*`

## 2) Secrets ve Ortam Degiskenleri

- [ ] Vercel env degiskenleri dogru isimlerle tanimli:
  - [ ] `NEXT_PUBLIC_SUPABASE_URL`
  - [ ] `NEXT_PUBLIC_SUPABASE_ANON_KEY`
- [ ] Gereksiz veya hatali isimde env kaydi yok.
- [ ] Supabase `service_role` key frontend tarafinda kesinlikle kullanilmiyor.
- [ ] `.env` benzeri dosyalarda hassas veri varsa rotate plani hazir.

## 3) Backup

- [ ] Supabase proje ayarlari ve tablo semasi yedekli.
- [ ] Kritik tablolarin exportu alindi (`vip_members` vb.).
- [ ] Son calisir commit SHA not edildi.
- [ ] Geri donus icin son stabil Vercel deployment secili.

## 4) Guvenlik

- [ ] Kapali devre model aktif (disaridan open signup kapali).
- [ ] `vip_members.is_active = true` olmayan kullanici dashboard'a giremiyor.
- [ ] Yetkisiz kullanici `/dashboard` rotasina direkt ulasamiyor.
- [ ] Guvenlik header'lari aktif (X-Frame-Options vb.).

## 5) Fonksiyonel Test

- [ ] VIP login basarili, dashboard aciliyor.
- [ ] VIP olmayan hesap login olsa bile dashboard'a alinmiyor.
- [ ] Sidebar, status bar, saatler ve BIST durumu dogru calisiyor.
- [ ] Strateji Kutuphanesi PDF linkleri aciliyor.
- [ ] Cikis islemi oturumu dogru kapatiyor.

## 6) Izleme (Monitoring)

- [ ] Vercel Runtime Logs izleme paneli acik.
- [ ] Supabase Auth logs izlenebilir durumda.
- [ ] Hata durumunda sorumlu kisi/kanal belli (or. WhatsApp/Slack).

## 7) Rollback Plani

- [ ] Vercel'de onceki stabil deployment'a donus adimi test edildi.
- [ ] DNS degisikliginde geri alma adimi dokumante edildi.
- [ ] Acil durumda gecici bakim mesaji plani hazir.

## 8) Go / No-Go

- [ ] Tumu gecildi -> **GO**
- [ ] Kritik madde fail -> **NO-GO** (deploy ertelenir)

