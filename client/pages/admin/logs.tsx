import { useEffect, useState } from 'react';

interface LogEntry {
  id: number;
  action: string;
  timestamp: string;
  user: {
    email: string;
    role: string;
  };
}

export default function AdminLogs() {
  const [logs, setLogs] = useState<LogEntry[]>([]);

  useEffect(() => {
    fetch('/api/admin/logs', {
      headers: {
        Authorization: 'Bearer ' + localStorage.getItem('token'),
      },
    })
      .then((res) => res.json())
      .then((data) => setLogs(data.logs || []));
  }, []);

  return (
    <div className="p-8 max-w-5xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Audit Trail</h1>
      <table className="w-full border-collapse border border-gray-300 text-sm">
        <thead>
          <tr className="bg-gray-100">
            <th className="border px-3 py-2">Pengguna</th>
            <th className="border px-3 py-2">Role</th>
            <th className="border px-3 py-2">Tindakan</th>
            <th className="border px-3 py-2">Masa</th>
          </tr>
        </thead>
        <tbody>
          {logs.map((log) => (
            <tr key={log.id}>
              <td className="border px-3 py-2">{log.user?.email || '—'}</td>
              <td className="border px-3 py-2">{log.user?.role || '-'}</td>
              <td className="border px-3 py-2">{log.action}</td>
              <td className="border px-3 py-2">
                {new Date(log.timestamp).toLocaleString()}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
