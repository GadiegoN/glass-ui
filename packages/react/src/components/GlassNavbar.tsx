'use client';

import React, { forwardRef } from 'react';
import { Glass } from '../primitives/Glass';
import { GlassProps } from '../engine/types';
import { cn } from '../utils/cn';

export interface GlassNavbarProps extends GlassProps {
  isSticky?: boolean;
}

export const GlassNavbar = forwardRef<HTMLDivElement, GlassNavbarProps>(
  (
    {
      isSticky = true,
      depth = 2,
      material = 'frosted',
      rounded = 'none',
      border = 'subtle',
      className,
      children,
      ...props
    },
    ref
  ) => {
    return (
      <Glass
        as="header"
        ref={ref}
        depth={depth}
        material={material}
        rounded={rounded}
        border={border}
        className={cn(
          'w-full px-6 py-3.5 z-40 transition-all duration-300',
          isSticky && 'sticky top-0',
          className
        )}
        {...props}
      >
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          {children}
        </div>
      </Glass>
    );
  }
);

GlassNavbar.displayName = 'GlassNavbar';
