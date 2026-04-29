# Terminal Panel (Next.js + Supabase Auth)

Bu proje, kayit olma butonu olmayan kapali erisimli bir "Finansal Terminal" iskeletidir.

## Kurulum

1. `.env.example` dosyasini `.env.local` olarak kopyalayin.
2. Supabase URL ve Anon Key degiskenlerini doldurun.
3. Bagimliliklari yukleyin ve gelistirme sunucusunu calistirin:

```bash
npm install
npm run dev
```

## Sayfalar

- `/` - Sadece e-posta/sifre ile Uye Girisi
- `/dashboard` - Genel Bakis
- `/dashboard/algo` - BETrader ALGO & V6 kod arsivi
- `/dashboard/library` - Strateji kutuphanesi
- `/dashboard/discipline` - Psikolojik yonetim ve kasa disiplini materyalleri

## Guvenlik

- `middleware.ts` ile `/dashboard/*` rotalari korunur.
- Oturum kontrolu Supabase Auth ile yapilir.
- Kayit olma (sign up) akisi iskelette bulunmaz.
