import { useState } from 'react';

export default function AdminInvite() {
  const [email, setEmail] = useState('');
  const [role, setRole] = useState('user');
  const [inviteLink, setInviteLink] = useState('');

  const sendInvite = async () => {
    const res = await fetch('/api/invite/create', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + localStorage.getItem('token'),
      },
      body: JSON.stringify({ email, role }),
    });
    const data = await res.json();
    setInviteLink(`http://localhost:3000/invite/${data.token}`);
  };

  return (
    <div className="p-8 max-w-xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Jemput Pengguna Baru</h1>
      <input
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Email pengguna"
        className="border px-3 py-2 w-full mb-2"
      />
      <select value={role} onChange={(e) => setRole(e.target.value)} className="border px-3 py-2 w-full mb-2">
        <option value="user">user</option>
        <option value="viewer">viewer</option>
        <option value="manager">manager</option>
      </select>
      <button onClick={sendInvite} className="bg-blue-600 text-white px-4 py-2 rounded">
        Hantar Jemputan
      </button>
      {inviteLink && (
        <p className="mt-4 text-green-600 break-all">
          Invite Link: <br />
          <a href={inviteLink} target="_blank" rel="noopener noreferrer">{inviteLink}</a>
        </p>
      )}
    </div>
  );
}
