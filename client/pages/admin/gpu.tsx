import { useEffect, useState } from 'react';
import AuthGuard from '../../components/AuthGuard';

export default function GPUAdminWrapper() {
  return (
    <AuthGuard>
      <GPUAdminPage />
    </AuthGuard>
  );
}

function GPUAdminPage() {
  const [gpuAlerts, setGpuAlerts] = useState([]);
  const [gpuStatus, setGpuStatus] = useState('');
  const [logs, setLogs] = useState([]);
  const [prompt, setPrompt] = useState('');
  const [gpu, setGpu] = useState(0);

  useEffect(() => {
    fetch('/api/admin/gpu-logs').then(res => res.json()).then(setLogs);
    fetch('/api/admin/gpu-alerts').then(res => res.json()).then(setGpuAlerts);
    fetch('http://localhost:8000/gpu').then(res => res.json()).then(data => {
      setGpuStatus(data.nvidia_smi || '');
    });
  }, []);

  const submitPrompt = async () => {
    await fetch('/api/admin/llm-task', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ prompt, gpu })
    });
    alert('Prompt dihantar!');
  };

  return (
    <div className="p-6 max-w-5xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">🎛 Kawalan GPU & Task</h1>
      <div className="mb-4">
        <textarea value={gpuStatus} rows={10} readOnly className="w-full border font-mono text-xs p-2 mb-4" />
        <input
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          placeholder="Masukkan prompt"
          className="border w-full p-2 mb-2"
        />
        <select value={gpu} onChange={(e) => setGpu(Number(e.target.value))} className="mb-2 border p-2">
          <option value={0}>GPU 0</option>
          <option value={1}>GPU 1</option>
          <option value={2}>GPU 2</option>
        </select>
        <button onClick={submitPrompt} className="bg-blue-600 text-white px-4 py-2 rounded">🚀 Hantar Prompt</button>
      </div>
      
      <h2 className="text-lg font-semibold mb-2">⚠️ Alert Beban GPU:</h2>
      <ul className="text-sm mb-4 border rounded p-2 bg-yellow-50">
        {gpuAlerts.map((alert) => (
          <li key={alert.id} className="border-b py-1">
            <b>GPU {alert.gpuIndex}</b>: {alert.message} <i className="text-xs text-gray-500">({new Date(alert.createdAt).toLocaleString()})</i>
          </li>
        ))}
      </ul>
      <h2 className="text-lg font-semibold">📋 Log Tugas:</h2>
        
      <ul className="text-sm mt-2 border rounded p-2 bg-gray-50">
        {logs.map((log) => (
          <li key={log.id} className="border-b py-1">
            <b>GPU {log.gpu}</b>: {log.prompt} <i className="text-xs text-gray-500">({log.status})</i>
          </li>
        ))}
      </ul>
    </div>
  );
}
