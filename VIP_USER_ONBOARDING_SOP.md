# VIP User Onboarding SOP

Bu SOP, yeni VIP kullaniciyi kapali devre sisteme standart ve hatasiz sekilde dahil etmek icindir.

## 1) Hazirlik

- Kullanici bilgileri alin:
  - E-posta
  - Ad Soyad
  - Telefon (opsiyonel)
- Erişim seviyesi: `VIP`

## 2) Supabase Auth Kullanici Acma

1. Supabase -> Authentication -> Users -> Add user
2. E-posta ve gecici sifre gir.
3. Gerekliyse email confirmed durumunu aktif et.

Kontrol:
- Kullanici `Authentication > Users` listesinde gorunmeli.

## 3) VIP Yetki Kaydi

SQL Editor'de calistir:

```sql
insert into public.vip_members (email, full_name, is_active)
values ('user@example.com', 'Ad Soyad', true)
on conflict (email) do update
set
  full_name = excluded.full_name,
  is_active = excluded.is_active;
```

Kontrol:
- `email` dogru
- `is_active = true`

## 4) Ilk Giris Testi

1. `https://members.boraecevit.com` ac.
2. Yeni kullanici ile giris yap.
3. Beklenen:
   - Dashboard acilir
   - Sidebar'da operator adi gorunur
   - Yetkili sayfalara erisim vardir

## 5) Kullaniciya Bilgilendirme

Kullaniciya ilet:
- Giris URL'i: `https://members.boraecevit.com`
- E-posta
- Gecici sifre
- Ilk giriste sifre degistirme tavsiyesi

## 6) Olası Sorunlar ve Cozum

- "Giris bilgileri gecersiz":
  - Auth kullanicisi/sifre kontrol et
- "Hesabiniz sisteme tanimli degil":
  - `vip_members` kaydi veya `is_active` kontrol et
- Dashboard acilmiyor:
  - Vercel env ve Supabase URL config kontrol et

## 7) Offboarding (Erisim Kapatma)

Gecici veya kalici erisim iptali icin:

```sql
update public.vip_members
set is_active = false
where email = 'user@example.com';
```

Gerekirse Auth kullanicisini da pasife al/sil.

