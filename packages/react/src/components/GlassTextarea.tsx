'use client';

import React, { forwardRef } from 'react';
import { Glass } from '../primitives/Glass';
import { GlassStyleProps } from '../engine/types';
import { cn } from '../utils/cn';

export interface GlassTextareaProps
  extends React.TextareaHTMLAttributes<HTMLTextAreaElement>,
    GlassStyleProps {}

export const GlassTextarea = forwardRef<HTMLTextAreaElement, GlassTextareaProps>(
  (
    {
      className,
      disabled,
      material = 'frosted',
      depth = 0,
      opacity = 0.12,
      rounded = 'xl',
      rows = 4,
      ...props
    },
    ref
  ) => {
    return (
      <Glass
        material={material}
        depth={depth}
        opacity={opacity}
        rounded={rounded}
        className={cn(
          'p-3 group relative flex transition-all duration-200',
          'focus-within:ring-2 focus-within:ring-white/40 focus-within:bg-white/[0.18]',
          disabled && 'opacity-50 cursor-not-allowed',
          className
        )}
      >
        <textarea
          ref={ref}
          rows={rows}
          disabled={disabled}
          className="w-full bg-transparent text-white placeholder-white/40 outline-none select-text resize-y text-sm"
          {...props}
        />
      </Glass>
    );
  }
);

GlassTextarea.displayName = 'GlassTextarea';
