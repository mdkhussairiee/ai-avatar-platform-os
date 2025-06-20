
import os
import time
import cv2
import torch
import numpy as np
from flask import Flask, Response, request
from subprocess import run

from Wav2Lip.inference import load_model, datagen, get_smoothened_boxes, face_detect
from Wav2Lip.hparams import hparams as hp
from scipy.io import wavfile

app = Flask(__name__)

model = load_model('checkpoints/wav2lip_gan.pth')
model = model.cuda() if torch.cuda.is_available() else model
model.eval()

@app.route('/stream', methods=['POST'])
def stream():
    if 'image' not in request.files or 'audio' not in request.files:
        return "Missing inputs", 400

    # Save inputs temporarily
    image_path = '/tmp/frame.jpg'
    audio_path = '/tmp/audio.wav'
    request.files['image'].save(image_path)
    request.files['audio'].save(audio_path)

    # Prepare input
    fps = 25
    full_frames = [cv2.imread(image_path)]
    coords = face_detect(full_frames[0])

    if coords is None:
        return "Face not detected", 400

    # Load audio
    wav = audio_path
    sample_rate, audio = wavfile.read(wav)

    gen = datagen(full_frames, coords, audio, fps)

    def generate():
        for i, (img_batch, mel_batch, frames, coords_batch) in enumerate(gen):
            if torch.cuda.is_available():
                img_batch = torch.FloatTensor(np.transpose(img_batch, (0, 3, 1, 2))).cuda()
                mel_batch = torch.FloatTensor(np.transpose(mel_batch, (0, 3, 1, 2))).cuda()
            else:
                img_batch = torch.FloatTensor(np.transpose(img_batch, (0, 3, 1, 2)))
                mel_batch = torch.FloatTensor(np.transpose(mel_batch, (0, 3, 1, 2)))

            with torch.no_grad():
                pred = model(mel_batch, img_batch)

            pred = pred.cpu().numpy().transpose(0, 2, 3, 1) * 255.0

            for p in pred:
                frame = cv2.cvtColor(p.astype(np.uint8), cv2.COLOR_RGB2BGR)
                ret, jpeg = cv2.imencode('.jpg', frame)
                if not ret:
                    continue
                yield (b'--frame\r\n'
                       b'Content-Type: image/jpeg\r\n\r\n' + jpeg.tobytes() + b'\r\n')

    return Response(generate(), mimetype='multipart/x-mixed-replace; boundary=frame')

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000)
