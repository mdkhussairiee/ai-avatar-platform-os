import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [branding, setBranding] = useState({ brandName: "AI Avatar", logoUrl: "", primaryColor: "#2563eb" });
  const router = useRouter();

  useEffect(() => {
    // Simulasi default brand (boleh ubah ikut domain)
    fetch('/api/branding').then(res => res.json()).then(setBranding);
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await fetch('/api/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password })
    });
    const data = await res.json();
    if (data.token) {
      localStorage.setItem('token', data.token);
      localStorage.setItem('userEmail', email);
      router.push('/avatar-chat');
    } else {
      alert('Login gagal');
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 p-6">
      {branding.logoUrl && <img src={branding.logoUrl} className="h-20 mb-4" />}
      <h1 className="text-2xl font-bold mb-4" style={{ color: branding.primaryColor }}>
        {branding.brandName} Login
      </h1>
      <form onSubmit={handleSubmit} className="bg-white p-4 shadow-md rounded w-full max-w-sm">
        <input value={email} onChange={e => setEmail(e.target.value)} placeholder="Email" type="email"
          className="w-full border p-2 mb-2" required />
        <input value={password} onChange={e => setPassword(e.target.value)} placeholder="Kata laluan" type="password"
          className="w-full border p-2 mb-4" required />
        <button type="submit" className="w-full py-2 text-white rounded"
          style={{ backgroundColor: branding.primaryColor }}>Log Masuk</button>
      </form>
    </div>
  );
}
