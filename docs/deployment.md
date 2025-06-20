# 📦 Deployment Guide: AI Avatar Platform

## ✅ Prasyarat
- Node.js 18+
- PostgreSQL (optional)
- Stripe API Key
- OpenAI, ElevenLabs, D-ID API Keys

## 🔧 Struktur Projek
- `client/` → Next.js frontend (deploy via Vercel)
- `server/` → Node.js backend (deploy via Railway / Render)
- `mobile/` → React Native (Expo)
- `docs/` → Dokumentasi

## 🚀 Frontend Deployment (Vercel)
1. Push `client/` ke GitHub
2. Hubungkan ke Vercel
3. Tambah environment variable:
   - `NEXT_PUBLIC_API_URL=https://your-backend.com`

## ⚙️ Backend Deployment (Railway)
1. Deploy `server/` dengan Railway
2. Tambah environment:
   ```
   OPENAI_API_KEY=
   ELEVEN_API_KEY=
   STRIPE_SECRET_KEY=
   JWT_SECRET=
   ```

## 💳 Stripe Setup
- Create 3 plans: Free, Pro, Enterprise
- Tambah `PRICE_ID_*` ke .env

## 📡 Webhook
- Pastikan webhook Stripe ditetapkan ke:
  ```
  POST /api/webhook
  ```

## ✅ Done!
