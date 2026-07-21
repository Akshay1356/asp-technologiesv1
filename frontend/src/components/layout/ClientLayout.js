'use client';

import { useEffect, useState } from 'react';
import { usePathname } from 'next/navigation';
import dynamic from 'next/dynamic';

const Navbar = dynamic(() => import('@/components/layout/Navbar'), { ssr: false });
const Footer = dynamic(() => import('@/components/layout/Footer'), { ssr: false });

export default function ClientLayout({ children }) {
  const [loading, setLoading] = useState(true);
  const pathname = usePathname();
  const isAdmin = pathname?.startsWith('/admin');

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 1500);
    return () => clearTimeout(timer);
  }, []);

  if (loading) {
    return (
      <div className="fixed inset-0 z-[100] bg-graphite-950 flex flex-col items-center justify-center">
        <svg width="64" height="64" viewBox="0 0 36 36" fill="none" className="mb-6">
          <rect x="2" y="2" width="32" height="32" rx="8" stroke="#0A84FF" strokeWidth="1.5" fill="none" className="animate-pulse" />
          <path d="M10 18L18 10L26 18L18 26Z" stroke="#0A84FF" strokeWidth="1.5" fill="none" className="animate-pulse" />
          <path d="M14 14L22 22M22 14L14 22" stroke="#00E5FF" strokeWidth="1" strokeLinecap="round" />
        </svg>
        <div className="text-graphite-400 text-sm font-mono mb-4">Initializing System</div>
        <div className="w-48 h-1 rounded-full bg-graphite-800 overflow-hidden">
          <div className="h-full w-full bg-primary rounded-full animate-[loading_1.5s_ease-in-out_infinite]" style={{ animation: 'loading 1.5s ease-in-out infinite' }} />
        </div>
        <style jsx>{`
          @keyframes loading {
            0% { width: 0%; }
            50% { width: 70%; }
            100% { width: 100%; }
          }
        `}</style>
      </div>
    );
  }

  return (
    <>
      {!isAdmin && <Navbar />}
      <main className={isAdmin ? '' : 'min-h-screen'}>
        {children}
      </main>
      {!isAdmin && <Footer />}
    </>
  );
}
