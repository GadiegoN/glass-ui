'use client';

import React, { forwardRef } from 'react';
import { GlassProps } from '../engine/types';
import { resolveGlassStyles } from '../engine/css-vars';
import { useGlassContext } from '../hooks/useGlassContext';
import { useGlassLightReflect } from '../hooks/useGlassLightReflect';
import { cn } from '../utils/cn';

export const Glass = forwardRef<HTMLDivElement, GlassProps>(
  (
    {
      as: Component = 'div',
      material,
      depth = 1,
      blur,
      opacity,
      tint,
      saturation,
      brightness,
      border = 'subtle',
      specular = true,
      interactiveLight,
      noise = 'subtle',
      glow = false,
      rounded = 'lg',
      className,
      style,
      children,
      ...props
    },
    forwardedRef
  ) => {
    const context = useGlassContext();
    const { ref: internalRef, reflect, handlers } = useGlassLightReflect();

    const { style: computedStyle, noiseBg, hasInteractiveLight } = resolveGlassStyles(
      {
        material,
        depth,
        blur,
        opacity,
        tint,
        saturation,
        brightness,
        border,
        specular,
        interactiveLight,
        noise,
        glow,
        rounded,
        style,
      },
      context
    );

    // Merge refs
    const setRefs = (node: HTMLDivElement | null) => {
      internalRef.current = node;
      if (typeof forwardedRef === 'function') {
        forwardedRef(node);
      } else if (forwardedRef) {
        (forwardedRef as React.MutableRefObject<HTMLDivElement | null>).current = node;
      }
    };

    const isLightActive = hasInteractiveLight && reflect.isHovered;

    const dynamicSheenStyle: React.CSSProperties = {
      ['--reflect-x' as any]: `${reflect.x}%`,
      ['--reflect-y' as any]: `${reflect.y}%`,
    };

    return (
      <Component
        ref={setRefs}
        className={cn('glass-primitive', className)}
        style={computedStyle}
        {...(hasInteractiveLight ? handlers : {})}
        {...props}
      >
        {/* Top edge specular highlight simulating refraction */}
        {specular && border !== 'none' && <div className="glass-specular-edge" />}

        {/* Dynamic interactive light sheen */}
        {hasInteractiveLight && (
          <div
            className={cn('glass-interactive-sheen', isLightActive && 'is-active')}
            style={dynamicSheenStyle}
          />
        )}

        {/* Procedural micro-texture noise layer */}
        {noiseBg && (
          <div
            className="glass-noise-layer"
            style={{ backgroundImage: noiseBg }}
          />
        )}

        {children}
      </Component>
    );
  }
);

Glass.displayName = 'Glass';
