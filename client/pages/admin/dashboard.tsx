import { useEffect, useState } from 'react';

interface PlanStat {
  plan: string;
  _count: number;
}

export default function AdminDashboard() {
  const [total, setTotal] = useState(0);
  const [plans, setPlans] = useState<PlanStat[]>([]);

  useEffect(() => {
    fetch('/api/admin/stats', {
      headers: {
        Authorization: 'Bearer ' + localStorage.getItem('token'),
      },
    })
      .then(res => res.json())
      .then(data => {
        setTotal(data.totalUsers);
        setPlans(data.plans.map(p => ({ plan: p.plan, _count: p._count })));
      });
  }, []);

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Admin Dashboard</h1>
      <div className="mb-4">Jumlah Pengguna: <strong>{total}</strong></div>
      <h2 className="text-xl font-semibold mt-6 mb-2">Distribusi Plan</h2>
      <ul className="list-disc list-inside">
        {plans.map((p, i) => (
          <li key={i}>{p.plan}: {p._count}</li>
        ))}
      </ul>
    </div>
  );
}
