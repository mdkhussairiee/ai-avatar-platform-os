
FROM python:3.8-slim

# Install dependencies
RUN apt-get update && apt-get install -y     ffmpeg     libsm6     libxext6     git     && rm -rf /var/lib/apt/lists/*

# Create app directory
WORKDIR /app

# Clone Wav2Lip
RUN git clone https://github.com/Rudrabha/Wav2Lip.git /app
WORKDIR /app

# Download pre-trained model
RUN mkdir -p checkpoints &&     curl -L -o checkpoints/wav2lip_gan.pth "https://storage.googleapis.com/ailab-public/wav2lip/wav2lip_gan.pth"

# Install Python dependencies
RUN pip install --upgrade pip
RUN pip install numpy scipy opencv-python-headless torch torchvision tqdm matplotlib

# Add inference script
COPY infer_api.py /app/infer_api.py

ENTRYPOINT ["python3", "infer_api.py"]
