'use client';

import React, { forwardRef } from 'react';
import { Glass } from '../primitives/Glass';
import { GlassStyleProps } from '../engine/types';
import { cn } from '../utils/cn';

export interface GlassInputProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'size'>,
    GlassStyleProps {
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  inputSize?: 'sm' | 'md' | 'lg';
}

export const GlassInput = forwardRef<HTMLInputElement, GlassInputProps>(
  (
    {
      className,
      leftIcon,
      rightIcon,
      inputSize = 'md',
      disabled,
      material = 'frosted',
      depth = 0,
      opacity = 0.12,
      rounded = 'xl',
      ...props
    },
    ref
  ) => {
    const sizeConfig = {
      sm: { height: 'h-9', text: 'text-xs' },
      md: { height: 'h-11', text: 'text-sm' },
      lg: { height: 'h-13', text: 'text-base' },
    };

    const currentSize = sizeConfig[inputSize] || sizeConfig.md;

    return (
      <Glass
        material={material}
        depth={depth}
        opacity={opacity}
        rounded={rounded}
        className={cn(
          'group relative w-full flex items-center transition-all duration-200 overflow-hidden',
          currentSize.height,
          currentSize.text,
          'focus-within:ring-2 focus-within:ring-white/40 focus-within:bg-white/[0.18]',
          disabled && 'opacity-50 cursor-not-allowed',
          className
        )}
      >
        <div className="flex items-center w-full h-full relative z-10">
          {leftIcon && (
            <div className="shrink-0 flex items-center justify-center pl-3.5 pr-1.5 text-white/50 group-focus-within:text-white/80 transition-colors pointer-events-none">
              {leftIcon}
            </div>
          )}

          <input
            ref={ref}
            disabled={disabled}
            className={cn(
              'w-full h-full bg-transparent text-white placeholder-white/40 outline-none select-text py-2',
              leftIcon ? 'pl-1.5' : 'pl-4',
              rightIcon ? 'pr-1.5' : 'pr-4'
            )}
            {...props}
          />

          {rightIcon && (
            <div className="shrink-0 flex items-center justify-center pr-3.5 pl-1.5 text-white/50 group-focus-within:text-white/80 transition-colors pointer-events-none">
              {rightIcon}
            </div>
          )}
        </div>
      </Glass>
    );
  }
);

GlassInput.displayName = 'GlassInput';
