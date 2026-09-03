'use client';

import React from 'react';
import { cn } from '../utils/cn';

export interface GlassDividerProps extends React.HTMLAttributes<HTMLDivElement> {
  orientation?: 'horizontal' | 'vertical';
  glow?: boolean;
}

export const GlassDivider: React.FC<GlassDividerProps> = ({
  orientation = 'horizontal',
  glow = false,
  className,
  ...props
}) => {
  if (orientation === 'vertical') {
    return (
      <div
        className={cn(
          'w-[1px] h-full bg-gradient-to-b from-transparent via-white/20 to-transparent self-stretch',
          glow && 'shadow-[0_0_8px_rgba(255,255,255,0.4)]',
          className
        )}
        {...props}
      />
    );
  }

  return (
    <div
      className={cn(
        'w-full h-[1px] bg-gradient-to-r from-transparent via-white/20 to-transparent my-4',
        glow && 'shadow-[0_0_8px_rgba(255,255,255,0.4)]',
        className
      )}
      {...props}
    />
  );
};
