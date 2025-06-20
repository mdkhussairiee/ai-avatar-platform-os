import { useState } from 'react';

export default function AvatarPage() {
  const [image, setImage] = useState<File | null>(null);
  const [text, setText] = useState('');
  const [videoUrl, setVideoUrl] = useState('');
  const [loading, setLoading] = useState(false);

  const generateVoice = async (text: string): Promise<Blob> => {
    const response = await fetch('/api/tts', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ text }),
    });
    const audioBlob = await response.blob();
    return audioBlob;
  };

  const handleSubmit = async () => {
    if (!image || !text) return;
    setLoading(true);

    const audioBlob = await generateVoice(text);
    const formData = new FormData();
    formData.append('image', image);
    formData.append('audio', new File([audioBlob], 'tts.wav', { type: 'audio/wav' }));

    const res = await fetch('http://localhost:5000/generate', {
      method: 'POST',
      body: formData,
    });

    const blob = await res.blob();
    const url = URL.createObjectURL(blob);
    setVideoUrl(url);
    setLoading(false);
  };

  return (
    <div className="p-8 max-w-xl mx-auto">
      <h1 className="text-xl font-bold mb-4">Avatar Bercakap (Streaming)</h1>
      <input
        type="file"
        accept="image/*"
        onChange={(e) => setImage(e.target.files?.[0] || null)}
        className="mb-3"
      />
      <textarea
        className="w-full border px-3 py-2 mb-3"
        rows={3}
        placeholder="Masukkan teks untuk avatar bercakap..."
        value={text}
        onChange={(e) => setText(e.target.value)}
      />
      <button
        onClick={handleSubmit}
        className="bg-blue-600 text-white px-4 py-2 rounded"
        disabled={loading}
      >
        {loading ? 'Memproses...' : 'Jana Avatar'}
      </button>

      {videoUrl && (
        <div className="mt-6">
          <video src={videoUrl} controls className="w-full rounded shadow" />
        </div>
      )}
    </div>
  );
}
