import { useState } from 'react';
import AvatarPlayer from '../../components/AvatarPlayer';
import EmbedCode from '../../components/EmbedCode';
import DashboardAnalytics from '../../components/DashboardAnalytics';

export default function Dashboard() {
  const [videoUrl, setVideoUrl] = useState('');

  return (
    <div className="p-8 max-w-2xl mx-auto">
      <h1 className="text-3xl font-semibold mb-4">Dashboard</h1>
      <input
        type="text"
        className="w-full border rounded p-2 mb-4"
        placeholder="Masukkan URL video avatar..."
        onChange={(e) => setVideoUrl(e.target.value)}
      />
      {videoUrl && <AvatarPlayer videoUrl={videoUrl} />}
      {videoUrl && <EmbedCode videoUrl={videoUrl} />}
      <DashboardAnalytics />
    </div>
  );
}
