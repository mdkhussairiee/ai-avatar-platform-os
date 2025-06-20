import { useEffect, useState } from 'react';

interface User {
  id: number;
  email: string;
  plan: string;
  role: string;
}

export default function AdminUsers() {
  const [users, setUsers] = useState<User[]>([]);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = () => {
    fetch('/api/admin/users', {
      headers: {
        Authorization: 'Bearer ' + localStorage.getItem('token'),
      },
    })
      .then((res) => res.json())
      .then((data) => setUsers(data.users || []));
  };

  const deleteUser = async (id: number) => {
    await fetch(`/api/admin/users/${id}`, {
      method: 'DELETE',
      headers: {
        Authorization: 'Bearer ' + localStorage.getItem('token'),
      },
    });
    fetchUsers();
  };

  const updatePlan = async (id: number, plan: string) => {
    await fetch(`/api/admin/users/${id}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + localStorage.getItem('token'),
      },
      body: JSON.stringify({ plan }),
    });
    fetchUsers();
  };

  const updateRole = async (id: number, role: string) => {
    await fetch(`/api/admin/users/${id}/role`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + localStorage.getItem('token'),
      },
      body: JSON.stringify({ role }),
    });
    fetchUsers();
  };

  const exportCSV = () => {
    const csv = ['ID,Email,Plan,Role'];
    users.forEach((u) => {
      csv.push(`${u.id},${u.email},${u.plan},${u.role}`);
    });
    const blob = new Blob([csv.join('\n')], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'users.csv';
    a.click();
  };

  return (
    <div className="p-8 max-w-6xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Senarai Pengguna</h1>
      <button
        onClick={exportCSV}
        className="mb-4 px-4 py-2 bg-green-600 text-white rounded"
      >
        Export CSV
      </button>
      <table className="w-full border-collapse border border-gray-300">
        <thead>
          <tr className="bg-gray-100">
            <th className="border px-3 py-2">ID</th>
            <th className="border px-3 py-2">Email</th>
            <th className="border px-3 py-2">Plan</th>
            <th className="border px-3 py-2">Role</th>
            <th className="border px-3 py-2">Tindakan</th>
          </tr>
        </thead>
        <tbody>
          {users.map((u) => (
            <tr key={u.id}>
              <td className="border px-3 py-2">{u.id}</td>
              <td className="border px-3 py-2">{u.email}</td>
              <td className="border px-3 py-2">
                <select
                  value={u.plan}
                  onChange={(e) => updatePlan(u.id, e.target.value)}
                >
                  <option value="free">free</option>
                  <option value="pro">pro</option>
                  <option value="enterprise">enterprise</option>
                </select>
              </td>
              <td className="border px-3 py-2">
                <select
                  value={u.role}
                  onChange={(e) => updateRole(u.id, e.target.value)}
                >
                  <option value="user">user</option>
                  <option value="viewer">viewer</option>
                  <option value="manager">manager</option>
                  <option value="admin">admin</option>
                </select>
              </td>
              <td className="border px-3 py-2">
                <button
                  onClick={() => deleteUser(u.id)}
                  className="px-3 py-1 bg-red-500 text-white rounded"
                >
                  Padam
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
