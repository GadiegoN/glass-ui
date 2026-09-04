'use client';

import React, {
  createContext,
  useContext,
  useEffect,
  useRef,
  useState,
  useCallback,
  useMemo,
} from 'react';
import { createPortal } from 'react-dom';
import { Glass } from '../primitives/Glass';
import { GlassProps } from '../engine/types';
import { cn } from '../utils/cn';

interface CommandContextValue {
  search: string;
  setSearch: (s: string) => void;
  activeIndex: number;
  setActiveIndex: React.Dispatch<React.SetStateAction<number>>;
  onClose: () => void;
  registerItem: (id: string, onSelect?: () => void, disabled?: boolean) => void;
  unregisterItem: (id: string) => void;
  itemsList: Array<{ id: string; onSelect?: () => void; disabled?: boolean }>;
}

const CommandContext = createContext<CommandContextValue | null>(null);

function useCommandContext() {
  const ctx = useContext(CommandContext);
  if (!ctx) throw new Error('GlassCommand components must be wrapped in <GlassCommand />');
  return ctx;
}

/* =========================================================================
   GlassCommand.Kbd (Tactile keyboard key badge)
   ========================================================================= */
export function GlassCommandKbd({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <kbd
      className={cn(
        'inline-flex items-center justify-center min-w-[20px] h-5 px-1.5 text-[11px] font-mono font-medium',
        'text-white/60 bg-white/[0.08] border border-white/20 rounded shadow-sm',
        className
      )}
    >
      {children}
    </kbd>
  );
}

/* =========================================================================
   GlassCommand.Input
   ========================================================================= */
export interface GlassCommandInputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  icon?: React.ReactNode;
}

export function GlassCommandInput({
  className,
  icon,
  placeholder = 'Digite um comando ou pesquise...',
  ...props
}: GlassCommandInputProps) {
  const { search, setSearch, onClose } = useCommandContext();
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    // Focus search input automatically when opened
    inputRef.current?.focus();
  }, []);

  return (
    <div className="relative flex items-center px-4 py-3.5 border-b border-white/10">
      {icon ? (
        <div className="shrink-0 mr-3 text-white/50">{icon}</div>
      ) : (
        <svg
          className="w-5 h-5 mr-3 text-white/50 shrink-0"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth="2"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
          />
        </svg>
      )}

      <input
        ref={inputRef}
        type="text"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        placeholder={placeholder}
        className={cn(
          'w-full bg-transparent text-white placeholder-white/40 text-base outline-none',
          className
        )}
        {...props}
      />

      {search ? (
        <button
          onClick={() => setSearch('')}
          className="ml-2 text-xs text-white/40 hover:text-white transition-colors p-1 rounded"
          title="Limpar pesquisa"
        >
          Limpar
        </button>
      ) : (
        <button
          onClick={onClose}
          className="ml-2 hidden sm:flex items-center gap-1 cursor-pointer"
          title="Fechar"
        >
          <GlassCommandKbd>ESC</GlassCommandKbd>
        </button>
      )}
    </div>
  );
}

/* =========================================================================
   GlassCommand.List
   ========================================================================= */
export function GlassCommandList({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div
      className={cn(
        'max-h-[340px] overflow-y-auto overflow-x-hidden p-2 space-y-1',
        'scrollbar-thin scrollbar-thumb-white/20 scrollbar-track-transparent',
        className
      )}
    >
      {children}
    </div>
  );
}

/* =========================================================================
   GlassCommand.Group
   ========================================================================= */
export function GlassCommandGroup({
  heading,
  children,
  className,
}: {
  heading?: string;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div className={cn('py-1.5', className)}>
      {heading && (
        <div className="px-3 py-1 text-[11px] font-semibold text-white/40 uppercase tracking-wider select-none">
          {heading}
        </div>
      )}
      <div className="space-y-0.5">{children}</div>
    </div>
  );
}

/* =========================================================================
   GlassCommand.Empty
   ========================================================================= */
export function GlassCommandEmpty({
  children = 'Nenhum comando encontrado.',
  className,
}: {
  children?: React.ReactNode;
  className?: string;
}) {
  const { itemsList } = useCommandContext();

  // If there are registered visible items, do not show empty state
  if (itemsList.length > 0) return null;

  return (
    <div
      className={cn(
        'py-10 text-center text-sm text-white/50 select-none flex flex-col items-center justify-center gap-2',
        className
      )}
    >
      <svg
        className="w-8 h-8 text-white/30"
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth="1.5"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M9.75 9.75l4.5 4.5m0-4.5l-4.5 4.5M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
        />
      </svg>
      <span>{children}</span>
    </div>
  );
}

/* =========================================================================
   GlassCommand.Item
   ========================================================================= */
export interface GlassCommandItemProps {
  id?: string;
  icon?: React.ReactNode;
  children: React.ReactNode;
  shortcut?: string;
  onSelect?: () => void;
  disabled?: boolean;
  keywords?: string[];
  className?: string;
}

