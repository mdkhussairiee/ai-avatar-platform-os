import Head from 'next/head';
import Link from 'next/link';

export default function Home() {
  return (
    <div className="min-h-screen bg-gray-100 text-center flex flex-col items-center justify-center p-6">
      <Head>
        <title>AI Avatar Platform</title>
      </Head>
      <h1 className="text-4xl font-bold mb-4">Selamat Datang ke AI Avatar Platform</h1>
      <p className="text-lg mb-6">Cipta avatar bercakap dari gambar dan AI dalam masa nyata.</p>
      <Link href="/dashboard">
        <a className="px-6 py-3 bg-black text-white rounded-xl hover:bg-gray-800 transition">
          Pergi ke Dashboard
        </a>
      </Link>
    </div>
  );
}
