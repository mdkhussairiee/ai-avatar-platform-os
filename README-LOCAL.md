
# 🧠 AI Avatar Platform - Local GPU All-in-One Deployment

Sesuai untuk: Laptop/Server GPU dengan Docker & NVIDIA

## ✅ Ciri Sistem:
- 📦 Satu `docker-compose.gpu.yml` jalankan semua
- 🎥 Wav2Lip (avatar lipsync dengan ekspresi)
- 🗣 TTS (Coqui / ElevenLabs-ready)
- 🧠 LLM (Ollama: llama3, mistral, gemma)
- ⚡ FastAPI Task Manager + Redis + Celery
- 📊 Dashboard admin + interaksi log + GPU monitor
- 🎬 Rakam video `.mp4`, ekspresi, gesture
- 👤 Login demo / organisasi sebenar

---

## ⚙️ Prasyarat
- OS: Ubuntu 20.04+ / WSL2
- GPU: NVIDIA + driver + CUDA
- Docker + Docker Compose
- NVIDIA Container Toolkit:
```bash
sudo apt install nvidia-container-toolkit
sudo systemctl restart docker
```

---

## 🔧 Setup

### 1. Salin `.env`
```bash
cp .env.example .env
```

Isi:
```
DATABASE_URL=postgresql://postgres:postgres@db:5432/postgres
JWT_SECRET=supersecret
OPENAI_API_KEY=
```

### 2. Jalankan sistem
```bash
docker compose -f docker-compose.gpu.yml up --build
```

---

## 🌐 Akses:
- UI: http://localhost
- FastAPI Monitor: http://localhost:8000
- LLM API (Ollama): http://localhost:11434
- Dashboard: `/admin/gpu`, `/admin/recordings`, `/demo`

---

## 📼 Rakam Video Avatar:
```bash
./record_full_avatar.sh
```
Simpan ke folder `recordings/`

---

## 📁 Struktur Projek:

- `/client/` – UI (Next.js)
- `/server/` – Backend Express API
- `/fastapi/` – Monitor + overload log
- `/tts/`, `/wav2lip/`, `/ollama/` – model dockerized
- `/recordings/` – rakaman video
- `docker-compose.gpu.yml` – fail utama servis

---

Untuk penyesuaian lanjut (e.g. deploy cloud, SSL, domain), anda boleh extend dari struktur ini.
