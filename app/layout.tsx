import type { Metadata } from 'next';
import './globals.css';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import ParticlesBackground from '@/components/layout/ParticlesBackground';

export const metadata: Metadata = {
  title: 'RetroPal - Nostalgic Games Platform',
  description: 'Relive the golden age of gaming with our collection of nostalgic browser games. No downloads, no installs - just pure arcade fun.',
  keywords: ['games', 'arcade', 'retro', 'nostalgic', 'browser games', 'platformer'],
  authors: [{ name: 'RetroPal' }],
  openGraph: {
    title: 'RetroPal - Nostalgic Games Platform',
    description: 'Relive the golden age of gaming with our collection of nostalgic browser games.',
    type: 'website',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="min-h-screen flex flex-col bg-arcade-bg">
        {/* Particles Background */}
        <ParticlesBackground />

        {/* Grid Background */}
        <div className="fixed inset-0 grid-bg pointer-events-none z-0" />

        {/* Navigation */}
        <Navbar />

        {/* Main Content */}
        <main className="flex-1 pt-16 relative z-10">
          {children}
        </main>

        {/* Footer */}
        <Footer />
      </body>
    </html>
  );
}
