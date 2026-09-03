'use client';

import React, { forwardRef } from 'react';
import { Glass } from '../primitives/Glass';
import { GlassProps } from '../engine/types';
import { cn } from '../utils/cn';

export interface GlassAvatarProps extends GlassProps {
  src?: string;
  alt?: string;
  fallback?: string;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  status?: 'online' | 'offline' | 'busy' | 'away';
}

export const GlassAvatar = forwardRef<HTMLDivElement, GlassAvatarProps>(
  (
    {
      src,
      alt = 'Avatar',
      fallback = '?',
      size = 'md',
      status,
      className,
      material = 'crystal',
      depth = 1,
      ...props
    },
    ref
  ) => {
    const sizeClasses = {
      sm: 'w-8 h-8 text-xs',
      md: 'w-10 h-10 text-sm',
      lg: 'w-14 h-14 text-base',
      xl: 'w-20 h-20 text-xl font-bold',
    };

    const statusClasses = {
      online: 'bg-emerald-400',
      offline: 'bg-zinc-400',
      busy: 'bg-rose-500',
      away: 'bg-amber-400',
    };

    return (
      <div className="relative inline-block select-none">
        <Glass
          ref={ref}
          material={material}
          depth={depth}
          rounded="full"
          className={cn(
            'relative overflow-hidden flex items-center justify-center font-medium text-white/90',
            sizeClasses[size],
            className
          )}
          {...props}
        >
          {src ? (
            <img src={src} alt={alt} className="w-full h-full object-cover" />
          ) : (
            <span>{fallback}</span>
          )}
        </Glass>

        {status && (
          <span
            className={cn(
              'absolute bottom-0 right-0 block rounded-full ring-2 ring-black/40',
              size === 'sm' ? 'w-2 h-2' : 'w-3 h-3',
              statusClasses[status]
            )}
          />
        )}
      </div>
    );
  }
);

GlassAvatar.displayName = 'GlassAvatar';
