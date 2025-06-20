import { useState } from 'react';

export default function AvatarStreamPage() {
  const [image, setImage] = useState<File | null>(null);
  const [text, setText] = useState('');
  const [streamUrl, setStreamUrl] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    if (!image || !text) return;
    setLoading(true);

    // 1. Generate audio using Coqui TTS
    const ttsRes = await fetch('http://localhost:5002/speak', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ text }),
    });
    const audioBlob = await ttsRes.blob();

    // 2. Prepare FormData
    const formData = new FormData();
    formData.append('image', image);
    formData.append('audio', new File([audioBlob], 'audio.wav', { type: 'audio/wav' }));

    // 3. Create object URL for stream (via proxy stream endpoint)
    const streamEndpoint = 'http://localhost:5000/stream';

    // 4. Upload via fetch (side effect to initiate stream on server)
    await fetch(streamEndpoint, {
      method: 'POST',
      body: formData,
    });

    // 5. Set stream URL to <img src>
    setStreamUrl(streamEndpoint);
    setLoading(false);
  };

  return (
    <div className="p-8 max-w-xl mx-auto">
      <h1 className="text-xl font-bold mb-4">Avatar Streaming (MJPEG + TTS)</h1>
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
        className="bg-green-600 text-white px-4 py-2 rounded"
        disabled={loading}
      >
        {loading ? 'Menjana & Memulakan Stream...' : 'Mula Stream'}
      </button>

      {streamUrl && (
        <div className="mt-6 border rounded overflow-hidden">
          <img src={streamUrl} alt="MJPEG Stream" className="w-full" />
        </div>
      )}
    </div>
  );
}
