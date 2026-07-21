'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { siteConfig } from '@/lib/utils';
import { FiMail, FiPhone, FiMapPin, FiArrowUp } from 'react-icons/fi';
import { FaLinkedin, FaTwitter, FaGithub, FaYoutube } from 'react-icons/fa';

export default function Footer() {
  const scrollToTop = () => window.scrollTo({ top: 0, behavior: 'smooth' });

  return (
    <footer className="relative bg-graphite-950 border-t border-white/5">
      <div className="container-max section-padding pb-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          <div>
            <div className="flex items-center gap-3 mb-6">
              <svg width="32" height="32" viewBox="0 0 36 36" fill="none" xmlns="http://www.w3.org/2000/svg">
                <rect x="2" y="2" width="32" height="32" rx="8" stroke="#0A84FF" strokeWidth="1.5" fill="none" />
                <path d="M10 18L18 10L26 18L18 26Z" stroke="#0A84FF" strokeWidth="1.5" fill="none" />
                <path d="M14 14L22 22M22 14L14 22" stroke="#00E5FF" strokeWidth="1" strokeLinecap="round" />
              </svg>
              <span className="text-lg font-bold text-white">ASP<span className="text-primary">.</span>TECH</span>
            </div>
            <p className="text-graphite-400 text-sm leading-relaxed mb-6">
              Engineering Tomorrow&apos;s Electronics. We deliver precision PCB design and hardware development solutions.
            </p>
            <div className="flex gap-3">
              {[
                { icon: FaLinkedin, href: siteConfig.social.linkedin },
                { icon: FaTwitter, href: siteConfig.social.twitter },
                { icon: FaGithub, href: siteConfig.social.github },
                { icon: FaYoutube, href: siteConfig.social.youtube },
              ].map((item, i) => (
                <a key={i} href={item.href} className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center text-graphite-400 hover:text-primary hover:bg-primary/10 transition-all duration-300">
                  <item.icon size={16} />
                </a>
              ))}
            </div>
          </div>

          <div>
            <h4 className="text-sm font-semibold uppercase tracking-widest text-graphite-400 mb-6">Quick Links</h4>
            <ul className="space-y-3">
              {['Services', 'Portfolio', 'Industries', 'About', 'Contact'].map((item) => (
                <li key={item}>
                  <Link href={`/${item.toLowerCase()}`} className="text-graphite-300 hover:text-primary transition-colors text-sm">
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-sm font-semibold uppercase tracking-widest text-graphite-400 mb-6">Services</h4>
            <ul className="space-y-3">
              {['PCB Layout Design', 'High-Speed PCB', 'RF PCB Design', 'Schematic Capture', 'SI/PI Analysis', 'Hardware Design'].map((item) => (
                <li key={item}>
                  <Link href="/services" className="text-graphite-300 hover:text-primary transition-colors text-sm">
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-sm font-semibold uppercase tracking-widest text-graphite-400 mb-6">Contact</h4>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <FiMail className="text-primary mt-0.5 shrink-0" size={16} />
                <a href={`mailto:${siteConfig.email}`} className="text-graphite-300 hover:text-primary transition-colors text-sm">
                  {siteConfig.email}
                </a>
              </li>
              <li className="flex items-start gap-3">
                <FiPhone className="text-primary mt-0.5 shrink-0" size={16} />
                <a href={`tel:${siteConfig.phone}`} className="text-graphite-300 hover:text-primary transition-colors text-sm">
                  {siteConfig.phone}
                </a>
              </li>
              <li className="flex items-start gap-3">
                <FiMapPin className="text-primary mt-0.5 shrink-0" size={16} />
                <span className="text-graphite-300 text-sm">
                  {siteConfig.address.street}, {siteConfig.address.area}, {siteConfig.address.city} {siteConfig.address.pincode}
                </span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-white/5 mt-12 pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-graphite-500 text-sm">
            &copy; {new Date().getFullYear()} {siteConfig.name}. All rights reserved.
          </p>
          <div className="flex items-center gap-6 text-sm text-graphite-500">
            <Link href="/privacy" className="hover:text-primary transition-colors">Privacy Policy</Link>
            <Link href="/terms" className="hover:text-primary transition-colors">Terms of Service</Link>
          </div>
          <button
            onClick={scrollToTop}
            className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center text-primary hover:bg-primary hover:text-white transition-all duration-300"
            aria-label="Scroll to top"
          >
            <FiArrowUp size={18} />
          </button>
        </div>
      </div>
    </footer>
  );
}
