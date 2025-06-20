
# 🧠 AI Avatar Platform - Final Local GPU Deployment (Full System)

## ✅ Prasyarat
- GPU NVIDIA dengan CUDA (semak dengan `nvidia-smi`)
- Docker + Docker Compose
- NVIDIA Container Toolkit

## 📁 Kandungan Penting
- `docker-compose.gpu.yml` - Semua servis:
  - Wav2Lip (avatar lipsync)
  - TTS (sintesis suara)
  - LLM (Ollama)
  - Redis + Celery (task management)
  - FastAPI Monitor (task panel)
  - Next.js frontend
  - Express backend + Prisma
  - PostgreSQL

## 🔧 Langkah Setup

### 1. Sediakan .env di root projek:
```
OPENAI_API_KEY=your_key_or_empty
JWT_SECRET=supersecret
DATABASE_URL=postgresql://postgres:postgres@db:5432/postgres
```

### 2. Jalankan Semua Servis:
```bash
docker compose -f docker-compose.gpu.yml up --build
```

### 3. Semak Status:
- 🌐 http://localhost — UI utama
- 🔧 http://localhost:8000 — FastAPI monitor
- 🧠 http://localhost:11434 — Ollama LLM
- 🧪 Check `nvidia-smi` dalam container:
```bash
docker exec -it wav2lip nvidia-smi
```

### 4. Autostart Selepas Boot (Optional):
Gunakan `systemd`:
```bash
sudo nano /etc/systemd/system/avatar-platform.service
```
```
[Unit]
Description=AI Avatar Platform
After=docker.service
Requires=docker.service

[Service]
WorkingDirectory=/home/youruser/ai-avatar-platform
ExecStart=/usr/bin/docker compose -f docker-compose.gpu.yml up --build
ExecStop=/usr/bin/docker compose -f docker-compose.gpu.yml down
Restart=always
TimeoutStartSec=0

[Install]
WantedBy=multi-user.target
```

### 5. Cron Alert GPU:
```bash
chmod +x check_gpu_alert.sh
crontab -e
# Tambah baris:
* * * * * /path/to/project/check_gpu_alert.sh
```

---

Sistem kini sedia digunakan sepenuhnya secara lokal dengan GPU!
