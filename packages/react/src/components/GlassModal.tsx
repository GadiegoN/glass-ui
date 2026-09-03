'use client';

import React, { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import { Glass } from '../primitives/Glass';
import { GlassProps } from '../engine/types';
import { cn } from '../utils/cn';

export interface GlassModalProps extends GlassProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
}

export function GlassModalRoot({
  isOpen,
  onClose,
  className,
  children,
  ...props
}: GlassModalProps) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onClose]);

  if (!isOpen || !mounted) return null;

  return createPortal(
    <div className="fixed inset-0 z-[99999] flex items-center justify-center p-4">
      {/* Blurred intelligent backdrop */}
      <div
        onClick={onClose}
        className="fixed inset-0 bg-black/70 backdrop-blur-md transition-opacity duration-300"
      />

      {/* Floating Glass modal at Depth 4 */}
      <Glass
        material="crystal"
        depth={4}
        rounded="2xl"
        className={cn(
          'relative z-10 w-full max-w-lg p-6 shadow-2xl transition-all duration-300 transform scale-100',
          className
        )}
        {...props}
      >
        {children}
      </Glass>
    </div>,
    document.body
  );
}

export function GlassModalHeader({
  className,
  children,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div className={cn('flex flex-col space-y-1.5 mb-4', className)} {...props}>
      {children}
    </div>
  );
}

export function GlassModalTitle({
  className,
  children,
  ...props
}: React.HTMLAttributes<HTMLHeadingElement>) {
  return (
    <h2 className={cn('text-xl font-bold text-white tracking-tight', className)} {...props}>
      {children}
    </h2>
  );
}

export function GlassModalDescription({
  className,
  children,
  ...props
}: React.HTMLAttributes<HTMLParagraphElement>) {
  return (
    <p className={cn('text-sm text-white/70', className)} {...props}>
      {children}
    </p>
  );
}

export function GlassModalFooter({
  className,
  children,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div className={cn('flex justify-end gap-3 mt-6 pt-4 border-t border-white/10', className)} {...props}>
      {children}
    </div>
  );
}

export const GlassModal = Object.assign(GlassModalRoot, {
  Header: GlassModalHeader,
  Title: GlassModalTitle,
  Description: GlassModalDescription,
  Footer: GlassModalFooter,
});
