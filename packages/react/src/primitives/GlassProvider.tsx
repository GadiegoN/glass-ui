'use client';

import React, { useState, useEffect, useMemo } from 'react';
import { GlassMaterial, GlassContextValue } from '../engine/types';
import { GlassContext } from '../hooks/useGlassContext';

export interface GlassProviderProps {
  theme?: 'dark' | 'light' | 'system';
  defaultMaterial?: GlassMaterial;
  intensity?: 'subtle' | 'medium' | 'high';
  performanceMode?: boolean;
  children: React.ReactNode;
}

export const GlassProvider: React.FC<GlassProviderProps> = ({
  theme: initialTheme = 'dark',
  defaultMaterial = 'frosted',
  intensity = 'medium',
  performanceMode: initialPerfMode = false,
  children,
}) => {
  const [theme, setTheme] = useState<'dark' | 'light' | 'system'>(initialTheme);
  const [reducedMotion, setReducedMotion] = useState(false);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
      setReducedMotion(mediaQuery.matches);

      const handleChange = (e: MediaQueryListEvent) => setReducedMotion(e.matches);
      mediaQuery.addEventListener('change', handleChange);
      return () => mediaQuery.removeEventListener('change', handleChange);
    }
  }, []);

  const value = useMemo<GlassContextValue>(
    () => ({
      theme,
      material: defaultMaterial,
      intensity,
      reducedMotion,
      performanceMode: initialPerfMode || reducedMotion,
      updateTheme: (newTheme) => setTheme(newTheme),
    }),
    [theme, defaultMaterial, intensity, reducedMotion, initialPerfMode]
  );

  return <GlassContext.Provider value={value}>{children}</GlassContext.Provider>;
};
