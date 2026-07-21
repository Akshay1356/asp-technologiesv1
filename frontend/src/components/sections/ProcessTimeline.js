'use client';

import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { AnimatedSection } from '@/components/ui';
import { HiArrowRight } from 'react-icons/hi';

const steps = [
  { title: 'Requirement', desc: 'Gather specifications and define project scope', icon: '📋' },
  { title: 'Schematic', desc: 'Design circuit schematics with component selection', icon: '🔧' },
  { title: 'PCB Layout', desc: 'Board layout with signal integrity optimization', icon: '📐' },
  { title: 'Simulation', desc: 'SI/PI analysis and design verification', icon: '📊' },
  { title: 'Review', desc: 'Design review and DFM checks', icon: '✅' },
  { title: 'Manufacturing', desc: 'Generate Gerber files and fabrication support', icon: '🏭' },
  { title: 'Support', desc: 'Post-manufacturing support and testing', icon: '🤝' },
];

export default function ProcessTimeline() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section className="relative section-padding bg-graphite-900/50 overflow-hidden">
      <div className="container-max">
        <AnimatedSection>
          <div className="text-center mb-16">
            <span className="text-xs font-mono uppercase tracking-[0.2em] text-primary mb-4 block">Our Process</span>
            <h2 className="section-title text-white mb-6">From Concept to Production</h2>
            <p className="section-subtitle mx-auto text-graphite-400">
              A streamlined workflow ensuring quality at every stage of development.
            </p>
          </div>
        </AnimatedSection>

        <div ref={ref} className="relative">
          <div className="absolute top-1/2 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary/30 to-transparent hidden lg:block" />

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-7 gap-6 lg:gap-0">
            {steps.map((step, i) => (
              <motion.div
                key={step.title}
                initial={{ opacity: 0, y: 40 }}
                animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
                transition={{ duration: 0.6, delay: i * 0.15 }}
                className="relative flex flex-col items-center text-center lg:px-4"
              >
                <div className="relative z-10">
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={isInView ? { scale: 1 } : { scale: 0 }}
                    transition={{ duration: 0.4, delay: i * 0.15 + 0.2, type: 'spring' }}
                    className="w-16 h-16 rounded-2xl bg-graphite-800 border border-primary/20 flex items-center justify-center text-2xl mb-4 group-hover:border-primary transition-colors"
                  >
                    <span>{step.icon}</span>
                  </motion.div>
                </div>
                <h3 className="text-sm font-semibold text-white mb-2">{step.title}</h3>
                <p className="text-xs text-graphite-500">{step.desc}</p>
                {i < steps.length - 1 && (
                  <div className="hidden lg:block absolute top-8 -right-3 text-primary/40 z-20">
                    <HiArrowRight size={16} />
                  </div>
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
