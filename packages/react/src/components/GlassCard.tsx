'use client';

import React, { forwardRef } from 'react';
import { Glass } from '../primitives/Glass';
import { GlassProps } from '../engine/types';
import { cn } from '../utils/cn';

export interface GlassCardProps extends GlassProps {
  hoverEffect?: boolean;
}

export const GlassCardRoot = forwardRef<HTMLDivElement, GlassCardProps>(
  ({ className, hoverEffect = false, depth = 1, children, ...props }, ref) => {
    return (
      <Glass
        ref={ref}
        depth={depth}
        className={cn(
          'glass-card p-6 transition-all duration-300',
          hoverEffect && 'hover:-translate-y-1 hover:shadow-2xl cursor-pointer',
          className
        )}
        {...props}
      >
        {children}
      </Glass>
    );
  }
);
GlassCardRoot.displayName = 'GlassCard';

export const GlassCardHeader = forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, children, ...props }, ref) => (
    <div ref={ref} className={cn('glass-card-header flex flex-col space-y-1.5 mb-4', className)} {...props}>
      {children}
    </div>
  )
);
GlassCardHeader.displayName = 'GlassCard.Header';

export const GlassCardTitle = forwardRef<HTMLHeadingElement, React.HTMLAttributes<HTMLHeadingElement>>(
  ({ className, children, ...props }, ref) => (
    <h3
      ref={ref}
      className={cn('glass-card-title text-xl font-semibold tracking-tight text-white/95', className)}
      {...props}
    >
      {children}
    </h3>
  )
);
GlassCardTitle.displayName = 'GlassCard.Title';

export const GlassCardDescription = forwardRef<HTMLParagraphElement, React.HTMLAttributes<HTMLParagraphElement>>(
  ({ className, children, ...props }, ref) => (
    <p ref={ref} className={cn('glass-card-description text-sm text-white/60', className)} {...props}>
      {children}
    </p>
  )
);
GlassCardDescription.displayName = 'GlassCard.Description';

export const GlassCardContent = forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, children, ...props }, ref) => (
    <div ref={ref} className={cn('glass-card-content space-y-4', className)} {...props}>
      {children}
    </div>
  )
);
GlassCardContent.displayName = 'GlassCard.Content';

export const GlassCardFooter = forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, children, ...props }, ref) => (
    <div ref={ref} className={cn('glass-card-footer flex items-center pt-4 mt-4 border-t border-white/10', className)} {...props}>
      {children}
    </div>
  )
);
GlassCardFooter.displayName = 'GlassCard.Footer';

export const GlassCard = Object.assign(GlassCardRoot, {
  Header: GlassCardHeader,
  Title: GlassCardTitle,
  Description: GlassCardDescription,
  Content: GlassCardContent,
  Footer: GlassCardFooter,
});
