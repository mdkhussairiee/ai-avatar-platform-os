import { useEffect, useState } from 'react';

interface Org {
  id: number;
  name: string;
  users: { id: number; email: string; role: string }[];
}

export default function AdminOrgs() {
  const [orgs, setOrgs] = useState<Org[]>([]);
  const [newName, setNewName] = useState('');

  const fetchOrgs = () => {
    fetch('/api/admin/orgs', {
      headers: {
        Authorization: 'Bearer ' + localStorage.getItem('token'),
      },
    })
      .then((res) => res.json())
      .then((data) => setOrgs(data.orgs || []));
  };

  useEffect(() => {
    fetchOrgs();
  }, []);

  const createOrg = async () => {
    await fetch('/api/admin/orgs', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + localStorage.getItem('token'),
      },
      body: JSON.stringify({ name: newName }),
    });
    setNewName('');
    fetchOrgs();
  };

  const deleteOrg = async (id: number) => {
    await fetch(`/api/admin/orgs/${id}`, {
      method: 'DELETE',
      headers: {
        Authorization: 'Bearer ' + localStorage.getItem('token'),
      },
    });
    fetchOrgs();
  };

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Senarai Organisasi</h1>
      <div className="flex mb-4 gap-2">
        <input
          value={newName}
          onChange={(e) => setNewName(e.target.value)}
          className="border px-2 py-1 w-full"
          placeholder="Nama organisasi"
        />
        <button
          onClick={createOrg}
          className="bg-blue-600 text-white px-4 py-2 rounded"
        >
          Tambah
        </button>
      </div>
      <ul className="space-y-4">
        {orgs.map((o) => (
          <li key={o.id} className="border p-4 rounded bg-gray-50">
            <div className="flex justify-between items-center">
              <div>
                <h2 className="font-bold">{o.name}</h2>
                <p className="text-sm text-gray-600">
                  {o.users.length} pengguna
                </p>
              </div>
              <button
                onClick={() => deleteOrg(o.id)}
                className="text-sm bg-red-500 text-white px-3 py-1 rounded"
              >
                Padam
              </button>
            </div>
            <ul className="mt-2 text-sm">
              {o.users.map((u) => (
                <li key={u.id}>
                  {u.email} ({u.role})
                </li>
              ))}
            </ul>
          </li>
        ))}
      </ul>
    </div>
  );
}
