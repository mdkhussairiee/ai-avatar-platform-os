
from flask import Flask, request, send_file
from TTS.api import TTS
import uuid
import os

app = Flask(__name__)

# Load model once at startup (GPU enabled)
tts = TTS(model_name="tts_models/en/ljspeech/tacotron2-DDC", progress_bar=False, gpu=True)

@app.route('/speak', methods=['POST'])
def speak():
    data = request.get_json()
    if not data or 'text' not in data:
        return {"error": "Missing text"}, 400

    text = data['text']
    filename = f"output_{uuid.uuid4().hex}.wav"
    tts.tts_to_file(text=text, file_path=filename)

    response = send_file(filename, mimetype='audio/wav')
    os.remove(filename)
    return response

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5002)
