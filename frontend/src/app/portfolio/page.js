'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { AnimatedSection } from '@/components/ui';
import CTASection from '@/components/sections/CTASection';
import ProjectVisual from '@/components/ui/ProjectVisual';

const categories = ['All', 'High-Speed', 'Automotive', 'Medical', 'IoT', 'Consumer', 'RF'];

const projects = [
  { title: '12-Layer Automotive ECU', category: 'Automotive', desc: 'ISO 26262 compliant ECU with 12-layer HDI PCB, embedded passives, and automotive-grade thermal management.', client: 'Tier-1 Automotive Supplier', timeline: '16 weeks' },
  { title: '8-Channel Medical Monitor', category: 'Medical', desc: 'IEC 60601 certified vital signs monitor with isolated analog channels, touch interface, and wireless connectivity.', client: 'Medical Device Company', timeline: '20 weeks' },
  { title: '5G RF Front-End Module', category: 'High-Speed', desc: '28GHz phased array antenna module with 64-channel beamforming, low-loss RF design, and thermal management.', client: 'Telecom OEM', timeline: '24 weeks' },
  { title: 'IoT Edge Gateway', category: 'IoT', desc: 'Industrial IoT gateway with dual Ethernet, Wi-Fi 6, BLE 5.0, cellular LTE, and modular I/O expansion.', client: 'Industrial Automation Co.', timeline: '12 weeks' },
  { title: 'Consumer Smart Display', category: 'Consumer', desc: '10.1" touchscreen smart display with voice control, HDMI input, USB-C PD, and smart home integration.', client: 'Consumer Electronics Brand', timeline: '14 weeks' },
  { title: 'Aerospace Flight Controller', category: 'RF', desc: 'Certified flight controller with triple-redundant IMU, multi-band GPS, telemetry, and dual CAN bus interfaces.', client: 'Aerospace Startup', timeline: '18 weeks' },
  { title: 'Industrial Motor Drive', category: 'Automotive', desc: 'High-power BLDC motor controller with field-oriented control, current sensing, and CAN FD communication.', client: 'Industrial Equipment Mfr.', timeline: '10 weeks' },
  { title: 'Patient Monitoring Hub', category: 'Medical', desc: 'Central patient monitoring hub with 6-channel vital signs, HL7 FHIR, and HIPAA-compliant data encryption.', client: 'Hospital Systems Provider', timeline: '22 weeks' },
  { title: 'Smart Home Controller', category: 'IoT', desc: 'Zigbee/Thread smart home hub with Matter protocol support, edge computing, and voice assistant integration.', client: 'Smart Home Company', timeline: '8 weeks' },
  { title: 'USB-C Docking Station', category: 'Consumer', desc: '12-in-1 USB-C docking station with dual HDMI 2.1, 100W PD, Gigabit Ethernet, and SD card reader.', client: 'Peripherals Brand', timeline: '10 weeks' },
  { title: 'Radar Signal Processor', category: 'High-Speed', desc: 'High-speed radar signal processing board with FPGA, multi-channel ADC, and high-speed SERDES interfaces.', client: 'Defense Contractor', timeline: '30 weeks' },
  { title: 'Satellite Communication Modem', category: 'RF', desc: 'Software-defined satellite modem with S-band transceiver, LDPC coding, and adaptive modulation.', client: 'Satellite Communications Co.', timeline: '26 weeks' },
];

export default function PortfolioPage() {
  const [activeCategory, setActiveCategory] = useState('All');

  const filtered = activeCategory === 'All'
    ? projects
    : projects.filter((p) => p.category === activeCategory);

  return (
    <>
      <section className="relative pt-32 pb-20">
        <div className="container-max px-6">
          <AnimatedSection>
            <div className="text-center max-w-4xl mx-auto mb-12">
              <span className="text-xs font-mono uppercase tracking-[0.2em] text-primary mb-4 block">Our Work</span>
              <h1 className="text-5xl md:text-6xl font-bold text-white mb-6">Project Portfolio</h1>
              <p className="text-lg text-graphite-400 leading-relaxed">
                A showcase of our engineering expertise across industries and technologies.
              </p>
            </div>
          </AnimatedSection>

          <AnimatedSection delay={0.2}>
            <div className="flex flex-wrap justify-center gap-3 mb-12">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className={`px-5 py-2 rounded-xl text-sm font-medium transition-all duration-300 ${
                    activeCategory === cat
                      ? 'bg-primary text-white shadow-lg shadow-primary/20'
                      : 'bg-graphite-800 text-graphite-400 hover:text-white hover:bg-graphite-700'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </AnimatedSection>

          <AnimatePresence mode="wait">
            <motion.div
              key={activeCategory}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.4 }}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
            >
              {filtered.map((project, i) => (
                <motion.div
                  key={project.title}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.05 }}
                >
                  <div className="card group h-full overflow-hidden">
                    <div className="h-48 rounded-xl mb-6 overflow-hidden relative">
                      <ProjectVisual title={project.title} category={project.category} className="rounded-xl" />
                      <div className="absolute top-3 right-3 px-2.5 py-1 rounded-full bg-black/50 backdrop-blur-sm border border-primary/20 text-xs font-mono text-primary z-10">
                        {project.category}
                      </div>
                    </div>
                    <h3 className="text-lg font-semibold text-white mb-2 group-hover:text-primary transition-colors">
                      {project.title}
                    </h3>
                    <p className="text-sm text-graphite-400 leading-relaxed mb-4">{project.desc}</p>
                    <div className="flex items-center justify-between text-xs text-graphite-500 pt-4 border-t border-white/5">
                      <span>{project.client}</span>
                      <span>{project.timeline}</span>
                    </div>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </AnimatePresence>

          {filtered.length === 0 && (
            <div className="text-center py-20 text-graphite-500">
              No projects found in this category.
            </div>
          )}
        </div>
      </section>
      <CTASection />
    </>
  );
}
