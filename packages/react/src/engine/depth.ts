import { GlassDepth, DepthRecipe } from './types';

export const DEPTH_RECIPES: Record<GlassDepth, DepthRecipe> = {
  0: {
    shadow: '0 0 0 1px rgba(255, 255, 255, 0.05), inset 0 1px 2px rgba(0, 0, 0, 0.25)',
    borderWidth: 1,
    highlightIntensity: 0.15,
    elevationBlurAdd: 0,
    elevationOpacityMod: 0,
  },
  1: {
    shadow: '0 4px 20px -2px rgba(0, 0, 0, 0.25), 0 2px 6px -1px rgba(0, 0, 0, 0.15)',
    borderWidth: 1,
    highlightIntensity: 0.35,
    elevationBlurAdd: 2,
    elevationOpacityMod: 0.02,
  },
  2: {
    shadow: '0 10px 30px -4px rgba(0, 0, 0, 0.35), 0 4px 12px -2px rgba(0, 0, 0, 0.2)',
    borderWidth: 1,
    highlightIntensity: 0.5,
    elevationBlurAdd: 6,
    elevationOpacityMod: 0.04,
  },
  3: {
    shadow: '0 20px 45px -8px rgba(0, 0, 0, 0.45), 0 8px 20px -4px rgba(0, 0, 0, 0.25)',
    borderWidth: 1.2,
    highlightIntensity: 0.65,
    elevationBlurAdd: 10,
    elevationOpacityMod: 0.06,
  },
  4: {
    shadow: '0 30px 70px -12px rgba(0, 0, 0, 0.55), 0 12px 30px -6px rgba(0, 0, 0, 0.35), 0 0 1px 1px rgba(255, 255, 255, 0.15)',
    borderWidth: 1.5,
    highlightIntensity: 0.85,
    elevationBlurAdd: 16,
    elevationOpacityMod: 0.08,
  },
};
