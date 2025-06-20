import AuthGuard from '../components/AuthGuard';
import { useState } from 'react';

function PageWrapper() {
  return (
    <AuthGuard>
      <MainPage />
    </AuthGuard>
  );
}

function AvatarChat() {
  const [image, setImage] = useState<File | null>(null);
  const [input, setInput] = useState('');
  const [streamUrl, setStreamUrl] = useState('');
  const [loading, setLoading] = useState(false);

  const askGPT = async (text: string): Promise<string> => {
    const res = await fetch('/api/ask', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ question: text }),
    });
    const data = await res.json();
    return data.answer;
  };

  const handleSubmit = async () => {
    if (!image || !input) return;
    setLoading(true);

    // 1. Get GPT answer
    const answer = await askGPT(input);
    console.log('GPT:', answer);

    // 2. Convert answer to voice using Coqui
    const ttsRes = await fetch('http://localhost:5002/speak', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ text: answer }),
    });
    const audioBlob = await ttsRes.blob();

    // 3. Send image + audio to Wav2Lip stream
    const formData = new FormData();
    formData.append('image', image);
    formData.append('audio', new File([audioBlob], 'tts.wav', { type: 'audio/wav' }));

    // 4. Start stream (will auto-start MJPEG)
    await fetch('http://localhost:5000/stream', {
      method: 'POST',
      body: formData,
    });

    setStreamUrl('http://localhost:5000/stream');
    setLoading(false);
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
        
<h1 className="text-xl font-bold mb-4">Avatar AI Interaktif (GPT + TTS + Bibir)</h1>
      <input
        type="file"
        accept="image/*"
        onChange={(e) => setImage(e.target.files?.[0] || null)}
        className="mb-3"
      />
      <textarea
        className="w-full border px-3 py-2 mb-3"
        rows={3}
        placeholder="Tanya sesuatu kepada AI..."
        value={input}
        onChange={(e) => setInput(e.target.value)}
      />
      <button
        onClick={handleSubmit}
        className="bg-indigo-600 text-white px-4 py-2 rounded"
        disabled={loading}
      >
        {loading ? 'Memproses...' : 'Tanya AI & Bercakap'}
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
