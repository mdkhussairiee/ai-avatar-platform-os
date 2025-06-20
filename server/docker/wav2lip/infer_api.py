
import os
import subprocess
from flask import Flask, request, jsonify, send_file

app = Flask(__name__)

UPLOAD_FOLDER = '/app/uploads'
OUTPUT_FOLDER = '/app/outputs'
os.makedirs(UPLOAD_FOLDER, exist_ok=True)
os.makedirs(OUTPUT_FOLDER, exist_ok=True)

@app.route('/generate', methods=['POST'])
def generate():
    if 'image' not in request.files or 'audio' not in request.files:
        return jsonify({'error': 'Missing image or audio'}), 400

    image_file = request.files['image']
    audio_file = request.files['audio']

    image_path = os.path.join(UPLOAD_FOLDER, 'input.jpg')
    audio_path = os.path.join(UPLOAD_FOLDER, 'input.wav')
    output_path = os.path.join(OUTPUT_FOLDER, 'result_voice.mp4')

    image_file.save(image_path)
    audio_file.save(audio_path)

    # Run Wav2Lip inference
    command = [
        'python3', 'inference.py',
        '--checkpoint_path', 'checkpoints/wav2lip_gan.pth',
        '--face', image_path,
        '--audio', audio_path,
        '--outfile', output_path
    ]

    try:
        subprocess.run(command, check=True)
        return send_file(output_path, mimetype='video/mp4')
    except subprocess.CalledProcessError:
        return jsonify({'error': 'Inference failed'}), 500

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000)
