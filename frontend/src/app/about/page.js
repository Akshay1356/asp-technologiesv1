'use client';

import { AnimatedSection } from '@/components/ui';
import CTASection from '@/components/sections/CTASection';

export default function AboutPage() {
  return (
    <>
      <section className="relative pt-32 pb-20">
        <div className="container-max px-6">
          <AnimatedSection>
            <div className="text-center max-w-4xl mx-auto mb-16">
              <span className="text-xs font-mono uppercase tracking-[0.2em] text-primary mb-4 block">About Us</span>
              <h1 className="text-5xl md:text-6xl font-bold text-white mb-6">About ASP Technologies</h1>
              <p className="text-lg text-graphite-400 leading-relaxed">
                We are a team of passionate engineers dedicated to delivering excellence in PCB design and electronic product development.
              </p>
            </div>
          </AnimatedSection>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-24">
            <AnimatedSection>
              <h2 className="text-3xl font-bold text-white mb-6">Our Story</h2>
              <div className="space-y-4 text-graphite-400 leading-relaxed">
                <p>Founded in Chennai, ASP Technologies has grown from a small PCB design studio to a comprehensive electronic product development company serving clients worldwide.</p>
                <p>With over 12 years of experience and 250+ successful projects, we have built a reputation for technical excellence, reliability, and innovation in the electronics industry.</p>
                <p>Our team of experienced engineers brings deep expertise in PCB design, hardware development, signal integrity analysis, and manufacturing support, ensuring that every project meets the highest standards of quality.</p>
              </div>
            </AnimatedSection>
            <AnimatedSection delay={0.2}>
              <div className="card h-80 flex items-center justify-center bg-gradient-to-br from-graphite-800 to-graphite-900">
                <div className="text-center">
                  <svg width="80" height="80" viewBox="0 0 36 36" fill="none" className="mx-auto mb-4 opacity-30">
                    <rect x="2" y="2" width="32" height="32" rx="8" stroke="#0A84FF" strokeWidth="1.5" />
                    <path d="M10 18L18 10L26 18L18 26Z" stroke="#0A84FF" strokeWidth="1.5" />
                  </svg>
                  <div className="text-xs font-mono text-graphite-500">ASP Technologies · Est. 2014</div>
                </div>
              </div>
            </AnimatedSection>
          </div>

          <AnimatedSection>
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-white mb-4">Our Leadership</h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[
                { name: 'M. Parthiban', role: 'Founder & CEO', desc: '15+ years in PCB design and hardware engineering. Visionary leader driving technical excellence.' },
                { name: 'K. Rajesh', role: 'Head of Engineering', desc: 'Expert in high-speed PCB design and signal integrity. Leads our technical team.' },
                { name: 'S. Priya', role: 'Operations Director', desc: 'Ensures seamless project delivery and client satisfaction across all engagements.' },
              ].map((person, i) => (
                <AnimatedSection key={person.name} delay={i * 0.1}>
                  <div className="card text-center group">
                    <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-primary/20 to-accent/20 mx-auto mb-4 flex items-center justify-center text-2xl font-bold text-primary">
                      {person.name[0]}
                    </div>
                    <h3 className="text-lg font-semibold text-white mb-1">{person.name}</h3>
                    <div className="text-xs text-primary font-mono mb-3">{person.role}</div>
                    <p className="text-sm text-graphite-400">{person.desc}</p>
                  </div>
                </AnimatedSection>
              ))}
            </div>
          </AnimatedSection>
        </div>
      </section>
      <CTASection />
    </>
  );
}
