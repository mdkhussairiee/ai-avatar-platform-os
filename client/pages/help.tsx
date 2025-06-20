export default function Help() {
  return (
    <div className="p-6 max-w-xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Bantuan & Sokongan</h1>
      <p className="mb-2">Soalan lazim? Lihat dokumentasi atau hubungi kami.</p>
      <ul className="list-disc list-inside">
        <li><a href="/docs/deployment.md" className="text-blue-600">Panduan Deploy</a></li>
        <li>Email: support@yourdomain.com</li>
      </ul>
    </div>
  );
}