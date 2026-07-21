'use client';

import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { AnimatedSection, CountUp } from '@/components/ui';

const stats = [
  { label: 'Projects Completed', value: 250, suffix: '+' },
  { label: 'Years Experience', value: 12, suffix: '+' },
  { label: 'Clients Served', value: 180, suffix: '+' },
  { label: 'Countries Supported', value: 15, suffix: '' },
];

const values = [
  {
    title: 'Engineering Philosophy',
    desc: 'Every design decision is driven by physics, precision, and performance. We engineer solutions that push the boundaries of what\'s possible in electronics.',
    icon: '⚡',
  },
  {
    title: 'Our Mission',
    desc: 'To deliver world-class PCB and hardware design services that empower innovation across industries, from automotive to aerospace.',
    icon: '🎯',
  },
  {
    title: 'Our Vision',
    desc: 'To be the most trusted partner for electronic product development, setting the standard for quality, reliability, and technical excellence.',
    icon: '🔭',
  },
  {
    title: 'Why ASP Technologies',
    desc: 'We combine deep technical expertise with cutting-edge tools and methodologies to deliver designs that work right the first time, every time.',
    icon: '🏆',
  },
];

export default function AboutSection() {
  return (
    <section className="relative section-padding bg-graphite-900/50">
      <div className="container-max">
        <AnimatedSection>
          <div className="text-center mb-20">
            <span className="text-xs font-mono uppercase tracking-[0.2em] text-primary mb-4 block">About ASP Technologies</span>
            <h2 className="section-title text-white mb-6">Where Precision Meets Innovation</h2>
            <p className="section-subtitle mx-auto text-graphite-400">
              We are a team of experienced engineers dedicated to delivering high-quality PCB design and electronic product development services.
            </p>
          </div>
        </AnimatedSection>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-24">
          {stats.map((stat, i) => (
            <AnimatedSection key={stat.label} delay={i * 0.1}>
              <div className="card text-center">
                <div className="text-4xl md:text-5xl font-bold text-gradient mb-2">
                  <CountUp end={stat.value} suffix={stat.suffix} />
                </div>
                <div className="text-sm text-graphite-400 font-medium">{stat.label}</div>
              </div>
            </AnimatedSection>
          ))}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {values.map((value, i) => (
            <AnimatedSection key={value.title} delay={i * 0.15}>
              <div className="card group h-full">
                <div className="text-3xl mb-4">{value.icon}</div>
                <h3 className="text-xl font-semibold text-white mb-3 group-hover:text-primary transition-colors">
                  {value.title}
                </h3>
                <p className="text-graphate-400 leading-relaxed text-sm">{value.desc}</p>
              </div>
            </AnimatedSection>
          ))}
        </div>
      </div>
    </section>
  );
}
