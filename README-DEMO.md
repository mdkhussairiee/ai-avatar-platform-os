
# 🚀 AI Avatar Platform - Demo Versi Akhir (Customer-Ready)

Versi ini sesuai untuk:
- ✅ Demo pelanggan / rakan kongsi
- ✅ Pameran / laptop pemasaran
- ✅ Host secara lokal (localhost) di GPU server

## 📁 Kandungan:
- Frontend + Backend lengkap
- Wav2Lip, TTS, LLM, FastAPI Monitor
- Rakaman avatar .mp4 + ekspresi wajah
- Dashboard `/admin/gpu`, `/admin/recordings`
- Sokongan ekspresi: happy, sad, thinking, surprised
- Demo user: `demo@avatar.local`, password: `demo123`

---

## 🧪 Cara Jalankan

### 1. Pasang .env
Salin `.env.example` → `.env` dan isi:
```
DATABASE_URL=postgresql://postgres:postgres@db:5432/postgres
JWT_SECRET=supersecret
OPENAI_API_KEY=
```

### 2. Jalankan
```bash
docker compose -f docker-compose.final.yml up --build
```

Akses:
- 🌐 http://localhost
- 🛠 http://localhost:8000 (monitor API)
- 📼 http://localhost/admin/recordings
- 🎛 http://localhost/admin/gpu

---

## 🎬 Rakam Video Avatar ke MP4
```bash
./record_full_avatar.sh
```
Fail akan muncul di `recordings/avatar_full_recording_*.mp4`

---

## 🛡 Auto-login Demo
Log masuk sebagai pengguna demo automatik:
- Email: `demo@avatar.local`
- Kata laluan: `demo123`

---

Sedia digunakan untuk demo pelanggan atau pemasaran produk.
