'use client';

import React, { forwardRef, useState } from 'react';
import { Glass } from '../primitives/Glass';
import { GlassProps } from '../engine/types';
import { cn } from '../utils/cn';

export interface GlassDockProps extends GlassProps {
  children: React.ReactNode;
}

export const GlassDockRoot = forwardRef<HTMLDivElement, GlassDockProps>(
  ({ className, children, depth = 3, material = 'crystal', rounded = '2xl', ...props }, ref) => {
    return (
      <div className="flex justify-center w-full select-none">
        <Glass
          ref={ref}
          material={material}
          depth={depth}
          rounded={rounded}
          interactiveLight
          className={cn(
            'flex items-end gap-3 px-4 py-3 shadow-2xl transition-all duration-300',
            className
          )}
          {...props}
        >
          {children}
        </Glass>
      </div>
    );
  }
);
GlassDockRoot.displayName = 'GlassDock';

export interface GlassDockItemProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  icon?: React.ReactNode;
  label?: string;
  isActive?: boolean;
  notificationCount?: number;
}

export const GlassDockItem = forwardRef<HTMLButtonElement, GlassDockItemProps>(
  ({ icon, label, isActive, notificationCount, className, ...props }, ref) => {
    const [isHovered, setIsHovered] = useState(false);

    return (
      <div
        className="relative flex flex-col items-center group"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {/* Floating tooltip */}
        {label && isHovered && (
          <Glass
            depth={2}
            material="crystal"
            rounded="md"
            className="absolute -top-10 px-2 py-0.5 text-xs text-white whitespace-nowrap shadow-md pointer-events-none animate-in fade-in zoom-in-95 duration-150"
          >
            {label}
          </Glass>
        )}

        <button
          ref={ref}
          type="button"
          className={cn(
            'relative flex items-center justify-center w-12 h-12 rounded-xl transition-all duration-200 outline-none',
            'hover:scale-125 hover:-translate-y-2 active:scale-110 active:-translate-y-1',
            'focus-visible:ring-2 focus-visible:ring-white/50 cursor-pointer',
            className
          )}
          {...props}
        >
          <Glass
            depth={1}
            material="crystal"
            rounded="xl"
            opacity={0.35}
            className="w-full h-full flex items-center justify-center text-white/90 group-hover:text-white"
          >
            {icon}
          </Glass>

          {/* Badge count */}
          {notificationCount !== undefined && notificationCount > 0 && (
            <span className="absolute -top-1 -right-1 flex items-center justify-center min-w-4 h-4 px-1 text-[10px] font-bold text-white bg-rose-500 rounded-full ring-2 ring-black/40">
              {notificationCount}
            </span>
          )}
        </button>

        {/* Active running app dot */}
        {isActive && (
          <span className="w-1 h-1 mt-1 rounded-full bg-white/80 shadow-[0_0_6px_rgba(255,255,255,0.8)]" />
        )}
      </div>
    );
  }
);
GlassDockItem.displayName = 'GlassDock.Item';

export const GlassDock = Object.assign(GlassDockRoot, {
  Item: GlassDockItem,
});
