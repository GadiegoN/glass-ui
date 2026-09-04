import React from 'react';

export type GlassMaterial =
  | 'frosted'
  | 'crystal'
  | 'liquid'
  | 'smoked'
  | 'milky'
  | 'iridescent'
  | 'clear'
  | 'tinted';

export type GlassDepth = 0 | 1 | 2 | 3 | 4;

export type GlassTint =
  | 'neutral'
  | 'slate'
  | 'blue'
  | 'purple'
  | 'emerald'
  | 'amber'
  | 'rose'
  | 'cyan'
  | string;

export type GlassBorder = 'none' | 'subtle' | 'specular' | 'glow' | 'double';

export type GlassNoise = boolean | 'subtle' | 'medium' | 'grainy';

export type GlassBlur = 'none' | 'sm' | 'md' | 'lg' | 'xl' | '2xl' | number;

export interface MaterialRecipe {
  blur: number; // in px
  opacity: number; // 0 to 1
  saturation: number; // multiplier e.g. 1.8 (180%)
  brightness: number; // multiplier e.g. 1.05
  contrast: number; // multiplier e.g. 1.05
  borderOpacity: number; // 0 to 1
  highlightOpacity: number; // top edge specular shine
  innerShadow: string;
  refractionGlow?: string;
  defaultTint?: string;
}

export interface DepthRecipe {
  shadow: string;
  borderWidth: number;
  highlightIntensity: number;
  elevationBlurAdd: number;
  elevationOpacityMod: number;
}

export type GlassRounded = 'none' | 'sm' | 'md' | 'lg' | 'xl' | '2xl' | '3xl' | 'full' | string | number;

export interface GlassProps extends React.HTMLAttributes<HTMLDivElement> {
  as?: React.ElementType;
  material?: GlassMaterial;
  depth?: GlassDepth;
  blur?: GlassBlur;
  opacity?: number;
  tint?: GlassTint;
  saturation?: number;
  brightness?: number;
  border?: GlassBorder;
  specular?: boolean;
  interactiveLight?: boolean;
  noise?: GlassNoise;
  glow?: boolean | string;
  rounded?: GlassRounded;
  elevation?: number;
  disabled?: boolean;
  children?: React.ReactNode;
}

export type GlassStyleProps = Pick<
  GlassProps,
  | 'material'
  | 'depth'
  | 'blur'
  | 'opacity'
  | 'tint'
  | 'saturation'
  | 'brightness'
  | 'border'
  | 'specular'
  | 'interactiveLight'
  | 'noise'
  | 'glow'
  | 'rounded'
>;


export interface GlassContextValue {
  theme: 'dark' | 'light' | 'system';
  material: GlassMaterial;
  intensity: 'subtle' | 'medium' | 'high';
  reducedMotion: boolean;
  performanceMode: boolean;
  updateTheme?: (theme: 'dark' | 'light' | 'system') => void;
}
