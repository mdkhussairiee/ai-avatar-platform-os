import { useEffect, useState } from 'react';
import AuthGuard from '../../components/AuthGuard';

export default function PageWrapper() {
  return (
    <AuthGuard>
      <OrganizationsPage />
    </AuthGuard>
  );
}

function OrganizationsPage() {
  const [orgs, setOrgs] = useState([]);
  const [selected, setSelected] = useState(null);
  const userEmail = typeof window !== 'undefined' ? localStorage.getItem('userEmail') : '';

  useEffect(() => {
    if (userEmail !== 'admin@ai.com') return;
    fetch('/api/admin/organizations', {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
    }).then((res) => res.json()).then(setOrgs);
  }, [userEmail]);

  if (userEmail !== 'admin@ai.com') {
    return <div className="p-6 text-red-600">Akses ini hanya untuk admin.</div>;
  }

  return (
    <div className="p-6 max-w-5xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">🏢 Senarai Organisasi</h1>
      <div className="flex gap-8">
        <div className="w-1/3 border p-3">
          {orgs.map((o) => (
            <div
              key={o.id}
              onClick={() => setSelected(o)}
              className="cursor-pointer p-2 border-b hover:bg-gray-100"
            >
              {o.name}
            </div>
          ))}
        </div>
        <div className="w-2/3">
          {selected ? (
            <>
              <h2 className="text-lg font-semibold mb-2">👥 Pengguna: {selected.name}</h2>
              <ul className="mb-4">
                {selected.users.map((u) => (
                  <li key={u.id} className="mb-2">
                    {u.email} ({u.interactions.length} interaksi)
                  </li>
                ))}
              </ul>
            </>
          ) : (
            <p>Pilih organisasi untuk lihat butiran...</p>
          )}
        </div>
      </div>
    </div>
  );
}
