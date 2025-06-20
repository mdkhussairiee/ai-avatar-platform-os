
FROM nvidia/cuda:11.3.1-cudnn8-runtime-ubuntu20.04

ENV DEBIAN_FRONTEND=noninteractive

RUN apt update && apt install -y python3 python3-pip git

RUN pip3 install TTS==0.20.0 flask flask-cors soundfile

WORKDIR /app

COPY server.py .

CMD ["python3", "server.py"]
