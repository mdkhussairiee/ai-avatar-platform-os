
# 🤖 AI Avatar Platform - Sistem Lengkap (All-in-One, Docker, GPU Ready)

Sesuai untuk deploy di server lokal GPU, dengan hanya 1 arahan Docker.

---

## 🧩 Kandungan

- Frontend: Next.js (production)
- Backend: Node.js + Express + Prisma
- FastAPI Task Monitor + Redis + Celery
- Wav2Lip (real-time talking avatar)
- Ollama (LLM models: llama3, mistral, gemma)
- TTS (Coqui atau ElevenLabs)
- PostgreSQL database
- Rakaman `.mp4` video + ekspresi
- Ekspresi wajah + animasi gesture
- Dashboard admin + log interaksi
- Demo user + paparan `/demo`

---

## ⚙️ Prasyarat

- Docker + Docker Compose
- NVIDIA Container Toolkit (untuk Wav2Lip dan LLM GPU)

Pasang:
```bash
sudo apt update
sudo apt install docker.io docker-compose nvidia-container-toolkit -y
sudo systemctl restart docker
```

---

## 🚀 Cara Jalankan

1. Salin tetapan:
```bash
cp .env.example .env
```

2. Jalankan semua servis:
```bash
docker compose up --build
```

---

## 🌐 Akses Sistem

- http://localhost — UI utama
- http://localhost/admin/gpu — panel GPU & log
- http://localhost/admin/recordings — rakaman video
- http://localhost/demo — paparan tetamu/demo

---

## 🎬 Rakaman Avatar ke MP4
```bash
./record_full_avatar.sh
```

Fail akan disimpan dalam folder `recordings/`

---

## 👤 Akaun Demo
- Email: `demo@asrix.local`
- Password: `demo123`

---

## 📁 Struktur Utama

- `/client/` – Frontend Next.js
- `/server/` – Backend Express
- `/fastapi/` – Monitor & pengurusan task
- `/ollama/`, `/tts/`, `/wav2lip/` – servis AI modular
- `/recordings/` – rakaman video
- `docker-compose.yml` – fail utama untuk run semua
