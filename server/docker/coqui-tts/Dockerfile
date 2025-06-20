
FROM python:3.9-slim

# Install system dependencies
RUN apt-get update && apt-get install -y     espeak     ffmpeg     git     && rm -rf /var/lib/apt/lists/*

# Install Coqui TTS
RUN pip install --upgrade pip
RUN pip install TTS==0.22.0

# Download pretrained model (optional step; replace with volume mount in prod)
RUN mkdir /models &&     python3 -m TTS.utils.download --model_name "tts_models/en/ljspeech/tacotron2-DDC"

# Copy API script
WORKDIR /app
COPY tts_server.py .

EXPOSE 5002
CMD ["python3", "tts_server.py"]
