'use client';

import Link from 'next/link';
import { AnimatedSection, MagneticButton } from '@/components/ui';

export default function CTASection() {
  return (
    <section className="relative section-padding overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-r from-primary/5 via-transparent to-accent/5" />
      <div className="container-max relative z-10">
        <AnimatedSection>
          <div className="card text-center max-w-4xl mx-auto p-12 md:p-16 relative overflow-hidden">
            <div className="absolute inset-0 bg-blueprint opacity-[0.03]" />
            <div className="relative z-10">
              <span className="text-xs font-mono uppercase tracking-[0.2em] text-primary mb-4 block">
                Let&apos;s Build Together
              </span>
              <h2 className="text-3xl md:text-5xl font-bold text-white mb-6">
                Ready to Start Your<br />
                <span className="text-gradient">Next Project</span>?
              </h2>
              <p className="text-graphite-400 max-w-xl mx-auto mb-8 leading-relaxed">
                From concept to production, our team of experienced engineers is ready to bring your electronic product vision to life.
              </p>
              <div className="flex flex-wrap justify-center gap-4">
                <MagneticButton>
                  <Link href="/contact" className="btn-primary text-base px-10 py-4">
                    Start Your Project
                  </Link>
                </MagneticButton>
                <MagneticButton>
                  <Link href="mailto:mp@asp-technologies.in" className="btn-secondary text-base px-10 py-4">
                    Email Us
                  </Link>
                </MagneticButton>
              </div>
              <div className="mt-8 flex items-center justify-center gap-6 text-xs text-graphite-500">
                <span>📞 {process.env.NEXT_PUBLIC_PHONE || '+91 9791005611'}</span>
                <span>✉️ mp@asp-technologies.in</span>
              </div>
            </div>
          </div>
        </AnimatedSection>
      </div>
    </section>
  );
}
