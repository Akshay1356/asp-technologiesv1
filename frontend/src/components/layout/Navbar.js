'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { HiMenu, HiX } from 'react-icons/hi';
import { FiChevronDown } from 'react-icons/fi';
import { cn } from '@/lib/utils';

const navLinks = [
  { title: 'Home', path: '/' },
  {
    title: 'Services',
    path: '/services',
    mega: [
      { title: 'PCB Layout Design', desc: 'Multi-layer & complex PCB layouts' },
      { title: 'High-Speed PCB', desc: 'High-speed digital designs' },
      { title: 'RF PCB Design', desc: 'RF circuit board engineering' },
      { title: 'Schematic Capture', desc: 'Professional schematics' },
      { title: 'SI/PI Analysis', desc: 'Signal & power integrity' },
      { title: 'Hardware Design', desc: 'Full product development' },
    ],
  },
  { title: 'Industries', path: '/industries' },
  { title: 'Portfolio', path: '/portfolio' },
  { title: 'Contact', path: '/contact' },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [megaOpen, setMegaOpen] = useState(false);
  const [progress, setProgress] = useState(0);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
      const total = document.documentElement.scrollHeight - window.innerHeight;
      setProgress(total > 0 ? (window.scrollY / total) * 100 : 0);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
        className={cn(
          'fixed top-0 left-0 right-0 z-50 transition-all duration-500',
          scrolled
            ? 'glass shadow-lg shadow-black/20'
            : 'bg-transparent'
        )}
      >
        <div className="container-max flex items-center justify-between px-6 py-4">
          <Link href="/" className="flex items-center gap-3 group">
            <Logo />
            <span className="text-lg font-bold tracking-tight text-white">
              ASP<span className="text-primary">.</span>TECH
            </span>
          </Link>

          <div className="hidden lg:flex items-center gap-1">
            {navLinks.map((link) => (
              <div key={link.title} className="relative"
                onMouseEnter={() => link.mega && setMegaOpen(true)}
                onMouseLeave={() => link.mega && setMegaOpen(false)}
              >
                <Link
                  href={link.path}
                  className={cn(
                    'relative px-4 py-2 text-sm font-medium transition-colors duration-300 rounded-lg hover:text-primary',
                    pathname === link.path ? 'text-primary' : 'text-graphite-300'
                  )}
                >
                  {link.title}
                  {link.mega && <FiChevronDown className="inline ml-1 text-xs" />}
                  <span className={cn(
                    'absolute bottom-0 left-4 right-4 h-0.5 bg-primary rounded-full transition-transform duration-300 origin-left',
                    pathname === link.path ? 'scale-x-100' : 'scale-x-0 group-hover:scale-x-100'
                  )} />
                </Link>
              </div>
            ))}
            <Link href="/contact" className="btn-primary ml-4">
              Start Project
            </Link>
          </div>

          <button
            className="lg:hidden text-2xl p-2 text-white"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Toggle menu"
          >
            {mobileOpen ? <HiX /> : <HiMenu />}
          </button>
        </div>

        <motion.div
          className="h-0.5 bg-primary/20 origin-left"
          style={{ scaleX: progress / 100 }}
        />

        <AnimatePresence>
          {megaOpen && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="absolute top-full left-0 right-0 glass border-t border-white/5"
              onMouseEnter={() => setMegaOpen(true)}
              onMouseLeave={() => setMegaOpen(false)}
            >
              <div className="container-max grid grid-cols-3 gap-6 p-8">
                {navLinks.find(l => l.mega)?.mega?.map((item) => (
                  <Link
                    key={item.title}
                    href="/services"
                    className="p-4 rounded-xl hover:bg-white/5 transition-all duration-300 group"
                  >
                    <div className="text-sm font-semibold text-white group-hover:text-primary transition-colors">
                      {item.title}
                    </div>
                    <div className="text-xs text-graphite-400 mt-1">{item.desc}</div>
                  </Link>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.nav>

      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, x: '100%' }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed inset-0 z-40 bg-graphite-950/95 backdrop-blur-xl lg:hidden"
          >
            <div className="flex flex-col items-center justify-center h-full gap-6">
              {navLinks.map((link) => (
                <Link
                  key={link.title}
                  href={link.path}
                  onClick={() => setMobileOpen(false)}
                  className="text-2xl font-medium hover:text-primary transition-colors"
                >
                  {link.title}
                </Link>
              ))}
              <Link href="/contact" className="btn-primary mt-4" onClick={() => setMobileOpen(false)}>
                Start Project
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

function Logo() {
  return (
    <svg width="36" height="36" viewBox="0 0 36 36" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect x="2" y="2" width="32" height="32" rx="8" stroke="#0A84FF" strokeWidth="1.5" fill="none" />
      <path d="M10 18L18 10L26 18L18 26Z" stroke="#0A84FF" strokeWidth="1.5" fill="none" />
      <path d="M14 14L22 22M22 14L14 22" stroke="#00E5FF" strokeWidth="1" strokeLinecap="round" />
      <circle cx="10" cy="10" r="1.5" fill="#00E5FF" />
      <circle cx="26" cy="26" r="1.5" fill="#00E5FF" />
      <path d="M18 8V12M18 24V28M8 18H12M24 18H28" stroke="#0A84FF" strokeWidth="0.8" />
    </svg>
  );
}
