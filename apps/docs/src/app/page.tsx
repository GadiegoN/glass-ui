'use client';

import React, { useState, useEffect } from 'react';
import { Navbar } from '@/components/Navbar';
import { Hero } from '@/components/Hero';
import { StudioPlayground } from '@/components/StudioPlayground';
import { ShowcaseSection } from '@/components/ShowcaseSection';
import { ComponentCatalog } from '@/components/ComponentCatalog';
import { BackgroundSwitcher, BackgroundEnv } from '@/components/BackgroundSwitcher';
import { Footer } from '@/components/Footer';
import { GlassProvider, GlassToastProvider } from '@gadiegon/glass-ui';

export default function HomePage() {
  const [bgEnv, setBgEnv] = useState<BackgroundEnv>('aurora');
  const isLight = bgEnv === 'crystal-light';

  useEffect(() => {
    if (isLight) {
      document.documentElement.classList.remove('dark');
      document.documentElement.classList.add('light');
    } else {
      document.documentElement.classList.remove('light');
      document.documentElement.classList.add('dark');
    }
  }, [isLight]);

  const bgClasses: Record<BackgroundEnv, string> = {
    aurora: 'bg-env-aurora',
    cyberpunk: 'bg-env-cyberpunk',
    obsidian: 'bg-env-obsidian',
    nebula: 'bg-env-nebula',
    'crystal-light': 'bg-env-crystal-light',
  };

  return (
    <GlassProvider theme={isLight ? 'light' : 'dark'} key={isLight ? 'light' : 'dark'}>
      <GlassToastProvider position="bottom-right">
        <div
          className={`min-h-screen transition-colors duration-700 relative ${bgClasses[bgEnv]} ${
            isLight ? 'theme-light' : ''
          }`}
        >
          {/* Sticky Top Navigation */}
          <Navbar />

          {/* Main Content Sections */}
          <main className="space-y-12">
            <Hero />
            <StudioPlayground />
            <ShowcaseSection />
            <ComponentCatalog />
          </main>

          {/* Floating Environment Switcher */}
          <BackgroundSwitcher current={bgEnv} onChange={setBgEnv} />

          {/* Footer */}
          <Footer />
        </div>
      </GlassToastProvider>
    </GlassProvider>
  );
}
