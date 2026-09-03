'use client';

import React, { forwardRef } from 'react';
import { Glass } from '../primitives/Glass';
import { GlassStyleProps } from '../engine/types';
import { cn } from '../utils/cn';

export interface GlassIconButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    GlassStyleProps {
  size?: 'sm' | 'md' | 'lg' | 'xl';
  variant?: 'primary' | 'secondary' | 'ghost';
  children?: React.ReactNode;
}

export const GlassIconButton = forwardRef<HTMLButtonElement, GlassIconButtonProps>(
  (
    {
      size = 'md',
      variant = 'secondary',
      material = 'crystal',
      depth = 1,
      disabled,
      className,
      children,
      ...props
    },
    ref
  ) => {
    const sizeClasses = {
      sm: 'h-8 w-8 text-xs',
      md: 'h-10 w-10 text-sm',
      lg: 'h-12 w-12 text-base',
      xl: 'h-14 w-14 text-lg',
    };

    let opacityOverride = props.opacity;
    let tintOverride = props.tint;
    let depthOverride = depth;

    if (variant === 'primary') {
      tintOverride = tintOverride || 'blue';
      opacityOverride = opacityOverride ?? 0.35;
      depthOverride = 2;
    } else if (variant === 'ghost') {
      opacityOverride = opacityOverride ?? 0.05;
      depthOverride = 0;
    }

    return (
      <Glass
        as="button"
        ref={ref as any}
        material={material}
        depth={depthOverride}
        tint={tintOverride}
        opacity={opacityOverride}
        interactiveLight={!disabled}
        rounded="full"
        disabled={disabled}
        className={cn(
          'inline-flex items-center justify-center select-none cursor-pointer',
          'text-white/80 transition-all duration-200',
          'hover:text-white hover:brightness-110 active:scale-95',
          'focus-visible:ring-2 focus-visible:ring-white/40 outline-none',
          'disabled:opacity-40 disabled:cursor-not-allowed',
          sizeClasses[size],
          className
        )}
        {...(props as any)}
      >
        {children}
      </Glass>
    );
  }
);

GlassIconButton.displayName = 'GlassIconButton';
