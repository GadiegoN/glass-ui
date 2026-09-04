'use client';

import React, {
  createContext,
  useContext,
  useState,
  useCallback,
  useEffect,
  useRef,
} from 'react';
import { createPortal } from 'react-dom';
import { Glass } from '../primitives/Glass';
import { cn } from '../utils/cn';

export type ToastVariant = 'default' | 'success' | 'info' | 'warning' | 'error';
export type ToastPosition = 'bottom-right' | 'bottom-left' | 'top-right' | 'top-left' | 'top-center' | 'bottom-center';

export interface ToastOptions {
  id?: string;
  title: string;
  description?: string;
  variant?: ToastVariant;
  duration?: number; // Duration in ms, defaults to 4000. Set to 0 to disable auto-close
  icon?: React.ReactNode;
  action?: {
    label: string;
    onClick: () => void;
  };
}

export interface ToastItem extends ToastOptions {
  id: string;
  createdAt: number;
}

interface ToastContextValue {
  toast: (options: ToastOptions) => string;
  dismiss: (id: string) => void;
  dismissAll: () => void;
}

const ToastContext = createContext<ToastContextValue | null>(null);

let globalToastFn: ((options: ToastOptions) => string) | null = null;
let globalDismissFn: ((id: string) => void) | null = null;

/**
 * Imperative standalone toast triggers:
 * glassToast('Title', { ... }), glassToast({ title: 'Title' })
 * glassToast.success('Salvo!'), glassToast.error('Erro!'), etc.
 */
export function glassToast(
  titleOrOptions: string | ToastOptions,
  options?: Omit<ToastOptions, 'title'>
): string {
  const opts: ToastOptions =
    typeof titleOrOptions === 'string'
      ? { title: titleOrOptions, ...options }
      : titleOrOptions;

  if (globalToastFn) {
    return globalToastFn(opts);
  }
  console.warn('GlassToast: No <GlassToastProvider /> found in component tree.');
  return '';
}

glassToast.success = (title: string, options?: Omit<ToastOptions, 'title' | 'variant'>) =>
  glassToast(title, { variant: 'success', ...options });

glassToast.error = (title: string, options?: Omit<ToastOptions, 'title' | 'variant'>) =>
  glassToast(title, { variant: 'error', ...options });

glassToast.info = (title: string, options?: Omit<ToastOptions, 'title' | 'variant'>) =>
  glassToast(title, { variant: 'info', ...options });

glassToast.warning = (title: string, options?: Omit<ToastOptions, 'title' | 'variant'>) =>
  glassToast(title, { variant: 'warning', ...options });

glassToast.dismiss = (id: string) => {
  globalDismissFn?.(id);
};

export function useGlassToast() {
  const ctx = useContext(ToastContext);
  if (!ctx) {
    throw new Error('useGlassToast must be used within a <GlassToastProvider />');
  }
  return ctx;
}

/* =========================================================================
   Variant styles and icons
   ========================================================================= */
const variantStyles: Record<
  ToastVariant,
  { border: string; glow: string; iconColor: string; defaultIcon: React.ReactNode }
> = {
  default: {
    border: 'border-white/20',
    glow: 'shadow-black/20',
    iconColor: 'text-white/70',
    defaultIcon: null,
  },
  success: {
    border: 'border-emerald-500/40',
    glow: 'shadow-emerald-500/15',
    iconColor: 'text-emerald-400',
    defaultIcon: (
      <svg className="w-5 h-5 text-emerald-400" viewBox="0 0 20 20" fill="currentColor">
        <path
          fillRule="evenodd"
          d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
          clipRule="evenodd"
        />
      </svg>
    ),
  },
  info: {
    border: 'border-blue-500/40',
    glow: 'shadow-blue-500/15',
    iconColor: 'text-blue-400',
    defaultIcon: (
      <svg className="w-5 h-5 text-blue-400" viewBox="0 0 20 20" fill="currentColor">
        <path
          fillRule="evenodd"
          d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
          clipRule="evenodd"
        />
      </svg>
    ),
  },
  warning: {
    border: 'border-amber-500/40',
    glow: 'shadow-amber-500/15',
    iconColor: 'text-amber-400',
    defaultIcon: (
      <svg className="w-5 h-5 text-amber-400" viewBox="0 0 20 20" fill="currentColor">
        <path
          fillRule="evenodd"
          d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z"
          clipRule="evenodd"
        />
      </svg>
    ),
  },
  error: {
    border: 'border-rose-500/40',
    glow: 'shadow-rose-500/20',
    iconColor: 'text-rose-400',
    defaultIcon: (
      <svg className="w-5 h-5 text-rose-400" viewBox="0 0 20 20" fill="currentColor">
        <path
          fillRule="evenodd"
          d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
          clipRule="evenodd"
        />
      </svg>
    ),
  },
};

const positionClasses: Record<ToastPosition, string> = {
  'bottom-right': 'bottom-6 right-6 flex-col-reverse',
  'bottom-left': 'bottom-6 left-6 flex-col-reverse',
  'top-right': 'top-6 right-6 flex-col',
  'top-left': 'top-6 left-6 flex-col',
  'top-center': 'top-6 left-1/2 -translate-x-1/2 flex-col',
  'bottom-center': 'bottom-6 left-1/2 -translate-x-1/2 flex-col-reverse',
};

