import '@/styles/globals.css';
import ClientLayout from '@/components/layout/ClientLayout';

export const metadata = {
  title: 'ASP Technologies | Engineering Tomorrow\'s Electronics',
  description: 'Professional PCB Design, PCB Layout, Hardware Design, and Electronic Product Development services. Precision engineering for automotive, medical, IoT, and aerospace industries.',
  keywords: 'PCB Design, PCB Layout, Hardware Design, Electronic Product Development, High-Speed PCB, RF Design, Chennai',
  openGraph: {
    title: 'ASP Technologies | Engineering Tomorrow\'s Electronics',
    description: 'Professional PCB Design and Electronic Product Development services.',
    type: 'website',
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <ClientLayout>{children}</ClientLayout>
      </body>
    </html>
  );
}
