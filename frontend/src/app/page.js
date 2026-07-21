import Hero from '@/components/sections/Hero';
import AboutSection from '@/components/sections/AboutSection';
import ServicesSection from '@/components/sections/ServicesSection';
import IndustriesSection from '@/components/sections/IndustriesSection';
import ProcessTimeline from '@/components/sections/ProcessTimeline';
import ProjectsSection from '@/components/sections/ProjectsSection';
import CTASection from '@/components/sections/CTASection';

export default function HomePage() {
  return (
    <>
      <Hero />
      <AboutSection />
      <ServicesSection />
      <IndustriesSection />
      <ProcessTimeline />
      <ProjectsSection />
      <CTASection />
    </>
  );
}
