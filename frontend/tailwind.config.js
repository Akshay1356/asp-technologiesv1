/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: '#0A84FF',
        'primary-dark': '#0066CC',
        'primary-light': '#4DA6FF',
        accent: '#00E5FF',
        'accent-dark': '#00B8D4',
        graphite: {
          50: '#F5F5F7',
          100: '#E8E8ED',
          200: '#D1D1D6',
          300: '#AEAEB2',
          400: '#8E8E93',
          500: '#636366',
          600: '#48484A',
          700: '#363639',
          800: '#2C2C2E',
          900: '#1C1C1E',
          950: '#0D0D0F',
        },
        silver: '#C0C0C8',
        'silver-light': '#E8E8F0',
        'silver-dark': '#8A8A92',
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        mono: ['JetBrains Mono', 'monospace'],
      },
      backgroundImage: {
        'blueprint': "url(\"data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%230A84FF' fill-opacity='0.03'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E\")",
        'circuit': "url(\"data:image/svg+xml,%3Csvg width='100' height='100' viewBox='0 0 100 100' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M10 10h80v80H10z' fill='none' stroke='%230A84FF' stroke-width='0.5' stroke-opacity='0.1'/%3E%3Ccircle cx='10' cy='10' r='2' fill='%2300E5FF' fill-opacity='0.2'/%3E%3Ccircle cx='90' cy='90' r='2' fill='%2300E5FF' fill-opacity='0.2'/%3E%3C/svg%3E\")",
      },
      animation: {
        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'signal-flow': 'signalFlow 2s linear infinite',
        'glow': 'glow 2s ease-in-out infinite alternate',
        'float': 'float 6s ease-in-out infinite',
        'spin-slow': 'spin 8s linear infinite',
        'draw': 'draw 2s ease forwards',
      },
      keyframes: {
        signalFlow: {
          '0%': { strokeDashoffset: '100' },
          '100%': { strokeDashoffset: '0' },
        },
        glow: {
          '0%': { boxShadow: '0 0 5px rgba(10, 132, 255, 0.5), 0 0 10px rgba(10, 132, 255, 0.3)' },
          '100%': { boxShadow: '0 0 20px rgba(10, 132, 255, 0.8), 0 0 40px rgba(0, 229, 255, 0.4)' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-20px)' },
        },
      },
    },
  },
  plugins: [],
};
