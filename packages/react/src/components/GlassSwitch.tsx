'use client';

import React, { forwardRef } from 'react';
import { Glass } from '../primitives/Glass';
import { GlassStyleProps } from '../engine/types';
import { cn } from '../utils/cn';

export interface GlassSwitchProps
  extends Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, 'onChange'>,
    GlassStyleProps {
  checked?: boolean;
  onCheckedChange?: (checked: boolean) => void;
  size?: 'sm' | 'md' | 'lg';
}

export const GlassSwitch = forwardRef<HTMLButtonElement, GlassSwitchProps>(
  (
    {
      checked = false,
      onCheckedChange,
      size = 'md',
      disabled,
      className,
      tint = 'blue',
      onClick,
      ...props
    },
    ref
  ) => {
    const handleToggle = (e: React.MouseEvent<HTMLButtonElement>) => {
      if (disabled) return;
      onCheckedChange?.(!checked);
      onClick?.(e);
    };

    const sizeStyles = {
      sm: { track: 'w-10 h-5', thumb: 'w-3.5 h-3.5', translate: 'translate-x-5' },
      md: { track: 'w-14 h-7', thumb: 'w-5 h-5', translate: 'translate-x-7' },
      lg: { track: 'w-16 h-8', thumb: 'w-6 h-6', translate: 'translate-x-8' },
    };

    const currentSize = sizeStyles[size];

    return (
      <Glass
        as="button"
        ref={ref as any}
        role="switch"
        aria-checked={checked}
        disabled={disabled}
        onClick={handleToggle}
        depth={0}
        opacity={checked ? 0.35 : 0.1}
        tint={checked ? tint : 'neutral'}
        rounded="full"
        glow={checked ? 'rgba(59, 130, 246, 0.4)' : false}
        className={cn(
          'relative inline-flex items-center p-1 cursor-pointer transition-colors duration-300 select-none outline-none',
          'focus-visible:ring-2 focus-visible:ring-white/40',
          disabled && 'opacity-40 cursor-not-allowed',
          currentSize.track,
          className
        )}
        {...(props as any)}
      >
        <Glass
          as="span"
          material="crystal"
          depth={2}
          rounded="full"
          opacity={0.85}
          className={cn(
            'inline-block transition-transform duration-300 pointer-events-none transform',
            checked ? currentSize.translate : 'translate-x-0',
            currentSize.thumb
          )}
        />
      </Glass>
    );
  }
);

GlassSwitch.displayName = 'GlassSwitch';
