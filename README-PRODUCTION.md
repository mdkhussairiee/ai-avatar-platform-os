
# 🏁 AI Avatar Platform - Versi Production Akhir

Sistem lengkap siap deploy ke server GPU lokal atau awan (VPS, RunPod, dsb).

## ✅ Ciri-Ciri Production
- Docker Compose centralized: `docker-compose.prod.yml`
- Frontend + Backend (mode production)
- Wav2Lip, TTS, Ollama (LLM)
- Redis, Celery, FastAPI Monitor
- PostgreSQL + Prisma + Analytics
- SSL/Nginx (optional)
- Rakaman video avatar
- Dashboard GPU + ekspresi + gesture

---

## ⚙️ 1. Prasyarat
- GPU server (NVIDIA + CUDA)
- Docker + Docker Compose
- NVIDIA Container Toolkit

---

## 🔧 2. Setup & Run

### 1. Sediakan `.env.production`:
```
DATABASE_URL=postgresql://postgres:postgres@db:5432/postgres
JWT_SECRET=your_secret
OPENAI_API_KEY=
NEXTAUTH_SECRET=production_auth
```

### 2. Jalankan:
```bash
docker compose -f docker-compose.prod.yml up --build
```

---

## 🌐 Akses:
- http://localhost — UI utama (Next.js)
- http://localhost/admin/gpu — GPU dashboard
- http://localhost/admin/recordings — Video avatar
- http://localhost:8000 — FastAPI monitor
- http://localhost:11434 — Ollama

---

## 🔐 Pengurusan Pengguna:
- Login sebagai admin / demo
- Organisasi, pengguna & interaksi disimpan dalam DB

---

Untuk pasang SSL/Nginx (Let's Encrypt), tambah `proxy/nginx.conf` dan run `nginx-proxy` container.

