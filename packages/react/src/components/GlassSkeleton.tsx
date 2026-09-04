'use client';

import React, { forwardRef } from 'react';
import { Glass } from '../primitives/Glass';
import { GlassMaterial, GlassRounded } from '../engine/types';
import { cn } from '../utils/cn';

export interface GlassSkeletonProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: 'text' | 'circular' | 'rounded' | 'rectangular';
  width?: string | number;
  height?: string | number;
  shimmer?: boolean;
  pulse?: boolean;
  material?: GlassMaterial;
  depth?: 0 | 1 | 2;
  rounded?: GlassRounded;
}

export const GlassSkeleton = forwardRef<HTMLDivElement, GlassSkeletonProps>(
  (
    {
      variant = 'rounded',
      width,
      height,
      shimmer = true,
      pulse = false,
      material = 'crystal',
      depth = 0,
      rounded,
      className,
      style,
      ...props
    },
    ref
  ) => {
    // Determine rounded style based on variant
    const resolvedRounded: GlassRounded =
      rounded ??
      (variant === 'circular'
        ? 'full'
        : variant === 'text'
        ? 'sm'
        : variant === 'rectangular'
        ? 'none'
        : 'xl');

    const variantClasses = {
      text: 'h-4 w-full my-1.5',
      circular: 'rounded-full aspect-square',
      rounded: 'w-full h-24',
      rectangular: 'w-full h-24',
    };

    const inlineStyle: React.CSSProperties = {
      width: typeof width === 'number' ? `${width}px` : width,
      height: typeof height === 'number' ? `${height}px` : height,
      ...style,
    };

    return (
      <Glass
        ref={ref}
        material={material}
        depth={depth}
        rounded={resolvedRounded}
        opacity={0.12}
        border="subtle"
        className={cn(
          'relative overflow-hidden select-none border border-white/10 bg-white/[0.05]',
          variantClasses[variant],
          pulse && 'animate-pulse',
          className
        )}
        style={inlineStyle}
        {...props}
      >
        {shimmer && (
          <div
            className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/[0.14] to-transparent pointer-events-none"
            style={{
              animation: 'glass-skeleton-shimmer 2s cubic-bezier(0.4, 0, 0.2, 1) infinite',
            }}
          />
        )}
        <style dangerouslySetInnerHTML={{
          __html: `
            @keyframes glass-skeleton-shimmer {
              0% { transform: translateX(-100%); }
              100% { transform: translateX(100%); }
            }
          `
        }} />
      </Glass>
    );
  }
);

GlassSkeleton.displayName = 'GlassSkeleton';