export function GlassCommandItem({
  id: explicitId,
  icon,
  children,
  shortcut,
  onSelect,
  disabled = false,
  keywords = [],
  className,
}: GlassCommandItemProps) {
  const { search, activeIndex, itemsList, registerItem, unregisterItem, onClose } =
    useCommandContext();

  const generatedId = useMemo(
    () => explicitId || (typeof children === 'string' ? children : Math.random().toString(36)),
    [explicitId, children]
  );

  // Live filter match
  const textContent = typeof children === 'string' ? children : '';
  const searchLower = search.toLowerCase().trim();
  const isMatch =
    !searchLower ||
    textContent.toLowerCase().includes(searchLower) ||
    keywords.some((kw) => kw.toLowerCase().includes(searchLower));

  useEffect(() => {
    if (isMatch && !disabled) {
      registerItem(generatedId, onSelect, disabled);
      return () => unregisterItem(generatedId);
    }
  }, [isMatch, disabled, generatedId, onSelect, registerItem, unregisterItem]);

  if (!isMatch) return null;

  const currentIndex = itemsList.findIndex((item) => item.id === generatedId);
  const isActive = currentIndex === activeIndex;

  const handleTrigger = () => {
    if (disabled) return;
    onSelect?.();
    onClose();
  };

  return (
    <div
      onClick={handleTrigger}
      className={cn(
        'group relative flex items-center justify-between px-3 py-2.5 rounded-xl cursor-pointer select-none transition-all duration-150',
        isActive
          ? 'bg-white/[0.14] text-white shadow-lg shadow-black/20 scale-[1.01]'
          : 'text-white/80 hover:bg-white/[0.08] hover:text-white',
        disabled && 'opacity-40 cursor-not-allowed pointer-events-none',
        className
      )}
    >
      <div className="flex items-center gap-3 min-w-0">
        {icon && (
          <div
            className={cn(
              'shrink-0 text-white/50 transition-colors',
              isActive && 'text-blue-400'
            )}
          >
            {icon}
          </div>
        )}
        <span className="truncate text-sm font-medium">{children}</span>
      </div>

      {shortcut && (
        <div className="flex items-center gap-1 shrink-0 ml-3">
          {shortcut.split(' ').map((key, i) => (
            <GlassCommandKbd key={i}>{key}</GlassCommandKbd>
          ))}
        </div>
      )}
    </div>
  );
}

/* =========================================================================
   GlassCommand (Root Modal Dialog with Backdrop & Keyboard Trap)
   ========================================================================= */
export interface GlassCommandProps extends GlassProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
}

export function GlassCommandRoot({
  isOpen,
  onClose,
  className,
  children,
  depth = 4,
  material = 'crystal',
  rounded = '2xl',
  ...props
}: GlassCommandProps) {
  const [mounted, setMounted] = useState(false);
  const [search, setSearch] = useState('');
  const [activeIndex, setActiveIndex] = useState(0);
  const [itemsList, setItemsList] = useState<
    Array<{ id: string; onSelect?: () => void; disabled?: boolean }>
  >([]);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Reset search and active index upon open
  useEffect(() => {
    if (isOpen) {
      setSearch('');
      setActiveIndex(0);
    }
  }, [isOpen]);

  const registerItem = useCallback((id: string, onSelect?: () => void, disabled?: boolean) => {
    setItemsList((prev) => {
      if (prev.some((item) => item.id === id)) return prev;
      return [...prev, { id, onSelect, disabled }];
    });
  }, []);

  const unregisterItem = useCallback((id: string) => {
    setItemsList((prev) => prev.filter((item) => item.id !== id));
  }, []);

  // Keyboard navigation: ArrowUp, ArrowDown, Enter, Escape
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        e.preventDefault();
        onClose();
      } else if (e.key === 'ArrowDown') {
        e.preventDefault();
        setActiveIndex((prev) => (itemsList.length > 0 ? (prev + 1) % itemsList.length : 0));
      } else if (e.key === 'ArrowUp') {
        e.preventDefault();
        setActiveIndex((prev) =>
          itemsList.length > 0 ? (prev - 1 + itemsList.length) % itemsList.length : 0
        );
      } else if (e.key === 'Enter') {
        e.preventDefault();
        const currentItem = itemsList[activeIndex];
        if (currentItem && !currentItem.disabled) {
          currentItem.onSelect?.();
          onClose();
        }
      }
    };

    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, activeIndex, itemsList, onClose]);

  if (!isOpen || !mounted) return null;

  return createPortal(
    <CommandContext.Provider
      value={{
        search,
        setSearch,
        activeIndex,
        setActiveIndex,
        onClose,
        registerItem,
        unregisterItem,
        itemsList,
      }}
    >
      <div className="fixed inset-0 z-[99999] flex items-start justify-center p-4 pt-16 sm:pt-24 animate-in fade-in duration-200">
        {/* Intelligent backdrop blur */}
        <div
          onClick={onClose}
          className="fixed inset-0 bg-black/75 backdrop-blur-md transition-opacity duration-300"
        />

        {/* Floating Glass Spotlight Command Palette */}
        <Glass
          material={material}
          depth={depth}
          rounded={rounded}
          specular
          className={cn(
            'relative z-10 w-full max-w-xl shadow-2xl overflow-hidden',
            'border border-white/25 backdrop-blur-3xl transform scale-100',
            className
          )}
          {...props}
        >
          {children}
        </Glass>
      </div>
    </CommandContext.Provider>,
    document.body
  );
}

export const GlassCommand = Object.assign(GlassCommandRoot, {
  Input: GlassCommandInput,
  List: GlassCommandList,
  Group: GlassCommandGroup,
  Item: GlassCommandItem,
  Empty: GlassCommandEmpty,
  Kbd: GlassCommandKbd,
});
