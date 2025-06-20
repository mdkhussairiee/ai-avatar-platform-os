import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

export default function InviteSignup() {
  const router = useRouter();
  const { token } = router.query;

  const [email, setEmail] = useState('');
  const [role, setRole] = useState('');
  const [password, setPassword] = useState('');
  const [done, setDone] = useState(false);

  useEffect(() => {
    if (token) {
      fetch(`/api/invite/${token}`)
        .then((res) => res.json())
        .then((data) => {
          if (data.email) {
            setEmail(data.email);
            setRole(data.role);
          }
        });
    }
  }, [token]);

  const signup = async () => {
    await fetch(`/api/invite/${token}/signup`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ password }),
    });
    setDone(true);
    setTimeout(() => router.push('/onboarding'), 1000);
  };

  if (!email) return <p className="p-6">Loading...</p>;
  if (done) return <p className="p-6 text-green-600">Akaun berjaya didaftar! Redirecting…</p>;

  return (
    <div className="p-8 max-w-md mx-auto">
      <h1 className="text-2xl font-bold mb-4">Signup Jemputan</h1>
      <p><strong>Email:</strong> {email}</p>
      <p><strong>Peranan:</strong> {role}</p>
      <input
        type="password"
        className="border w-full px-3 py-2 mt-4 mb-2"
        placeholder="Kata laluan"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button onClick={signup} className="bg-blue-600 text-white px-4 py-2 rounded">
        Daftar
      </button>
    </div>
  );
}
