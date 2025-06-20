
FROM nvidia/cuda:11.3.1-cudnn8-runtime-ubuntu20.04

ENV DEBIAN_FRONTEND=noninteractive

RUN apt update && apt install -y \
    python3 python3-pip ffmpeg libsm6 libxext6 git curl

WORKDIR /app

# Clone Wav2Lip
RUN git clone https://github.com/Rudrabha/Wav2Lip.git . && \
    pip3 install -r requirements.txt && \
    pip3 install flask flask-cors opencv-python

COPY app.py .

CMD ["python3", "app.py"]
