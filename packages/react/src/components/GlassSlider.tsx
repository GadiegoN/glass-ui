'use client';

import React, { forwardRef } from 'react';
import { Glass } from '../primitives/Glass';
import { cn } from '../utils/cn';

export interface GlassSliderProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'value' | 'onChange'> {
  value?: number;
  defaultValue?: number;
  min?: number;
  max?: number;
  step?: number;
  onChange?: (value: number) => void;
  tint?: string;
}

export const GlassSlider = forwardRef<HTMLInputElement, GlassSliderProps>(
  (
    {
      value,
      defaultValue = 50,
      min = 0,
      max = 100,
      step = 1,
      onChange,
      tint = 'blue',
      className,
      disabled,
      ...props
    },
    ref
  ) => {
    const [internalVal, setInternalVal] = React.useState(defaultValue);
    const currentValue = value !== undefined ? value : internalVal;
    const minVal = min ?? 0;
    const maxVal = max ?? 100;

    const safeValue = Number.isFinite(currentValue) ? currentValue : minVal;
    const range = maxVal - minVal;
    const percentage = range > 0 ? Math.min(Math.max(((safeValue - minVal) / range) * 100, 0), 100) : 0;

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const num = Number(e.target.value);
      if (value === undefined) setInternalVal(num);
      onChange?.(num);
    };

    // Mathematical thumb offset so the 16px thumb stays exactly within the track edges
    const thumbLeft = `calc(${percentage}% + ${(50 - percentage) * 0.16}px)`;

    return (
      <div className={cn('relative flex items-center select-none w-full h-7 py-2', className)}>
        {/* Recessed glass track */}
        <Glass
          depth={0}
          rounded="full"
          opacity={0.15}
          className="w-full h-2 relative overflow-hidden pointer-events-none"
        >
          {/* Active progress fill */}
          <div
            className="h-full bg-gradient-to-r from-blue-500/90 to-indigo-400/90 rounded-full transition-all duration-75"
            style={{ width: `${percentage}%` }}
          />
        </Glass>

        {/* Real HTML range input over top for accessibility and native touch handling */}
        <input
          ref={ref}
          type="range"
          min={minVal}
          max={maxVal}
          step={step}
          value={safeValue}
          disabled={disabled}
          onChange={handleChange}
          className={cn(
            'absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10 m-0 p-0',
            disabled && 'cursor-not-allowed'
          )}
          {...props}
        />

        {/* Elevated crystal glass thumb with explicit absolute positioning */}
        <Glass
          material="crystal"
          depth={2}
          rounded="full"
          opacity={0.95}
          className="w-4 h-4 shadow-lg border border-white/80 pointer-events-none transition-transform duration-75"
          style={{
            position: 'absolute',
            left: thumbLeft,
            top: '50%',
            transform: 'translate(-50%, -50%)',
            zIndex: 5,
          }}
        />
      </div>
    );
  }
);

GlassSlider.displayName = 'GlassSlider';
