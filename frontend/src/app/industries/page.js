'use client';

import { AnimatedSection, AnimatedCard } from '@/components/ui';
import { motion } from 'framer-motion';

const industries = [
  { name: 'Automotive', desc: 'ADAS systems, infotainment, powertrain control, body electronics, and EV charging infrastructure. Our automotive PCB designs meet ISO 26262 and IATF 16949 standards.', icon: '🚗', stats: ['ISO 26262 compliant', 'AEC-Q qualified', '45+ projects delivered'] },
  { name: 'Industrial Automation', desc: 'PLC systems, motor drives, industrial IoT gateways, and process control equipment designed for harsh industrial environments.', icon: '🏭', stats: ['Industrial temperature range', 'EMC compliant', '35+ projects delivered'] },
  { name: 'Consumer Electronics', desc: 'Smart devices, wearables, home automation, audio equipment, and IoT consumer products with focus on compact form factors.', icon: '📱', stats: ['Compact HDI designs', 'Low-power optimization', '50+ projects delivered'] },
  { name: 'Medical Electronics', desc: 'Diagnostic equipment, patient monitoring, implantable devices, and laboratory instruments certified to IEC 60601 standards.', icon: '🏥', stats: ['IEC 60601 certified', 'ISO 13485 compliant', '30+ projects delivered'] },
  { name: 'IoT', desc: 'Connected devices, wireless sensors, edge computing platforms, and cloud-connected solutions with multiple wireless protocols.', icon: '🌐', stats: ['Wi-Fi/BLE/Zigbee/LTE', 'Cloud connectivity', '40+ projects delivered'] },
  { name: 'Telecom', desc: '5G infrastructure, base stations, RF equipment, networking hardware, and optical transport systems.', icon: '📡', stats: ['High-speed up to 112Gbps', 'RF expertise', '25+ projects delivered'] },
  { name: 'Aerospace', desc: 'Avionics systems, satellite communications, navigation equipment, and flight control systems meeting DO-254 standards.', icon: '✈️', stats: ['DO-254 compliant', 'Rad-hard designs', '15+ projects delivered'] },
  { name: 'Defense', desc: 'Secure communications, radar systems, electronic warfare, and ruggedized electronics for defense applications.', icon: '🛡️', stats: ['MIL-STD compliant', 'Secure designs', '20+ projects delivered'] },
  { name: 'Robotics', desc: 'Control systems, sensor fusion platforms, motor controllers, and autonomous navigation systems for industrial and service robots.', icon: '🤖', stats: ['Real-time control', 'Sensor integration', '28+ projects delivered'] },
  { name: 'Process', desc: 'Process control systems, SCADA interfaces, instrumentation, and industrial communication protocols.', icon: '⚙️', stats: ['PLC/DCS integration', 'Industrial protocols', '22+ projects delivered'] },
];

export default function IndustriesPage() {
  return (
    <section className="relative pt-32 pb-20">
      <div className="container-max px-6">
        <AnimatedSection>
          <div className="text-center max-w-4xl mx-auto mb-16">
            <span className="text-xs font-mono uppercase tracking-[0.2em] text-primary mb-4 block">Industries</span>
            <h1 className="text-5xl md:text-6xl font-bold text-white mb-6">Industries We Serve</h1>
            <p className="text-lg text-graphite-400 leading-relaxed">
              Our engineering expertise spans diverse sectors, delivering reliable PCB and hardware solutions for the most demanding applications.
            </p>
          </div>
        </AnimatedSection>

        <div className="space-y-16">
          {industries.map((ind, i) => (
            <AnimatedSection key={ind.name} delay={i * 0.05}>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
                <div className={i % 2 === 0 ? 'lg:order-1' : 'lg:order-2'}>
                  <div className="text-5xl mb-4">{ind.icon}</div>
                  <h2 className="text-3xl font-bold text-white mb-4">{ind.name}</h2>
                  <p className="text-graphite-400 leading-relaxed mb-6">{ind.desc}</p>
                  <div className="flex flex-wrap gap-3">
                    {ind.stats.map((s) => (
                      <span key={s} className="px-3 py-1.5 rounded-lg bg-primary/5 border border-primary/10 text-xs font-mono text-primary">
                        {s}
                      </span>
                    ))}
                  </div>
                </div>
                <div className={i % 2 === 0 ? 'lg:order-2' : 'lg:order-1'}>
                  <div className="card h-64 flex items-center justify-center bg-gradient-to-br from-graphite-800 to-graphite-900 overflow-hidden">
                    <div className="text-center">
                      <div className="text-6xl mb-4 opacity-30">{ind.icon}</div>
                      <div className="text-xs font-mono text-graphite-500">{ind.name} Engineering</div>
                    </div>
                  </div>
                </div>
              </div>
            </AnimatedSection>
          ))}
        </div>
      </div>
    </section>
  );
}
