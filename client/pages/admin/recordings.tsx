import { useEffect, useState } from 'react';
import AuthGuard from '../../components/AuthGuard';

export default function RecordingsPageWrapper() {
  return (
    <AuthGuard>
      <RecordingsPage />
    </AuthGuard>
  );
}

function RecordingsPage() {
  const [recordings, setRecordings] = useState([]);

  useEffect(() => {
    fetch('/api/admin/recordings').then(res => res.json()).then(setRecordings);
  }, []);

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">🎥 Rakaman Avatar</h1>
      <ul className="space-y-4">
        {recordings.map((r) => (
          <li key={r.id} className="border rounded p-4 bg-gray-50">
            <div className="mb-2 font-semibold">{r.filename}</div>
            <video controls src={`/recordings/${r.filename}`} className="w-full mb-2 rounded" />
            <div className="text-sm text-gray-500">{new Date(r.createdAt).toLocaleString()}</div>
            <a href={`/recordings/${r.filename}`} download className="text-blue-600 text-sm mt-2 inline-block">⬇️ Muat Turun</a>
          </li>
        ))}
      </ul>
    </div>
  );
}
