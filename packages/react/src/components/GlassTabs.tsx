'use client';

import React, { createContext, useContext, useState } from 'react';
import { Glass } from '../primitives/Glass';
import { GlassProps } from '../engine/types';
import { cn } from '../utils/cn';

interface TabsContextValue {
  value: string;
  onChange: (val: string) => void;
}

const TabsContext = createContext<TabsContextValue | null>(null);

export interface GlassTabsProps extends GlassProps {
  value?: string;
  defaultValue?: string;
  onValueChange?: (val: string) => void;
  children: React.ReactNode;
}

export function GlassTabsRoot({
  value,
  defaultValue = '',
  onValueChange,
  className,
  children,
  ...props
}: GlassTabsProps) {
  const [internalVal, setInternalVal] = useState(defaultValue);
  const activeValue = value !== undefined ? value : internalVal;

  const handleTabChange = (newVal: string) => {
    if (value === undefined) setInternalVal(newVal);
    onValueChange?.(newVal);
  };

  return (
    <TabsContext.Provider value={{ value: activeValue, onChange: handleTabChange }}>
      <div className={cn('w-full', className)} {...props}>
        {children}
      </div>
    </TabsContext.Provider>
  );
}

export function GlassTabsList({
  className,
  children,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <Glass
      depth={0}
      opacity={0.12}
      rounded="xl"
      className={cn('inline-flex items-center p-1 gap-1', className)}
      {...props}
    >
      {children}
    </Glass>
  );
}

export interface GlassTabTriggerProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  value: string;
  children: React.ReactNode;
}

export function GlassTabTrigger({
  value,
  className,
  children,
  ...props
}: GlassTabTriggerProps) {
  const context = useContext(TabsContext);
  if (!context) throw new Error('GlassTabs.Trigger must be within GlassTabs');

  const isActive = context.value === value;

  return (
    <button
      type="button"
      onClick={() => context.onChange(value)}
      className={cn(
        'relative px-4 py-2 text-sm font-medium transition-all duration-200 rounded-lg cursor-pointer outline-none select-none',
        isActive ? 'text-white' : 'text-white/60 hover:text-white/90',
        'focus-visible:ring-2 focus-visible:ring-white/40',
        className
      )}
      {...props}
    >
      {isActive && (
        <Glass
          material="crystal"
          depth={2}
          rounded="lg"
          opacity={0.35}
          className="absolute inset-0 -z-10"
        />
      )}
      {children}
    </button>
  );
}

export interface GlassTabContentProps extends React.HTMLAttributes<HTMLDivElement> {
  value: string;
  children: React.ReactNode;
}

export function GlassTabContent({
  value,
  className,
  children,
  ...props
}: GlassTabContentProps) {
  const context = useContext(TabsContext);
  if (!context || context.value !== value) return null;

  return (
    <div
      role="tabpanel"
      className={cn('mt-4 animate-in fade-in duration-200', className)}
      {...props}
    >
      {children}
    </div>
  );
}

export const GlassTabs = Object.assign(GlassTabsRoot, {
  List: GlassTabsList,
  Trigger: GlassTabTrigger,
  Content: GlassTabContent,
});
