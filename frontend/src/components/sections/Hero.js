'use client';

import { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import dynamic from 'next/dynamic';
import { ParticleField, MagneticButton, TextReveal } from '@/components/ui';

const PCBScene = dynamic(() => import('@/components/3d/PCBScene'), { ssr: false });

export default function Hero() {
  const sectionRef = useRef(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouse = (e) => {
      setMousePos({ x: e.clientX / window.innerWidth, y: e.clientY / window.innerHeight });
    };
    window.addEventListener('mousemove', handleMouse);
    return () => window.removeEventListener('mousemove', handleMouse);
  }, []);

  return (
    <section ref={sectionRef} className="relative min-h-screen flex items-center overflow-hidden">
      <PCBScene />
      <ParticleField />

      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-graphite-950 z-[1]" />

      <div className="container-max relative z-10 px-6 pt-24 pb-16">
        <div className="max-w-5xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="flex items-center gap-2 mb-6"
          >
            <span className="w-2 h-2 rounded-full bg-accent animate-pulse" />
            <span className="text-xs font-mono uppercase tracking-[0.2em] text-graphite-400">
              Precision Electronics Engineering
            </span>
          </motion.div>

          <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold tracking-tight leading-[0.95] mb-8">
            <TextReveal text="Engineering" className="text-white" delay={0.4} />
            <br />
            <span className="text-gradient">
              <TextReveal text="Tomorrow's" delay={0.8} />
              <br />
              <TextReveal text="Electronics" delay={1.2} />
            </span>
          </h1>

          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 1.6 }}
            className="text-lg md:text-xl text-graphite-300 max-w-2xl mb-12 leading-relaxed"
          >
            Precision PCB Design &middot; Hardware Development &middot; Electronic Innovation
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 2 }}
            className="flex flex-wrap gap-4"
          >
            <MagneticButton>
              <Link href="/services" className="btn-primary text-base px-10 py-4">
                View Services
              </Link>
            </MagneticButton>
            <MagneticButton>
              <Link href="/contact" className="btn-secondary text-base px-10 py-4">
                Start Your Project
              </Link>
            </MagneticButton>
            <MagneticButton>
              <Link href="/about" className="btn-secondary text-base px-10 py-4 border-graphite-600 text-graphite-300 hover:text-white hover:border-graphite-400">
                About Us
              </Link>
            </MagneticButton>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 3 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2"
        >
          <div className="flex flex-col items-center gap-2 text-graphate-500">
            <span className="text-xs font-mono uppercase tracking-widest">Scroll</span>
            <div className="w-6 h-10 rounded-full border border-graphite-600 flex justify-center p-1.5">
              <motion.div
                animate={{ y: [0, 12, 0] }}
                transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
                className="w-1.5 h-1.5 rounded-full bg-primary"
              />
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
