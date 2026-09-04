'use client';

import React, { createContext, useContext, useState, forwardRef } from 'react';
import { Glass } from '../primitives/Glass';
import { GlassProps } from '../engine/types';
import { cn } from '../utils/cn';

interface AccordionContextValue {
  value: string | string[];
  onToggle: (itemValue: string) => void;
  type: 'single' | 'multiple';
}

const AccordionContext = createContext<AccordionContextValue | null>(null);

function useAccordionContext() {
  const ctx = useContext(AccordionContext);
  if (!ctx) throw new Error('GlassAccordion components must be inside <GlassAccordion />');
  return ctx;
}

interface ItemContextValue {
  value: string;
  isOpen: boolean;
}

const ItemContext = createContext<ItemContextValue | null>(null);

/* =========================================================================
   GlassAccordion (Root)
   ========================================================================= */
export interface GlassAccordionProps extends React.HTMLAttributes<HTMLDivElement> {
  type?: 'single' | 'multiple';
  defaultValue?: string | string[];
  value?: string | string[];
  onValueChange?: (val: any) => void;
  collapsible?: boolean; // For type="single", allows closing active item
  children: React.ReactNode;
}

export function GlassAccordionRoot({
  type = 'single',
  defaultValue,
  value: controlledValue,
  onValueChange,
  collapsible = true,
  className,
  children,
  ...props
}: GlassAccordionProps) {
  const [internalVal, setInternalVal] = useState<string | string[]>(
    defaultValue ?? (type === 'multiple' ? [] : '')
  );

  const currentValue = controlledValue !== undefined ? controlledValue : internalVal;

  const handleToggle = (itemValue: string) => {
    if (type === 'multiple') {
      const arr = Array.isArray(currentValue) ? currentValue : [];
      const updated = arr.includes(itemValue)
        ? arr.filter((v) => v !== itemValue)
        : [...arr, itemValue];
      if (controlledValue === undefined) setInternalVal(updated);
      onValueChange?.(updated);
    } else {
      let updated = itemValue;
      if (collapsible && currentValue === itemValue) {
        updated = '';
      }
      if (controlledValue === undefined) setInternalVal(updated);
      onValueChange?.(updated);
    }
  };

  return (
    <AccordionContext.Provider value={{ value: currentValue, onToggle: handleToggle, type }}>
      <div className={cn('space-y-2.5 w-full', className)} {...props}>
        {children}
      </div>
    </AccordionContext.Provider>
  );
}

/* =========================================================================
   GlassAccordion.Item
   ========================================================================= */
export interface GlassAccordionItemProps extends GlassProps {
  value: string;
  disabled?: boolean;
}

export const GlassAccordionItem = forwardRef<HTMLDivElement, GlassAccordionItemProps>(
  (
    {
      value,
      disabled = false,
      material = 'crystal',
      depth = 1,
      rounded = 'xl',
      className,
      children,
      ...props
    },
    ref
  ) => {
    const { value: currentVal } = useAccordionContext();
    const isOpen = Array.isArray(currentVal)
      ? currentVal.includes(value)
      : currentVal === value;

    return (
      <ItemContext.Provider value={{ value, isOpen }}>
        <Glass
          ref={ref}
          material={material}
          depth={isOpen ? 2 : depth}
          rounded={rounded}
          specular
          className={cn(
            'w-full transition-all duration-300 border border-white/10 overflow-hidden',
            isOpen && 'shadow-xl shadow-black/25 border-white/25',
            disabled && 'opacity-50 pointer-events-none',
            className
          )}
          {...props}
        >
          {children}
        </Glass>
      </ItemContext.Provider>
    );
  }
);
GlassAccordionItem.displayName = 'GlassAccordionItem';

/* =========================================================================
   GlassAccordion.Trigger
   ========================================================================= */
export function GlassAccordionTrigger({
  className,
  children,
  ...props
}: React.ButtonHTMLAttributes<HTMLButtonElement>) {
  const { onToggle } = useAccordionContext();
  const { value, isOpen } = useContext(ItemContext) || { value: '', isOpen: false };

  return (
    <button
      type="button"
      onClick={() => onToggle(value)}
      className={cn(
        'w-full flex items-center justify-between p-4 sm:p-5 text-left text-sm sm:text-base font-semibold text-white/90',
        'hover:text-white hover:bg-white/[0.05] transition-colors outline-none select-none cursor-pointer',
        className
      )}
      {...props}
    >
      <span className="pr-4 leading-normal">{children}</span>
      <div
        className={cn(
          'shrink-0 w-6 h-6 rounded-full flex items-center justify-center bg-white/[0.08] border border-white/15 text-white/70 transition-transform duration-300',
          isOpen && 'rotate-180 text-white bg-white/[0.16] border-white/30'
        )}
      >
        <svg
          className="w-3.5 h-3.5"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth="2.5"
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
        </svg>
      </div>
    </button>
  );
}

/* =========================================================================
   GlassAccordion.Content
   ========================================================================= */
export function GlassAccordionContent({
  className,
  children,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  const { isOpen } = useContext(ItemContext) || { isOpen: false };

  if (!isOpen) return null;

  return (
    <div
      className={cn(
        'px-4 sm:px-5 pb-5 pt-1 text-sm text-white/70 leading-relaxed border-t border-white/10 animate-in fade-in slide-in-from-top-2 duration-200',
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
}

export const GlassAccordion = Object.assign(GlassAccordionRoot, {
  Item: GlassAccordionItem,
  Trigger: GlassAccordionTrigger,
  Content: GlassAccordionContent,
});
