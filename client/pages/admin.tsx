import { useEffect, useState } from 'react';
import AuthGuard from '../components/AuthGuard';

export default function PageWrapper() {
  return (
    <AuthGuard>
      <AdminPage />
    </AuthGuard>
  );
}

function AdminPage() {
  const [interactions, setInteractions] = useState([]);
  const [loading, setLoading] = useState(true);
  const userEmail = typeof window !== 'undefined' ? localStorage.getItem('userEmail') : '';

  useEffect(() => {
    if (userEmail !== 'admin@ai.com') return;

    fetch('/api/admin/interactions', {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        setInteractions(data);
        setLoading(false);
      });
  }, [userEmail]);

  if (userEmail !== 'admin@ai.com') {
    return <div className="p-6 text-red-600">Akses ini hanya untuk admin.</div>;
  }

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">📋 Semua Interaksi (Admin)</h1>
      {loading ? (
        <p>Memuatkan...</p>
      ) : (
        <table className="w-full text-sm border">
          <thead>
            <tr className="bg-gray-100">
              <th className="border p-2">Pengguna</th>
              <th className="border p-2">Soalan</th>
              <th className="border p-2">Jawapan</th>
              <th className="border p-2">Masa</th>
            </tr>
          </thead>
          <tbody>
            {interactions.map((i, idx) => (
              <tr key={idx}>
                <td className="border p-2">{i.user.email}</td>
                <td className="border p-2">{i.question}</td>
                <td className="border p-2">{i.answer}</td>
                <td className="border p-2">{new Date(i.createdAt).toLocaleString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
