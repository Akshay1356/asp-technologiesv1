'use client';

import { motion } from 'framer-motion';
import { AnimatedSection, AnimatedCard } from '@/components/ui';
import CTASection from '@/components/sections/CTASection';

const services = [
  { title: 'PCB Layout Design', desc: 'High-quality PCB layouts optimized for signal integrity, thermal management, and manufacturability. Our expert layout engineers use industry-leading tools to create designs that meet the most demanding specifications.', features: ['Multi-layer routing up to 32 layers', 'High-density interconnect (HDI)', 'Impedance-controlled routing', 'Differential pair routing', 'Length matching and tuning', 'Thermal via arrays'] },
  { title: 'Multi-layer PCB Design', desc: 'Complex multi-layer board designs with advanced stackup planning and material selection. We design boards that balance performance, reliability, and cost-effectiveness.', features: ['4 to 32+ layer stackups', 'Blind, buried, and microvias', 'Sequential lamination', 'Mixed-material stackups', 'Embedded components', 'Rigid-flex designs'] },
  { title: 'High-Speed PCB Design', desc: 'High-speed digital designs with controlled impedance, minimized crosstalk, and optimized signal integrity for demanding applications.', features: ['DDR4/DDR5 memory interfaces', 'PCIe Gen4/Gen5 layouts', 'SerDes channels up to 112Gbps', 'USB 3.2/4 and HDMI 2.1', 'Ethernet 10G/25G/100G', 'Clock distribution networks'] },
  { title: 'RF PCB Design', desc: 'Specialized RF circuit board design with precise impedance control, isolation, and EMI/EMC compliance for wireless applications.', features: ['Antenna matching networks', 'RF front-end modules', 'Power amplifier design', 'Low-noise amplifier design', 'Filter design and integration', 'EMI shielding and isolation'] },
  { title: 'Schematic Capture', desc: 'Professional schematic design with hierarchical block diagrams, comprehensive BOM generation, and design documentation.', features: ['Multi-page hierarchical schematics', 'Automated BOM generation', 'Netlist export (Allegro, Altium, PADS)', 'Component selection support', 'Design variants management', 'PDF and HTML documentation'] },
  { title: 'PCB Library Creation', desc: 'Custom PCB footprint and symbol libraries built to IPC standards with 3D step models for accurate mechanical integration.', features: ['IPC-7351 compliant footprints', '3D step model generation', 'Symbol-to-footprint cross-referencing', 'Automated footprint validation', 'Component parameter management', 'Library lifecycle management'] },
  { title: 'Design Rule Verification', desc: 'Comprehensive DRC checks ensuring your design is manufacturing-ready with electrical and physical verification.', features: ['Electrical rule checking (ERC)', 'Manufacturing DRC', 'DFM analysis and optimization', 'DFA (Design for Assembly) checks', 'Thermal analysis', 'Signal integrity pre-layout checks'] },
  { title: 'SI/PI Analysis', desc: 'Signal and power integrity simulation to ensure reliable operation at high speeds with clean power delivery.', features: ['Eye diagram analysis', 'Time-domain reflectometry (TDR)', 'Power plane impedance analysis', 'Decoupling capacitor optimization', 'IR drop analysis', 'Crosstalk and coupling analysis'] },
  { title: 'Gerber Generation', desc: 'Industry-standard Gerber file generation with comprehensive fabrication and assembly documentation.', features: ['RS-274X Gerber format', 'ODB++ and IPC-2581 export', 'NC drill and rout files', 'Pick-and-place files', 'Fabrication drawing generation', 'Assembly drawing generation'] },
  { title: 'Manufacturing Support', desc: 'End-to-end manufacturing support from prototype fabrication to volume production with quality assurance.', features: ['PCB fabrication coordination', 'Assembly process support', 'Testing and validation', 'Quality control documentation', 'Supply chain management', 'Production ramp-up support'] },
  { title: 'Reverse Engineering', desc: 'Professional PCB reverse engineering services to recreate designs, extract schematics, and generate documentation.', features: ['Netlist extraction', 'Schematic recreation', 'BOM generation and verification', 'Gerber file extraction', '3D scanning and modeling', 'Design documentation'] },
  { title: 'Hardware Product Design', desc: 'Complete hardware product development services from concept through production, including industrial design and prototyping.', features: ['Concept development', 'Industrial design integration', 'Rapid prototyping', 'Design for manufacturing (DFM)', 'Regulatory compliance', 'Production transition support'] },
];

export default function ServicesPage() {
  return (
    <>
      <section className="relative pt-32 pb-20 overflow-hidden">
        <div className="absolute inset-0 bg-blueprint opacity-[0.02]" />
        <div className="container-max px-6">
          <AnimatedSection>
            <div className="text-center max-w-4xl mx-auto mb-16">
              <span className="text-xs font-mono uppercase tracking-[0.2em] text-primary mb-4 block">Our Expertise</span>
              <h1 className="text-5xl md:text-6xl font-bold text-white mb-6">Engineering Services</h1>
              <p className="text-lg text-graphite-400 leading-relaxed">
                Comprehensive PCB design and electronic engineering solutions from concept to production.
                Our team brings decades of combined experience to every project.
              </p>
            </div>
          </AnimatedSection>

          <div className="space-y-24">
            {services.map((service, i) => (
              <AnimatedSection key={service.title} delay={i * 0.1}>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                  <div className={i % 2 === 0 ? 'lg:order-1' : 'lg:order-2'}>
                    <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center mb-6">
                      <span className="text-3xl text-primary font-bold">{String(i + 1).padStart(2, '0')}</span>
                    </div>
                    <h2 className="text-3xl font-bold text-white mb-4">{service.title}</h2>
                    <p className="text-graphite-400 leading-relaxed mb-6">{service.desc}</p>
                    <div className="grid grid-cols-2 gap-3">
                      {service.features.map((f) => (
                        <div key={f} className="flex items-center gap-2 text-sm text-graphite-300">
                          <span className="w-1.5 h-1.5 rounded-full bg-primary shrink-0" />
                          {f}
                        </div>
                      ))}
                    </div>
                  </div>
                  <div className={i % 2 === 0 ? 'lg:order-2' : 'lg:order-1'}>
                    <div className="card h-80 flex items-center justify-center bg-gradient-to-br from-graphite-800 to-graphite-900 overflow-hidden">
                      <div className="text-center">
                        <svg width="80" height="80" viewBox="0 0 80 80" fill="none" className="mx-auto mb-4 opacity-30">
                          <rect x="2" y="2" width="76" height="76" rx="12" stroke="#0A84FF" strokeWidth="1" />
                          <path d="M20 40L40 20L60 40L40 60Z" stroke="#0A84FF" strokeWidth="1" />
                          <line x1="30" y1="30" x2="50" y2="50" stroke="#00E5FF" strokeWidth="0.5" />
                          <line x1="50" y1="30" x2="30" y2="50" stroke="#00E5FF" strokeWidth="0.5" />
                        </svg>
                        <div className="text-xs font-mono text-graphite-500">{service.title}</div>
                      </div>
                    </div>
                  </div>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>
      <CTASection />
    </>
  );
}
