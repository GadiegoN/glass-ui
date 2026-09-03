import { GlassProps, GlassContextValue } from './types';
import { MATERIAL_RECIPES } from './presets';
import { DEPTH_RECIPES } from './depth';
import { NOISE_PATTERNS } from './noise';

export function resolveGlassStyles(
  props: GlassProps,
  context?: GlassContextValue
): {
  style: React.CSSProperties;
  noiseBg?: string;
  hasInteractiveLight: boolean;
} {
  const material = props.material || context?.material || 'frosted';
  const depth = props.depth ?? 1;
  const isDark = context?.theme !== 'light';

  const recipe = MATERIAL_RECIPES[material] || MATERIAL_RECIPES.frosted;
  const depthRecipe = DEPTH_RECIPES[depth] || DEPTH_RECIPES[1];

  // Calculate blur
  let blurVal = recipe.blur + depthRecipe.elevationBlurAdd;
  if (typeof props.blur === 'number') {
    blurVal = props.blur;
  } else if (props.blur) {
    const blurMap: Record<string, number> = {
      none: 0,
      sm: 6,
      md: 14,
      lg: 24,
      xl: 36,
      '2xl': 50,
    };
    if (blurMap[props.blur] !== undefined) {
      blurVal = blurMap[props.blur];
    }
  }

  // Calculate opacity
  let baseOpacity = recipe.opacity + depthRecipe.elevationOpacityMod;
  if (!isDark && props.opacity === undefined) {
    // In light mode, glass requires higher opacity (0.70 to 0.88) to create clear surface separation and contrast
    baseOpacity = Math.min(Math.max(baseOpacity * 4.0, 0.70), 0.88);
  }
  let opacityVal = props.opacity !== undefined ? props.opacity : Math.min(baseOpacity, 0.95);

  // Saturation & Brightness
  const satVal = props.saturation !== undefined ? props.saturation : recipe.saturation;
  const briVal = props.brightness !== undefined ? props.brightness : recipe.brightness;
  const conVal = recipe.contrast;

  // Tint resolution
  let tintColor = '255, 255, 255';
  if (!isDark) {
    tintColor = '255, 255, 255';
  } else if (material === 'smoked') {
    tintColor = '15, 18, 26';
  }

  if (props.tint) {
    const tintPalette: Record<string, string> = {
      neutral: isDark ? '255, 255, 255' : '245, 248, 255',
      slate: isDark ? '148, 163, 184' : '203, 213, 225',
      blue: '59, 130, 246',
      purple: '168, 85, 247',
      emerald: '16, 185, 129',
      amber: '245, 158, 11',
      rose: '244, 63, 94',
      cyan: '6, 182, 212',
    };
    if (tintPalette[props.tint]) {
      tintColor = tintPalette[props.tint];
    }
  }

  // Border & specular
  const borderOpacity = Math.min(recipe.borderOpacity * (1 + depth * 0.15), 0.8);
  const borderColor = isDark
    ? `rgba(${tintColor}, ${borderOpacity})`
    : `rgba(100, 116, 139, ${Math.max(borderOpacity * 0.5, 0.18)})`;

  // Highlight intensity for specular light edge
  const highlightAlpha = depthRecipe.highlightIntensity * recipe.highlightOpacity;

  // Radius mapping
  const radiusMap: Record<string, string> = {
    none: '0px',
    sm: '6px',
    md: '12px',
    lg: '16px',
    xl: '24px',
    '2xl': '32px',
    '3xl': '40px',
    full: '9999px',
  };
  const borderRadius =
    typeof props.rounded === 'number'
      ? `${props.rounded}px`
      : radiusMap[props.rounded || 'lg'] || props.rounded || '16px';

  // Noise selection
  let noiseBg: string | undefined;
  if (props.noise === true || props.noise === 'subtle') {
    noiseBg = NOISE_PATTERNS.subtle;
  } else if (props.noise === 'medium') {
    noiseBg = NOISE_PATTERNS.medium;
  } else if (props.noise === 'grainy') {
    noiseBg = NOISE_PATTERNS.grainy;
  }

  // Glow shadow
  let extraShadow = '';
  if (props.glow === true && recipe.refractionGlow) {
    extraShadow = `, ${recipe.refractionGlow}`;
  } else if (typeof props.glow === 'string') {
    extraShadow = `, 0 0 30px ${props.glow}`;
  }

  const computedShadow = isDark
    ? `${depthRecipe.shadow}, ${recipe.innerShadow}${extraShadow}`
    : `${depthRecipe.shadow.replace(/rgba\(0,\s*0,\s*0,/g, 'rgba(71, 85, 105,')}, inset 0 1px 1px 0 rgba(255, 255, 255, 0.95), inset 0 -1px 2px 0 rgba(0, 0, 0, 0.05)${extraShadow}`;

  const baseStyle: React.CSSProperties = {
    backgroundColor: `rgba(${tintColor}, ${opacityVal})`,
    backdropFilter: blurVal > 0 ? `blur(${blurVal}px) saturate(${satVal * 100}%) brightness(${briVal * 100}%) contrast(${conVal * 100}%)` : undefined,
    WebkitBackdropFilter: blurVal > 0 ? `blur(${blurVal}px) saturate(${satVal * 100}%) brightness(${briVal * 100}%) contrast(${conVal * 100}%)` : undefined,
    boxShadow: computedShadow,
    borderColor: props.border === 'none' ? 'transparent' : borderColor,
    borderWidth: props.border === 'none' ? '0px' : `${depthRecipe.borderWidth}px`,
    borderStyle: 'solid',
    borderRadius,
    // Custom CSS Variables exposed for CSS inheritance
    ['--glass-blur' as any]: `${blurVal}px`,
    ['--glass-opacity' as any]: `${opacityVal}`,
    ['--glass-specular-alpha' as any]: `${highlightAlpha}`,
    ['--glass-tint' as any]: `rgb(${tintColor})`,
    ...props.style,
  };

  return {
    style: baseStyle,
    noiseBg,
    hasInteractiveLight: props.interactiveLight ?? (depth >= 2),
  };
}
