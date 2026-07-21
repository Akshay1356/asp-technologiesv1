import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs) {
  return twMerge(clsx(inputs));
}

export function slugify(text) {
  return text.toLowerCase().replace(/[^\w]+/g, '-');
}

export function formatDate(date) {
  return new Date(date).toLocaleDateString('en-IN', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
}

export const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api';

export const siteConfig = {
  name: 'ASP Technologies',
  tagline: 'Engineering Tomorrow\'s Electronics',
  email: 'mp@asp-technologies.in',
  phone: '+91 9791005611',
  address: {
    street: 'No. 3, Thillai Nagar 1st Street',
    area: 'Korattur',
    city: 'Chennai',
    pincode: '600080',
    state: 'Tamil Nadu',
    country: 'India',
  },
  social: {
    linkedin: '#',
    twitter: '#',
    github: '#',
    youtube: '#',
  },
};

export const servicesList = [
  { title: 'PCB Layout Design', desc: 'High-quality PCB layouts optimized for signal integrity and manufacturability.', icon: 'CgSmartphone' },
  { title: 'Multi-layer PCB Design', desc: 'Complex multi-layer board designs up to 32 layers with advanced stackup planning.', icon: 'CgStack' },
  { title: 'High-Speed PCB', desc: 'High-speed digital designs with controlled impedance and length matching.', icon: 'CgSpeed' },
  { title: 'RF PCB Design', desc: 'RF circuit board design with impedance control and EMI/EMC compliance.', icon: 'CgRadio' },
  { title: 'Schematic Capture', desc: 'Professional schematic design with hierarchical block diagrams.', icon: 'CgPen' },
  { title: 'PCB Library Creation', desc: 'Custom PCB footprint and symbol libraries per IPC standards.', icon: 'CgLibrary' },
  { title: 'Design Rule Verification', desc: 'Comprehensive DRC checks ensuring manufacturing readiness.', icon: 'CgCheck' },
  { title: 'SI/PI Analysis', desc: 'Signal and power integrity simulation for reliable high-speed designs.', icon: 'CgChart' },
  { title: 'Gerber Generation', desc: 'Industry-standard Gerber file generation with ODB++ support.', icon: 'CgFile' },
  { title: 'Manufacturing Support', desc: 'End-to-end manufacturing support from prototype to volume production.', icon: 'CgToolbox' },
  { title: 'Reverse Engineering', desc: 'PCB reverse engineering with schematic recreation and BOM generation.', icon: 'CgSearch' },
  { title: 'Hardware Product Design', desc: 'Complete hardware product development from concept to production.', icon: 'CgDesign' },
];
