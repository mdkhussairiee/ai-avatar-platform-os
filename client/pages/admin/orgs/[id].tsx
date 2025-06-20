import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

export default function EditOrg() {
  const router = useRouter();
  const { id } = router.query;

  const [org, setOrg] = useState<any>(null);
  const [logoUrl, setLogoUrl] = useState('');
  const [themeColor, setThemeColor] = useState('');

  const fetchOrg = () => {
    fetch(`/api/admin/orgs`)
      .then((res) => res.json())
      .then((data) => {
        const found = data.orgs?.find((o: any) => o.id === Number(id));
        setOrg(found);
        setLogoUrl(found?.logoUrl || '');
        setThemeColor(found?.themeColor || '');
      });
  };

  useEffect(() => {
    if (id) fetchOrg();
  }, [id]);

  const save = async () => {
    await fetch(`/api/admin/orgs/${id}/branding`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + localStorage.getItem('token'),
      },
      body: JSON.stringify({ logoUrl, themeColor }),
    });
    fetchOrg();
  };

  if (!org) return <p className="p-6">Loading...</p>;

  return (
    <div className="p-8 max-w-xl mx-auto">
      <h1 className="text-xl font-bold mb-4">Edit Branding - {org.name}</h1>
      <div className="mb-2">
        <label className="block text-sm font-medium">Logo URL</label>
        <input
          value={logoUrl}
          onChange={(e) => setLogoUrl(e.target.value)}
          className="border px-3 py-2 w-full"
        />
      </div>
      <div className="mb-4">
        <label className="block text-sm font-medium">Warna Tema (contoh: #0099ff)</label>
        <input
          value={themeColor}
          onChange={(e) => setThemeColor(e.target.value)}
          className="border px-3 py-2 w-full"
        />
      </div>
      <button onClick={save} className="bg-blue-600 text-white px-4 py-2 rounded">
        Simpan
      </button>
      <div className="mt-6 border-t pt-4">
        <p className="text-sm">Contoh Preview:</p>
        {logoUrl && <img src={logoUrl} className="h-10 mt-2" />}
        {themeColor && (
          <div className="mt-2 p-4 text-white rounded" style={{ backgroundColor: themeColor }}>
            Ini adalah warna tema
          </div>
        )}
      </div>
    </div>
  );
}
