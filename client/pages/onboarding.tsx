import { useState } from 'react';
import { useRouter } from 'next/router';

export default function Onboarding() {
  const router = useRouter();
  const [name, setName] = useState('');
  const [avatar, setAvatar] = useState('');

  const submit = async () => {
    await fetch('/api/user/profile', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + localStorage.getItem('token'),
      },
      body: JSON.stringify({ name, avatar }),
    });
    router.push('/');
  };

  return (
    <div className="p-8 max-w-md mx-auto">
      <h1 className="text-2xl font-bold mb-4">Selamat Datang!</h1>
      <input
        className="border w-full px-3 py-2 mb-3"
        placeholder="Nama penuh"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <input
        className="border w-full px-3 py-2 mb-3"
        placeholder="URL Avatar (opsyenal)"
        value={avatar}
        onChange={(e) => setAvatar(e.target.value)}
      />
      <button onClick={submit} className="bg-green-600 text-white px-4 py-2 rounded">
        Selesai & Masuk
      </button>
    </div>
  );
}
