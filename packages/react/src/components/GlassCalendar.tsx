'use client';

import React, { forwardRef, useState } from 'react';
import { Glass } from '../primitives/Glass';
import { GlassDepth, GlassMaterial } from '../engine/types';
import { cn } from '../utils/cn';

export interface GlassCalendarProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, 'onChange' | 'defaultValue'> {
  value?: Date;
  defaultValue?: Date;
  onChange?: (date: Date) => void;
  minDate?: Date;
  maxDate?: Date;
  material?: GlassMaterial;
  depth?: GlassDepth;
  locale?: string;
}

export const GlassCalendar = forwardRef<HTMLDivElement, GlassCalendarProps>(
  (
    {
      value,
      defaultValue,
      onChange,
      minDate,
      maxDate,
      material = 'crystal',
      depth = 1,
      locale = 'pt-BR',
      className,
      ...props
    },
    ref
  ) => {
    const [internalDate, setInternalDate] = useState<Date | undefined>(defaultValue);
    const selectedDate = value !== undefined ? value : internalDate;

    // Current viewing month and year
    const [viewDate, setViewDate] = useState<Date>(() => selectedDate || new Date());

    const currentYear = viewDate.getFullYear();
    const currentMonth = viewDate.getMonth();

    const monthNames = [
      'Janeiro',
      'Fevereiro',
      'Março',
      'Abril',
      'Maio',
      'Junho',
      'Julho',
      'Agosto',
      'Setembro',
      'Outubro',
      'Novembro',
      'Dezembro',
    ];

    const weekDays = ['D', 'S', 'T', 'Q', 'Q', 'S', 'S'];

    const handlePrevMonth = () => {
      setViewDate(new Date(currentYear, currentMonth - 1, 1));
    };

    const handleNextMonth = () => {
      setViewDate(new Date(currentYear, currentMonth + 1, 1));
    };

    const handleSelectDate = (date: Date) => {
      if (value === undefined) {
        setInternalDate(date);
      }
      onChange?.(date);
    };

    // Calculate calendar days matrix
    const firstDayOfMonth = new Date(currentYear, currentMonth, 1).getDay();
    const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();
    const daysInPrevMonth = new Date(currentYear, currentMonth, 0).getDate();

    const calendarCells: { date: Date; isCurrentMonth: boolean }[] = [];

    // Previous month filler days
    for (let i = firstDayOfMonth - 1; i >= 0; i--) {
      calendarCells.push({
        date: new Date(currentYear, currentMonth - 1, daysInPrevMonth - i),
        isCurrentMonth: false,
      });
    }

    // Current month days
    for (let i = 1; i <= daysInMonth; i++) {
      calendarCells.push({
        date: new Date(currentYear, currentMonth, i),
        isCurrentMonth: true,
      });
    }

    // Next month filler days (up to 42 cells total for 6 even rows)
    const remainingCells = 42 - calendarCells.length;
    for (let i = 1; i <= remainingCells; i++) {
      calendarCells.push({
        date: new Date(currentYear, currentMonth + 1, i),
        isCurrentMonth: false,
      });
    }

    const today = new Date();
    const isSameDay = (d1?: Date, d2?: Date) => {
      if (!d1 || !d2) return false;
      return (
        d1.getFullYear() === d2.getFullYear() &&
        d1.getMonth() === d2.getMonth() &&
        d1.getDate() === d2.getDate()
      );
    };

    const isDateDisabled = (date: Date) => {
      if (minDate && date < new Date(minDate.setHours(0, 0, 0, 0))) return true;
      if (maxDate && date > new Date(maxDate.setHours(23, 59, 59, 999))) return true;
      return false;
    };

    return (
      <Glass
        ref={ref}
        material={material}
        depth={depth}
        rounded="2xl"
        className={cn(
          'w-full max-w-[320px] p-4 select-none border border-white/10 shadow-2xl shadow-black/30',
          className
        )}
        {...props}
      >
        {/* Header Navigation */}
        <div className="flex items-center justify-between pb-3 mb-2 border-b border-white/10">
          <button
            type="button"
            onClick={handlePrevMonth}
            aria-label="Mês anterior"
            className="w-8 h-8 rounded-full flex items-center justify-center text-white/70 hover:text-white hover:bg-white/[0.12] transition-colors cursor-pointer border border-white/10"
          >
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M15 19l-7-7 7-7" />
            </svg>
          </button>

          <div className="text-sm font-bold text-white tracking-wide">
            {monthNames[currentMonth]} <span className="font-mono text-white/60 font-normal">{currentYear}</span>
          </div>

          <button
            type="button"
            onClick={handleNextMonth}
            aria-label="Próximo mês"
            className="w-8 h-8 rounded-full flex items-center justify-center text-white/70 hover:text-white hover:bg-white/[0.12] transition-colors cursor-pointer border border-white/10"
          >
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>

        {/* Day of week labels */}
        <div className="grid grid-cols-7 gap-1 text-center mb-1">
          {weekDays.map((day, idx) => (
            <span key={idx} className="text-[11px] font-semibold text-white/40 py-1">
              {day}
            </span>
          ))}
        </div>

        {/* Days grid */}
        <div className="grid grid-cols-7 gap-1">
          {calendarCells.map(({ date, isCurrentMonth }, idx) => {
            const isSelected = isSameDay(date, selectedDate);
            const isCurrentToday = isSameDay(date, today);
            const disabled = isDateDisabled(date);

            return (
              <button
                key={idx}
                type="button"
                disabled={disabled}
                onClick={() => handleSelectDate(date)}
                className={cn(
                  'relative h-8 w-8 mx-auto rounded-xl flex flex-col items-center justify-center text-xs transition-all duration-200 cursor-pointer',
                  // Text opacity based on month
                  isCurrentMonth ? 'text-white/90' : 'text-white/25',
                  // Hover state
                  !isSelected && !disabled && 'hover:bg-white/[0.12] hover:text-white',
                  // Selected state (visionOS crystal capsule)
                  isSelected &&
                    'bg-blue-500/30 text-white font-bold border border-blue-400/50 shadow-[0_0_12px_rgba(59,130,246,0.5)] scale-105',
                  // Disabled
                  disabled && 'opacity-20 cursor-not-allowed pointer-events-none'
                )}
              >
                <span>{date.getDate()}</span>
                {/* Today indicator dot */}
                {isCurrentToday && !isSelected && (
                  <span className="absolute bottom-1 w-1 h-1 rounded-full bg-cyan-400 shadow-[0_0_4px_rgba(6,182,212,0.8)]" />
                )}
              </button>
            );
          })}
        </div>
      </Glass>
    );
  }
);

GlassCalendar.displayName = 'GlassCalendar';
