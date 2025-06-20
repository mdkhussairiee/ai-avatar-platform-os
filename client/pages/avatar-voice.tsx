import AuthGuard from '../components/AuthGuard';
import { useState, useRef } from 'react';

function PageWrapper() {
  return (
    <AuthGuard>
      <MainPage />
    </AuthGuard>
  );
}

function AvatarVoice() {
  const [image, setImage] = useState<File | null>(null);
  const [recording, setRecording] = useState(false);
  const [streamUrl, setStreamUrl] = useState('');
  const mediaRecorder = useRef<MediaRecorder | null>(null);
  const chunks = useRef<Blob[]>([]);

  const handleRecord = async () => {
    if (recording) {
      mediaRecorder.current?.stop();
      setRecording(false);
      return;
    }

    const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
    const recorder = new MediaRecorder(stream);
    chunks.current = [];

    recorder.ondataavailable = (e) => chunks.current.push(e.data);
    recorder.onstop = async () => {
      const audioBlob = new Blob(chunks.current, { type: 'audio/webm' });
      const formData = new FormData();
      formData.append('audio', new File([audioBlob], 'recording.webm'));

      // 1. Transcribe audio
      const transcriptRes = await fetch('/api/transcribe', {
        method: 'POST',
        body: formData,
      });
      const { transcript } = await transcriptRes.json();
      console.log('Transcribed:', transcript);

      // 2. Get GPT answer
      const gptRes = await fetch('/api/ask', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ question: transcript }),
      });
      const { answer } = await gptRes.json();

      // 3. Convert answer to voice
      const ttsRes = await fetch('http://localhost:5002/speak', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ text: answer }),
      });
      const ttsAudio = await ttsRes.blob();

      // 4. Send to Wav2Lip stream
      const lipSyncData = new FormData();
      lipSyncData.append('image', image!);
      lipSyncData.append('audio', new File([ttsAudio], 'speech.wav', { type: 'audio/wav' }));

      await fetch('http://localhost:5000/stream', {
        method: 'POST',
        body: lipSyncData,
      });

      setStreamUrl('http://localhost:5000/stream');
    };

    recorder.start();
    mediaRecorder.current = recorder;
    setRecording(true);
  };

  return (
    <div className="p-8 max-w-xl mx-auto">
      
      <div className="mb-4 text-sm flex justify-between items-center">
        <div>👤 Pengguna: {localStorage.getItem('userEmail')}</div>
        <button
          className="text-red-600"
          onClick={() => {
            localStorage.removeItem('token');
            localStorage.removeItem('userEmail');
            window.location.href = '/login';
          }}
        >
          Log Keluar
        </button>
      </div>
        
<h1 className="text-xl font-bold mb-4">🎙️ AI Avatar Suara Interaktif</h1>
      <input
        type="file"
        accept="image/*"
        onChange={(e) => setImage(e.target.files?.[0] || null)}
        className="mb-3"
      />
      <button
        onClick={handleRecord}
        className={`px-4 py-2 text-white rounded ${recording ? 'bg-red-600' : 'bg-green-600'}`}
        disabled={!image}
      >
        {recording ? 'Hentikan Rakaman' : '🎤 Rakam & Tanya AI'}
      </button>

      {streamUrl && (
        <div className="mt-6 border rounded overflow-hidden">
          <img src={streamUrl} alt="MJPEG Stream" className="w-full" />
        </div>
      )}
    </div>
  );
}


export default PageWrapper;
