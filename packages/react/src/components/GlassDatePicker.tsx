'use client';

import React, { forwardRef, useEffect, useRef, useState } from 'react';
import { Glass } from '../primitives/Glass';
import { GlassDepth, GlassMaterial } from '../engine/types';
import { GlassCalendar } from './GlassCalendar';
import { cn } from '../utils/cn';

export interface GlassDatePickerProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, 'onChange' | 'defaultValue'> {
  value?: Date;
  defaultValue?: Date;
  onChange?: (date: Date) => void;
  placeholder?: string;
  formatDate?: (date: Date) => string;
  minDate?: Date;
  maxDate?: Date;
  material?: GlassMaterial;
  depth?: GlassDepth;
  disabled?: boolean;
}

export const GlassDatePicker = forwardRef<HTMLDivElement, GlassDatePickerProps>(
  (
    {
      value,
      defaultValue,
      onChange,
      placeholder = 'Selecionar data...',
      formatDate,
      minDate,
      maxDate,
      material = 'crystal',
      depth = 1,
      disabled = false,
      className,
      ...props
    },
    ref
  ) => {
    const [internalDate, setInternalDate] = useState<Date | undefined>(defaultValue);
    const selectedDate = value !== undefined ? value : internalDate;
    const [isOpen, setIsOpen] = useState(false);

    const internalRef = useRef<HTMLDivElement | null>(null);

    const setRefs = (node: HTMLDivElement | null) => {
      internalRef.current = node;
      if (typeof ref === 'function') {
        ref(node);
      } else if (ref) {
        (ref as React.MutableRefObject<HTMLDivElement | null>).current = node;
      }
    };

    // Default formatter: DD/MM/YYYY
    const formatDisplay = (date?: Date) => {
      if (!date) return '';
      if (formatDate) return formatDate(date);
      const day = String(date.getDate()).padStart(2, '0');
      const month = String(date.getMonth() + 1).padStart(2, '0');
      const year = date.getFullYear();
      return `${day}/${month}/${year}`;
    };

    // Outside click using standard click event (does NOT block clicks on other elements)
    useEffect(() => {
      if (!isOpen) return;

      const handleOutsideClick = (e: MouseEvent) => {
        if (internalRef.current && !internalRef.current.contains(e.target as Node)) {
          setIsOpen(false);
        }
      };

      const handleKeyDown = (e: KeyboardEvent) => {
        if (e.key === 'Escape') {
          setIsOpen(false);
        }
      };

      const timer = setTimeout(() => {
        document.addEventListener('click', handleOutsideClick);
      }, 0);
      document.addEventListener('keydown', handleKeyDown);

      return () => {
        clearTimeout(timer);
        document.removeEventListener('click', handleOutsideClick);
        document.removeEventListener('keydown', handleKeyDown);
      };
    }, [isOpen]);

    const handleDateSelect = (date: Date) => {
      if (value === undefined) {
        setInternalDate(date);
      }
      onChange?.(date);
      setIsOpen(false);
    };

    return (
      <div
        ref={setRefs}
        className={cn('relative inline-block w-full max-w-[280px]', className)}
        {...props}
      >
        {/* Trigger Input Button */}
        <button
          type="button"
          disabled={disabled}
          onClick={() => !disabled && setIsOpen((prev) => !prev)}
          className="w-full text-left outline-none cursor-pointer group"
        >
          <Glass
            material={material}
            depth={depth}
            rounded="xl"
            className={cn(
              'w-full flex items-center justify-between px-3.5 py-2.5 transition-all duration-200 border border-white/10 select-none',
              'group-hover:border-white/25 group-hover:bg-white/[0.08]',
              isOpen && 'border-blue-400/50 shadow-[0_0_15px_rgba(59,130,246,0.25)]',
              disabled && 'opacity-40 cursor-not-allowed pointer-events-none'
            )}
          >
            <div className="flex items-center gap-2.5 truncate">
              {/* Calendar Icon */}
              <svg
                className="w-4 h-4 text-purple-400 shrink-0"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <rect x="3" y="4" width="18" height="18" rx="2" ry="2" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                <line x1="16" y1="2" x2="16" y2="6" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                <line x1="8" y1="2" x2="8" y2="6" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                <line x1="3" y1="10" x2="21" y2="10" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              <span className={cn('truncate', selectedDate ? 'text-white font-medium' : 'text-white/40')}>
                {selectedDate ? formatDisplay(selectedDate) : placeholder}
              </span>
            </div>

            <svg
              className={cn(
                'w-3.5 h-3.5 text-white/50 transition-transform duration-200 shrink-0',
                isOpen && 'rotate-180 text-white'
              )}
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M19 9l-7 7-7-7" />
            </svg>
          </Glass>
        </button>

        {/* Floating Calendar Popover */}
        {isOpen && (
          <div className="absolute top-full mt-2 left-0 z-50 animate-in fade-in zoom-in-95 duration-150">
            <GlassCalendar
              value={selectedDate}
              onChange={handleDateSelect}
              minDate={minDate}
              maxDate={maxDate}
              material={material}
              depth={3}
              className="bg-[#090d16]/95 backdrop-blur-3xl border border-white/20 shadow-[0_25px_60px_rgba(0,0,0,0.9),0_0_25px_rgba(255,255,255,0.06)]"
            />
          </div>
        )}
      </div>
    );
  }
);

GlassDatePicker.displayName = 'GlassDatePicker';
