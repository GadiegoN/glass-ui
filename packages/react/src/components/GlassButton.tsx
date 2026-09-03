'use client';

import React, { forwardRef } from 'react';
import { Glass } from '../primitives/Glass';
import { GlassStyleProps } from '../engine/types';
import { cn } from '../utils/cn';

export interface GlassButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    GlassStyleProps {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'danger';
  size?: 'sm' | 'md' | 'lg';
  isLoading?: boolean;
  children?: React.ReactNode;
}

export const GlassButton = forwardRef<HTMLButtonElement, GlassButtonProps>(
  (
    {
      variant = 'secondary',
      size = 'md',
      isLoading = false,
      disabled,
      className,
      material = 'crystal',
      depth = 1,
      children,
      ...props
    },
    ref
  ) => {
    // Size styles
    const sizeClasses = {
      sm: 'px-3 py-1.5 text-xs font-medium gap-1.5',
      md: 'px-4 py-2.5 text-sm font-medium gap-2',
      lg: 'px-6 py-3.5 text-base font-semibold gap-2.5',
    };

    // Variant overrides
    let tintOverride = props.tint;
    let opacityOverride = props.opacity;
    let depthOverride = depth;

    if (variant === 'primary') {
      tintOverride = tintOverride || 'blue';
      opacityOverride = opacityOverride ?? 0.32;
      depthOverride = 2;
    } else if (variant === 'danger') {
      tintOverride = tintOverride || 'rose';
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
        interactiveLight={!disabled && !isLoading}
        specular={variant !== 'ghost'}
        rounded="xl"
        disabled={disabled || isLoading}
        className={cn(
          'inline-flex items-center justify-center select-none cursor-pointer',
          'text-white/90 outline-none transition-all duration-200',
          'hover:text-white hover:brightness-110 active:scale-[0.98]',
          'focus-visible:ring-2 focus-visible:ring-white/40 focus-visible:ring-offset-2 focus-visible:ring-offset-black/50',
          'disabled:opacity-40 disabled:cursor-not-allowed disabled:pointer-events-none',
          sizeClasses[size],
          className
        )}
        {...(props as any)}
      >
        {isLoading && (
          <svg
            className="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
          >
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
            />
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
            />
          </svg>
        )}
        {children}
      </Glass>
    );
  }
);

GlassButton.displayName = 'GlassButton';
