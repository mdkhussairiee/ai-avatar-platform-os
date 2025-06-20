# Asrix AI Avatar Platform – Final Deploy (Local GPU + Docker)

## 🧩 Sistem Termasuk:
- ✅ Next.js Frontend (UI interaktif)
- ✅ Node.js Backend (auth, stripe, avatar)
- ✅ Stripe billing + Mailgun email
- ✅ Avatar streaming + recording (Wav2Lip)
- ✅ WebRTC/live mic + TTS modular
- ✅ Logging interaksi + multi-user organisasi
- ✅ Guest login + SaaS pricing + landing

## 🚀 Cara Jalan (Local GPU)
1. Salin `.env.example` ke `.env` dan isi:
   - `STRIPE_SECRET_KEY=...`
   - `MAILGUN_API_KEY=...`
   - `DOMAIN=http://localhost`
2. Jalankan Docker Compose:
```bash
docker compose up --build
```

## 🌐 Akses
- http://localhost (Landing page)
- http://localhost/demo (Avatar Demo)
- http://localhost/account (Profil)
- Admin/Analytics: `/admin` (jika tersedia)

## 📦 Struktur:
- `frontend/` — UI Next.js
- `backend/` — API, auth, stripe, avatar engine
- `nginx/` — SSL config
- `docker-compose.yml` — Run kesemua servis
- `legal/` — Terms & Privacy

## 🔐 SSL Production (Pilihan)
- Sediakan domain → edit `nginx/nginx.conf`
- Tambah Let's Encrypt script jika mahu SSL production

## 📧 Hubungi
support@asrix-studio.com