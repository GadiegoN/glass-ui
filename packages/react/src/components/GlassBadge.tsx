'use client';

import React, { forwardRef } from 'react';
import { Glass } from '../primitives/Glass';
import { GlassProps } from '../engine/types';
import { cn } from '../utils/cn';

export interface GlassBadgeProps extends GlassProps {
  variant?: 'default' | 'success' | 'warning' | 'error' | 'info' | 'purple';
  size?: 'sm' | 'md' | 'lg';
  dot?: boolean;
}

export const GlassBadge = forwardRef<HTMLDivElement, GlassBadgeProps>(
  (
    {
      variant = 'default',
      size = 'md',
      dot = false,
      className,
      children,
      material = 'crystal',
      depth = 1,
      ...props
    },
    ref
  ) => {
    const sizeClasses = {
      sm: 'px-2 py-0.5 text-xs',
      md: 'px-2.5 py-1 text-xs font-medium',
      lg: 'px-3.5 py-1.5 text-sm font-medium',
    };

    const variantStyles: Record<string, { tint: string; dotColor: string; opacity: number }> = {
      default: { tint: 'neutral', dotColor: 'bg-white/80', opacity: 0.18 },
      success: { tint: 'emerald', dotColor: 'bg-emerald-400', opacity: 0.25 },
      warning: { tint: 'amber', dotColor: 'bg-amber-400', opacity: 0.25 },
      error: { tint: 'rose', dotColor: 'bg-rose-400', opacity: 0.25 },
      info: { tint: 'blue', dotColor: 'bg-blue-400', opacity: 0.25 },
      purple: { tint: 'purple', dotColor: 'bg-purple-400', opacity: 0.25 },
    };

    const currentVariant = variantStyles[variant] || variantStyles.default;

    return (
      <Glass
        ref={ref}
        material={material}
        depth={depth}
        tint={currentVariant.tint}
        opacity={currentVariant.opacity}
        rounded="full"
        className={cn(
          'inline-flex items-center gap-1.5 select-none text-white/90 tracking-wide',
          sizeClasses[size],
          className
        )}
        {...props}
      >
        {dot && (
          <span
            className={cn('w-1.5 h-1.5 rounded-full animate-pulse', currentVariant.dotColor)}
          />
        )}
        {children}
      </Glass>
    );
  }
);

GlassBadge.displayName = 'GlassBadge';
