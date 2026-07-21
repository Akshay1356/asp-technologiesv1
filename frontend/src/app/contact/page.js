'use client';

import { useState } from 'react';
import { AnimatedSection } from '@/components/ui';
import { siteConfig } from '@/lib/utils';
import toast from 'react-hot-toast';
import axios from 'axios';
import { FiMail, FiPhone, FiMapPin, FiClock } from 'react-icons/fi';

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '', email: '', company: '', phone: '', projectType: '', message: ''
  });
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      await axios.post(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api'}/contact`, formData);
      toast.success('Message sent successfully! We will get back to you soon.');
      setFormData({ name: '', email: '', company: '', phone: '', projectType: '', message: '' });
    } catch (err) {
      toast.error('Failed to send message. Please try again.');
    }
    setSubmitting(false);
  };

  return (
    <>
      <section className="relative pt-32 pb-20">
        <div className="container-max px-6">
          <AnimatedSection>
            <div className="text-center max-w-4xl mx-auto mb-16">
              <span className="text-xs font-mono uppercase tracking-[0.2em] text-primary mb-4 block">Get In Touch</span>
              <h1 className="text-5xl md:text-6xl font-bold text-white mb-6">Contact Us</h1>
              <p className="text-lg text-graphite-400 leading-relaxed">
                Ready to start your next project? Reach out and our team will respond within 24 hours.
              </p>
            </div>
          </AnimatedSection>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <AnimatedSection>
              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="grid grid-cols-2 gap-5">
                  <input
                    type="text"
                    placeholder="Your Name *"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full px-4 py-3.5 rounded-xl bg-graphite-800 border border-graphite-700 text-white placeholder-graphite-500 focus:border-primary focus:outline-none transition-colors"
                  />
                  <input
                    type="email"
                    placeholder="Email *"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full px-4 py-3.5 rounded-xl bg-graphite-800 border border-graphite-700 text-white placeholder-graphite-500 focus:border-primary focus:outline-none transition-colors"
                  />
                </div>
                <div className="grid grid-cols-2 gap-5">
                  <input
                    type="text"
                    placeholder="Company"
                    value={formData.company}
                    onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                    className="w-full px-4 py-3.5 rounded-xl bg-graphite-800 border border-graphite-700 text-white placeholder-graphite-500 focus:border-primary focus:outline-none transition-colors"
                  />
                  <input
                    type="tel"
                    placeholder="Phone"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="w-full px-4 py-3.5 rounded-xl bg-graphite-800 border border-graphite-700 text-white placeholder-graphite-500 focus:border-primary focus:outline-none transition-colors"
                  />
                </div>
                <select
                  value={formData.projectType}
                  onChange={(e) => setFormData({ ...formData, projectType: e.target.value })}
                  className="w-full px-4 py-3.5 rounded-xl bg-graphite-800 border border-graphite-700 text-graphite-400 focus:border-primary focus:outline-none transition-colors"
                >
                  <option value="">Select Project Type</option>
                  <option value="PCB Layout">PCB Layout Design</option>
                  <option value="Schematic">Schematic Capture</option>
                  <option value="High-Speed">High-Speed PCB Design</option>
                  <option value="RF">RF PCB Design</option>
                  <option value="Hardware">Hardware Product Design</option>
                  <option value="Reverse">Reverse Engineering</option>
                  <option value="Other">Other</option>
                </select>
                <textarea
                  placeholder="Tell us about your project *"
                  required
                  rows={5}
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  className="w-full px-4 py-3.5 rounded-xl bg-graphite-800 border border-graphite-700 text-white placeholder-graphite-500 focus:border-primary focus:outline-none transition-colors resize-none"
                />
                <button type="submit" disabled={submitting} className="btn-primary w-full py-4">
                  {submitting ? 'Sending...' : 'Send Message'}
                </button>
              </form>
            </AnimatedSection>

            <AnimatedSection delay={0.2}>
              <div className="space-y-6">
                <div className="card">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center shrink-0">
                      <FiMail className="text-primary" size={20} />
                    </div>
                    <div>
                      <h3 className="text-sm font-semibold text-white mb-1">Email</h3>
                      <a href={`mailto:${siteConfig.email}`} className="text-graphite-400 hover:text-primary transition-colors text-sm">
                        {siteConfig.email}
                      </a>
                    </div>
                  </div>
                </div>

                <div className="card">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center shrink-0">
                      <FiPhone className="text-primary" size={20} />
                    </div>
                    <div>
                      <h3 className="text-sm font-semibold text-white mb-1">Phone</h3>
                      <a href={`tel:${siteConfig.phone}`} className="text-graphite-400 hover:text-primary transition-colors text-sm">
                        {siteConfig.phone}
                      </a>
                    </div>
                  </div>
                </div>

                <div className="card">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center shrink-0">
                      <FiMapPin className="text-primary" size={20} />
                    </div>
                    <div>
                      <h3 className="text-sm font-semibold text-white mb-1">Office Address</h3>
                      <p className="text-graphite-400 text-sm leading-relaxed">
                        {siteConfig.address.street}<br />
                        {siteConfig.address.area}<br />
                        {siteConfig.address.city} {siteConfig.address.pincode}<br />
                        {siteConfig.address.state}, {siteConfig.address.country}
                      </p>
                    </div>
                  </div>
                </div>

                <div className="card">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center shrink-0">
                      <FiClock className="text-primary" size={20} />
                    </div>
                    <div>
                      <h3 className="text-sm font-semibold text-white mb-1">Business Hours</h3>
                      <p className="text-graphite-400 text-sm">
                        Monday - Friday: 9:00 AM - 6:00 PM<br />
                        Saturday: 9:00 AM - 1:00 PM
                      </p>
                    </div>
                  </div>
                </div>

                <div className="card h-48 overflow-hidden p-0">
                  <iframe
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3886.123!2d80.123!3d13.123!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMTPCsDA3JzIyLjgiTiA4MMKwMDcnMzguNCJF!5e0!3m2!1sen!2sin!4v1"
                    width="100%"
                    height="100%"
                    style={{ border: 0 }}
                    allowFullScreen
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    title="ASP Technologies Location"
                  />
                </div>
              </div>
            </AnimatedSection>
          </div>
        </div>
      </section>
    </>
  );
}
