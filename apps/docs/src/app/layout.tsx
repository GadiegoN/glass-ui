import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Glass UI — The Definitive Glassmorphism Design System for React',
  description:
    'A high-performance, physics-driven Glassmorphism component library for React and Next.js. Treating glass as a true digital material with optical depth, refraction, specular highlights, and real-time reflection.',
  keywords: [
    'glassmorphism',
    'glass-ui',
    'react',
    'nextjs',
    'ui library',
    'design system',
    'frosted glass',
    'liquid glass',
    'crystal UI',
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark scroll-smooth">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@300;400;500;600;700;800&family=JetBrains+Mono:wght@400;500;600&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="antialiased selection:bg-blue-500/30 selection:text-white">
        {children}
      </body>
    </html>
  );
}