/* =========================================================================
   GlassToast Component
   ========================================================================= */
interface SingleToastProps {
  toast: ToastItem;
  onDismiss: (id: string) => void;
  index: number;
  total: number;
  isHoveredStack: boolean;
}

function SingleToast({ toast, onDismiss, index, total, isHoveredStack }: SingleToastProps) {
  const { id, title, description, variant = 'default', duration = 4000, icon, action } = toast;
  const config = variantStyles[variant];

  useEffect(() => {
    if (duration <= 0) return;
    const timer = setTimeout(() => {
      onDismiss(id);
    }, duration);
    return () => clearTimeout(timer);
  }, [id, duration, onDismiss]);

  // Depth Stack Calculation:
  // When stacked and not hovered, cards behind slightly shrink and shift
  const offsetFromFront = total - 1 - index;
  const isStacked = !isHoveredStack && total > 1;

  let transformStyle = '';
  let opacityStyle = 1;

  if (isStacked) {
    if (offsetFromFront > 2) {
      // Hide if more than 3 items deep
      return null;
    }
    const scale = 1 - offsetFromFront * 0.05;
    const translateY = offsetFromFront * -8;
    transformStyle = `scale(${scale}) translateY(${translateY}px)`;
    opacityStyle = 1 - offsetFromFront * 0.15;
  }

  return (
    <Glass
      material="crystal"
      depth={3}
      rounded="2xl"
      specular
      style={{
        transform: transformStyle || undefined,
        opacity: opacityStyle,
        transition: 'all 0.3s cubic-bezier(0.16, 1, 0.3, 1)',
      }}
      className={cn(
        'pointer-events-auto relative w-full sm:w-[380px] p-4 shadow-2xl backdrop-blur-2xl',
        'border flex items-start gap-3.5',
        config.border,
        config.glow
      )}
    >
      {/* Icon */}
      <div className="shrink-0 pt-0.5">{icon || config.defaultIcon}</div>

      {/* Content */}
      <div className="flex-1 min-w-0 pr-1">
        <h5 className="text-sm font-semibold text-white tracking-tight leading-snug truncate">
          {title}
        </h5>
        {description && (
          <p className="text-xs text-white/70 mt-1 leading-relaxed line-clamp-2">
            {description}
          </p>
        )}

        {action && (
          <button
            onClick={() => {
              action.onClick();
              onDismiss(id);
            }}
            className="mt-2 text-xs font-semibold text-blue-400 hover:text-blue-300 transition-colors underline underline-offset-2"
          >
            {action.label}
          </button>
        )}
      </div>

      {/* Close button */}
      <button
        onClick={() => onDismiss(id)}
        className="shrink-0 text-white/40 hover:text-white p-1 rounded-lg transition-colors"
        aria-label="Fechar notificação"
      >
        <svg className="w-4 h-4" viewBox="0 0 20 20" fill="currentColor">
          <path
            fillRule="evenodd"
            d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
            clipRule="evenodd"
          />
        </svg>
      </button>
    </Glass>
  );
}

/* =========================================================================
   GlassToastProvider
   ========================================================================= */
export interface GlassToastProviderProps {
  children: React.ReactNode;
  position?: ToastPosition;
  maxToasts?: number;
}

export function GlassToastProvider({
  children,
  position = 'bottom-right',
  maxToasts = 5,
}: GlassToastProviderProps) {
  const [toasts, setToasts] = useState<ToastItem[]>([]);
  const [mounted, setMounted] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const dismiss = useCallback((id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  }, []);

  const dismissAll = useCallback(() => {
    setToasts([]);
  }, []);

  const toast = useCallback(
    (options: ToastOptions) => {
      const id = options.id || Math.random().toString(36).substring(2, 9);
      const newToast: ToastItem = {
        ...options,
        id,
        createdAt: Date.now(),
      };

      setToasts((prev) => {
        const filtered = prev.filter((t) => t.id !== id);
        const updated = [...filtered, newToast];
        if (updated.length > maxToasts) {
          return updated.slice(updated.length - maxToasts);
        }
        return updated;
      });

      return id;
    },
    [maxToasts]
  );

  useEffect(() => {
    globalToastFn = toast;
    globalDismissFn = dismiss;
    return () => {
      globalToastFn = null;
      globalDismissFn = null;
    };
  }, [toast, dismiss]);

  return (
    <ToastContext.Provider value={{ toast, dismiss, dismissAll }}>
      {children}

      {mounted &&
        createPortal(
          <div
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            className={cn(
              'fixed z-[999999] pointer-events-none flex gap-2.5 max-w-[100vw] px-4 sm:px-0',
              positionClasses[position]
            )}
          >
            {toasts.map((t, idx) => (
              <SingleToast
                key={t.id}
                toast={t}
                onDismiss={dismiss}
                index={idx}
                total={toasts.length}
                isHoveredStack={isHovered}
              />
            ))}
          </div>,
          document.body
        )}
    </ToastContext.Provider>
  );
}
