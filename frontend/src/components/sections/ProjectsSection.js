'use client';

import Link from 'next/link';
import { AnimatedSection, AnimatedCard, MagneticButton } from '@/components/ui';
import ProjectVisual from '@/components/ui/ProjectVisual';

const projects = [
  {
    title: '12-Layer Automotive ECU',
    category: 'Automotive',
    desc: 'High-reliability ECU with ISO 26262 compliance, 12-layer HDI PCB with embedded passives.',
    image: null,
  },
  {
    title: '8-Channel Medical Monitor',
    category: 'Medical',
    desc: 'Medical-grade vital signs monitor with IEC 60601 certification and isolated channels.',
    image: null,
  },
  {
    title: '5G RF Front-End Module',
    category: 'High-Speed',
    desc: '28GHz phased array antenna module with beamforming and low-loss RF design.',
    image: null,
  },
  {
    title: 'IoT Edge Gateway',
    category: 'IoT',
    desc: 'Industrial IoT gateway with dual Ethernet, Wi-Fi 6, and cellular connectivity.',
    image: null,
  },
  {
    title: 'Consumer Smart Display',
    category: 'Consumer',
    desc: 'Touchscreen smart display with voice control, HDMI, and USB-C power delivery.',
    image: null,
  },
  {
    title: 'Aerospace Flight Controller',
    category: 'RF',
    desc: 'Certified flight controller with redundant IMU, GPS, and telemetry links.',
    image: null,
  },
];

export default function ProjectsSection() {
  return (
    <section className="relative section-padding bg-graphite-900/30">
      <div className="container-max">
        <AnimatedSection>
          <div className="text-center mb-16">
            <span className="text-xs font-mono uppercase tracking-[0.2em] text-primary mb-4 block">Our Work</span>
            <h2 className="section-title text-white mb-6">Featured Projects</h2>
            <p className="section-subtitle mx-auto text-graphite-400">
              Showcasing our expertise across industries with precision-engineered PCB solutions.
            </p>
          </div>
        </AnimatedSection>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((project, i) => (
            <AnimatedCard key={project.title} index={i}>
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
                <Link
                  href="/portfolio"
                  className="text-xs font-mono text-primary hover:text-accent transition-colors inline-flex items-center gap-2 group/link"
                >
                  View Details
                  <span className="group-hover/link:translate-x-1 transition-transform">→</span>
                </Link>
              </div>
            </AnimatedCard>
          ))}
        </div>

        <AnimatedSection delay={0.3}>
          <div className="text-center mt-12">
            <MagneticButton>
              <Link href="/portfolio" className="btn-primary">
                View Full Portfolio
              </Link>
            </MagneticButton>
          </div>
        </AnimatedSection>
      </div>
    </section>
  );
}
