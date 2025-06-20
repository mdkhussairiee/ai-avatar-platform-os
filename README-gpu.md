
# 🚀 GPU Deployment for AI Avatar Platform

## ✅ Requirements
- Ubuntu 20.04/22.04 with GPU
- NVIDIA Driver + CUDA (driver >= 470)
- Docker & NVIDIA Docker Toolkit

## 🔧 Install NVIDIA Docker:
```bash
distribution=$(. /etc/os-release;echo $ID$VERSION_ID)
curl -s -L https://nvidia.github.io/nvidia-docker/gpgkey | sudo apt-key add -
curl -s -L https://nvidia.github.io/nvidia-docker/$distribution/nvidia-docker.list | sudo tee /etc/apt/sources.list.d/nvidia-docker.list
sudo apt update && sudo apt install -y nvidia-docker2
sudo systemctl restart docker
```

## 📦 Run Wav2Lip + TTS with GPU:
```bash
docker compose -f docker-compose.gpu.yml up
```

## 🌐 Ports
- Wav2Lip Stream: http://localhost:5000/stream
- Coqui TTS: http://localhost:5002/speak

## 📁 Custom Image Build
Use these as base Dockerfiles for `wav2lip-gpu` and `coqui-tts-gpu`:
- Clone each repo
- Add Flask/stream wrapper
- Build: `docker build -t yourname/wav2lip-gpu .`
