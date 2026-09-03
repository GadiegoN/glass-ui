import { createContext, useContext } from 'react';
import { GlassContextValue } from '../engine/types';

export const GlassContext = createContext<GlassContextValue>({
  theme: 'dark',
  material: 'frosted',
  intensity: 'medium',
  reducedMotion: false,
  performanceMode: false,
});

export function useGlassContext() {
  return useContext(GlassContext);
}
