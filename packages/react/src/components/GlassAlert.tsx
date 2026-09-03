'use client';

import React, { forwardRef } from 'react';
import { Glass } from '../primitives/Glass';
import { GlassProps } from '../engine/types';
import { cn } from '../utils/cn';

export interface GlassAlertProps extends GlassProps {
  variant?: 'info' | 'success' | 'warning' | 'error';
  icon?: React.ReactNode;
  title?: string;
}

export const GlassAlert = forwardRef<HTMLDivElement, GlassAlertProps>(
  (
    {
      variant = 'info',
      icon,
      title,
      className,
      children,
      material = 'frosted',
      depth = 1,
      ...props
    },
    ref
  ) => {
    const variantConfig: Record<string, { tint: string; glow: string }> = {
      info: { tint: 'blue', glow: 'rgba(59, 130, 246, 0.2)' },
      success: { tint: 'emerald', glow: 'rgba(16, 185, 129, 0.2)' },
      warning: { tint: 'amber', glow: 'rgba(245, 158, 11, 0.2)' },
      error: { tint: 'rose', glow: 'rgba(244, 63, 94, 0.25)' },
    };

    const current = variantConfig[variant] || variantConfig.info;

    return (
      <Glass
        ref={ref}
        material={material}
        depth={depth}
        tint={current.tint}
        opacity={0.22}
        rounded="xl"
        glow={current.glow}
        className={cn('flex items-start gap-3.5 p-4 text-sm text-white/90', className)}
        {...props}
      >
        {icon && <div className="shrink-0 mt-0.5">{icon}</div>}
        <div className="flex-1">
          {title && <h5 className="font-semibold text-white mb-0.5">{title}</h5>}
          <div className="text-white/80">{children}</div>
        </div>
      </Glass>
    );
  }
);

GlassAlert.displayName = 'GlassAlert';
