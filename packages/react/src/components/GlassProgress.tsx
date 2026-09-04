'use client';

import React, { forwardRef } from 'react';
import { Glass } from '../primitives/Glass';
import { GlassMaterial } from '../engine/types';
import { cn } from '../utils/cn';

export interface GlassProgressProps extends React.HTMLAttributes<HTMLDivElement> {
  value?: number;
  max?: number;
  variant?: 'default' | 'blue' | 'purple' | 'emerald' | 'cyan' | 'amber' | 'rose' | 'gradient';
  size?: 'sm' | 'md' | 'lg';
  showValue?: boolean;
  label?: React.ReactNode;
  indeterminate?: boolean;
  striped?: boolean;
  material?: GlassMaterial;
}

export const GlassProgress = forwardRef<HTMLDivElement, GlassProgressProps>(
  (
    {
      value,
      max = 100,
      variant = 'default',
      size = 'md',
      showValue = false,
      label,
      indeterminate = false,
      striped = false,
      material = 'frosted',
      className,
      ...props
    },
    ref
  ) => {
    const isIndeterminate = indeterminate || value === undefined;
    const safeMax = max > 0 ? max : 100;
    const safeValue = typeof value === 'number' && Number.isFinite(value) ? value : 0;
    const percentage = Math.min(Math.max((safeValue / safeMax) * 100, 0), 100);

    const sizeTrackClasses = {
      sm: 'h-2',
      md: 'h-3.5',
      lg: 'h-5',
    };

    const variantGradients: Record<string, { bar: string; glow: string }> = {
      default: {
        bar: 'bg-gradient-to-r from-blue-500 to-indigo-500',
        glow: 'shadow-[0_0_12px_rgba(99,102,241,0.5)]',
      },
      blue: {
        bar: 'bg-gradient-to-r from-sky-400 to-blue-600',
        glow: 'shadow-[0_0_12px_rgba(59,130,246,0.5)]',
      },
      purple: {
        bar: 'bg-gradient-to-r from-purple-400 to-indigo-600',
        glow: 'shadow-[0_0_12px_rgba(168,85,247,0.5)]',
      },
      emerald: {
        bar: 'bg-gradient-to-r from-emerald-400 to-teal-400',
        glow: 'shadow-[0_0_12px_rgba(16,185,129,0.5)]',
      },
      cyan: {
        bar: 'bg-gradient-to-r from-cyan-400 to-blue-500',
        glow: 'shadow-[0_0_12px_rgba(6,182,212,0.5)]',
      },
      amber: {
        bar: 'bg-gradient-to-r from-amber-400 to-orange-500',
        glow: 'shadow-[0_0_12px_rgba(245,158,11,0.5)]',
      },
      rose: {
        bar: 'bg-gradient-to-r from-rose-400 to-pink-600',
        glow: 'shadow-[0_0_12px_rgba(244,63,94,0.5)]',
      },
      gradient: {
        bar: 'bg-gradient-to-r from-cyan-400 via-indigo-500 to-pink-500',
        glow: 'shadow-[0_0_16px_rgba(236,72,153,0.5)]',
      },
    };

    const currentVariant = variantGradients[variant] || variantGradients.default;

    return (
      <div ref={ref} className={cn('w-full space-y-1.5 select-none', className)} {...props}>
        {/* Header with Label and / or % Value */}
        {(label || showValue) && (
          <div className="flex items-center justify-between text-xs text-white/80 font-medium px-0.5">
            <div>{label}</div>
            {showValue && (
              <span className="font-mono text-[11px] text-white/70">
                {isIndeterminate ? '...' : `${Math.round(percentage)}%`}
              </span>
            )}
          </div>
        )}

        {/* Recessed Glass Track */}
        <Glass
          depth={0}
          material={material}
          rounded="full"
          opacity={0.16}
          className={cn(
            'relative w-full overflow-hidden border border-white/10 bg-white/[0.04] shadow-inner',
            sizeTrackClasses[size]
          )}
        >
          {/* Active Liquid Indicator */}
          <div
            role="progressbar"
            aria-valuenow={isIndeterminate ? undefined : Math.round(percentage)}
            aria-valuemin={0}
            aria-valuemax={safeMax}
            className={cn(
              'h-full rounded-full relative transition-all duration-300 ease-out overflow-hidden',
              currentVariant.bar,
              currentVariant.glow,
              isIndeterminate && 'w-1/3'
            )}
            style={{
              width: isIndeterminate ? undefined : `${percentage}%`,
              animation: isIndeterminate
                ? 'glass-progress-indeterminate 1.8s ease-in-out infinite'
                : undefined,
            }}
          >
            {/* Top edge specular light sheen */}
            <div className="absolute top-0 inset-x-0 h-[1px] bg-white/40 pointer-events-none" />

            {/* Striped optical ribbing */}
            {striped && (
              <div
                className="absolute inset-0 opacity-25 pointer-events-none"
                style={{
                  backgroundImage:
                    'linear-gradient(45deg, rgba(255,255,255,0.2) 25%, transparent 25%, transparent 50%, rgba(255,255,255,0.2) 50%, rgba(255,255,255,0.2) 75%, transparent 75%, transparent)',
                  backgroundSize: '16px 16px',
                  animation: 'glass-progress-stripes 1s linear infinite',
                }}
              />
            )}
          </div>
        </Glass>

        <style dangerouslySetInnerHTML={{
          __html: `
            @keyframes glass-progress-indeterminate {
              0% { transform: translateX(-100%); }
              50% { transform: translateX(200%); }
              100% { transform: translateX(-100%); }
            }
            @keyframes glass-progress-stripes {
              from { background-position: 16px 0; }
              to { background-position: 0 0; }
            }
          `
        }} />
      </div>
    );
  }
);

GlassProgress.displayName = 'GlassProgress';
