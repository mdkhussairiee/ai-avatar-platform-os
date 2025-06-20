
from flask import Flask, request, Response
import subprocess
import os

app = Flask(__name__)

@app.route('/stream', methods=['POST'])
def stream():
    if 'image' not in request.files or 'audio' not in request.files:
        return 'Missing image or audio', 400

    image = request.files['image']
    audio = request.files['audio']
    image.save('input.jpg')
    audio.save('input.wav')

    # Run Wav2Lip inference and stream as MJPEG
    def generate():
        cmd = ['python3', 'inference.py', '--checkpoint_path', 'checkpoints/wav2lip_gan.pth',
               '--face', 'input.jpg', '--audio', 'input.wav', '--outfile', 'result.mp4']
        subprocess.run(cmd)

        # Convert result.mp4 to MJPEG stream
        mjpeg_cmd = ['ffmpeg', '-i', 'result.mp4', '-f', 'mjpeg', '-q:v', '5', '-']
        proc = subprocess.Popen(mjpeg_cmd, stdout=subprocess.PIPE)

        while True:
            chunk = proc.stdout.read(4096)
            if not chunk:
                break
            yield chunk

    return Response(generate(), mimetype='multipart/x-mixed-replace; boundary=frame')

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000)
