'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { AnimatedSection, AnimatedCard, MagneticButton } from '@/components/ui';
import {
  HiChip, HiCube, HiLightningBolt, HiRss, HiPencil, HiCollection,
  HiCheckCircle, HiChartBar, HiDocument, HiCog, HiSearch, HiBeaker
} from 'react-icons/hi';

const services = [
  { title: 'PCB Layout Design', icon: HiChip, desc: 'High-quality PCB layouts optimized for signal integrity and manufacturability.', features: ['Multi-layer up to 32 layers', 'High-density interconnect', 'Impedance control'] },
  { title: 'Multi-layer PCB Design', icon: HiCube, desc: 'Complex multi-layer board designs with advanced stackup planning.', features: ['Up to 32 layers', 'Blind/buried vias', 'Microvia technology'] },
  { title: 'High-Speed PCB', icon: HiLightningBolt, desc: 'High-speed digital designs with controlled impedance and length matching.', features: ['DDR memory interfaces', 'SerDes channels', 'PCIe layouts'] },
  { title: 'RF PCB Design', icon: HiRss, desc: 'RF circuit board design with impedance control and EMI/EMC compliance.', features: ['Antenna design', 'RF front-end', 'EMI shielding'] },
  { title: 'Schematic Capture', icon: HiPencil, desc: 'Professional schematic design with hierarchical block diagrams.', features: ['Multi-page schematics', 'BOM generation', 'Netlist export'] },
  { title: 'PCB Library Creation', icon: HiCollection, desc: 'Custom PCB footprint and symbol libraries per IPC standards.', features: ['IPC-compliant', '3D step models', 'Automated validation'] },
  { title: 'Design Rule Verification', icon: HiCheckCircle, desc: 'Comprehensive DRC checks ensuring manufacturing readiness.', features: ['Electrical rule check', 'Manufacturing check', 'DFM analysis'] },
  { title: 'SI/PI Analysis', icon: HiChartBar, desc: 'Signal and power integrity simulation for reliable high-speed designs.', features: ['Eye diagram analysis', 'Power plane impedance', 'Crosstalk analysis'] },
  { title: 'Gerber Generation', icon: HiDocument, desc: 'Industry-standard Gerber file generation with ODB++ support.', features: ['RS-274X format', 'ODB++ export', 'NC drill files'] },
  { title: 'Manufacturing Support', icon: HiCog, desc: 'End-to-end manufacturing support from prototype to volume production.', features: ['PCB fabrication', 'Assembly support', 'Quality testing'] },
  { title: 'Reverse Engineering', icon: HiSearch, desc: 'PCB reverse engineering with schematic recreation and BOM generation.', features: ['Netlist extraction', 'Schematic recreation', 'Component sourcing'] },
  { title: 'Hardware Product Design', icon: HiBeaker, desc: 'Complete hardware product development from concept to production.', features: ['Concept to production', 'Prototyping', 'Design for manufacturing'] },
];

export default function ServicesSection() {
  return (
    <section className="relative section-padding bg-graphite-900/30">
      <div className="container-max">
        <AnimatedSection>
          <div className="text-center mb-16">
            <span className="text-xs font-mono uppercase tracking-[0.2em] text-primary mb-4 block">Our Expertise</span>
            <h2 className="section-title text-white mb-6">Engineering Services</h2>
            <p className="section-subtitle mx-auto text-graphite-400">
              Comprehensive PCB design and electronic engineering solutions from concept to production.
            </p>
          </div>
        </AnimatedSection>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service, i) => (
            <AnimatedCard key={service.title} index={i}>
              <div className="card group h-full relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <div className="relative z-10">
                  <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors">
                    <service.icon className="text-2xl text-primary" />
                  </div>
                  <h3 className="text-lg font-semibold text-white mb-3 group-hover:text-primary transition-colors">
                    {service.title}
                  </h3>
                  <p className="text-sm text-graphite-400 mb-4 leading-relaxed">{service.desc}</p>
                  <ul className="space-y-1.5">
                    {service.features.map((f) => (
                      <li key={f} className="text-xs text-graphite-500 flex items-center gap-2">
                        <span className="w-1 h-1 rounded-full bg-primary" />
                        {f}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </AnimatedCard>
          ))}
        </div>

        <AnimatedSection delay={0.3}>
          <div className="text-center mt-12">
            <MagneticButton>
              <Link href="/services" className="btn-primary">
                View All Services
              </Link>
            </MagneticButton>
          </div>
        </AnimatedSection>
      </div>
    </section>
  );
}
