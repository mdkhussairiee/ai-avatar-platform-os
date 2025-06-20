
from flask import Flask, request, send_file
from TTS.api import TTS
import tempfile

app = Flask(__name__)
tts = TTS(model_name="tts_models/en/ljspeech/tacotron2-DDC", progress_bar=False, gpu=False)

@app.route('/speak', methods=['POST'])
def speak():
    text = request.json.get("text")
    if not text:
        return {"error": "Missing text"}, 400

    with tempfile.NamedTemporaryFile(suffix=".wav", delete=False) as tmp:
        tts.tts_to_file(text=text, file_path=tmp.name)
        return send_file(tmp.name, mimetype="audio/wav")

if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5002)
