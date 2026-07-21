'use client';

import { motion } from 'framer-motion';
import { AnimatedSection, AnimatedCard } from '@/components/ui';
import { HiAcademicCap, HiChip, HiCube, HiHeart, HiLightningBolt, HiRss, HiGlobe, HiShieldCheck, HiCode, HiChartBar } from 'react-icons/hi';

const industries = [
  { name: 'Automotive', icon: HiCube, desc: 'ADAS, infotainment, and powertrain control modules', count: '45+ Projects' },
  { name: 'Industrial Automation', icon: HiChip, desc: 'PLC systems, motor drives, and industrial IoT', count: '35+ Projects' },
  { name: 'Consumer Electronics', icon: HiLightningBolt, desc: 'Smart devices, wearables, and home automation', count: '50+ Projects' },
  { name: 'Medical Electronics', icon: HiHeart, desc: 'Diagnostic equipment, implantables, and monitoring', count: '30+ Projects' },
  { name: 'IoT', icon: HiRss, desc: 'Connected devices, sensors, and edge computing', count: '40+ Projects' },
  { name: 'Telecom', icon: HiGlobe, desc: '5G infrastructure, RF equipment, and networking', count: '25+ Projects' },
  { name: 'Aerospace', icon: HiAcademicCap, desc: 'Avionics, satellite systems, and navigation', count: '15+ Projects' },
  { name: 'Defense', icon: HiShieldCheck, desc: 'Secure communications, radar, and electronic warfare', count: '20+ Projects' },
  { name: 'Robotics', icon: HiCode, desc: 'Control systems, sensor fusion, and actuation', count: '28+ Projects' },
  { name: 'Process', icon: HiChartBar, desc: 'Process control, instrumentation, and SCADA', count: '22+ Projects' },
];

export default function IndustriesSection() {
  return (
    <section className="relative section-padding">
      <div className="container-max">
        <AnimatedSection>
          <div className="text-center mb-16">
            <span className="text-xs font-mono uppercase tracking-[0.2em] text-primary mb-4 block">Industries We Serve</span>
            <h2 className="section-title text-white mb-6">Driving Innovation Across Industries</h2>
            <p className="section-subtitle mx-auto text-graphite-400">
              Our engineering expertise spans diverse sectors, delivering reliable PCB solutions for the most demanding applications.
            </p>
          </div>
        </AnimatedSection>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
          {industries.map((ind, i) => (
            <AnimatedCard key={ind.name} index={i}>
              <div className="card text-center group h-full p-6">
                <div className="w-12 h-12 rounded-xl bg-primary/5 flex items-center justify-center mx-auto mb-4 group-hover:bg-primary/20 transition-colors">
                  <ind.icon className="text-2xl text-primary" />
                </div>
                <h3 className="text-sm font-semibold text-white mb-2 group-hover:text-primary transition-colors">{ind.name}</h3>
                <p className="text-xs text-graphite-500 mb-3 leading-relaxed">{ind.desc}</p>
                <span className="text-xs font-mono text-accent">{ind.count}</span>
              </div>
            </AnimatedCard>
          ))}
        </div>
      </div>
    </section>
  );
}
