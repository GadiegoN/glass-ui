'use client';

import React, { useState } from 'react';
import {
  GlassNavbar,
  GlassBadge,
  GlassButton,
  GlassIconButton,
  Glass,
  GlassDivider,
} from '@gadiegon/glass-ui';
import { Sparkles, Layers, Layout, Sliders, Menu, X } from 'lucide-react';
import pkg from '../../../../packages/react/package.json';

export function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const currentVersion = process.env.NEXT_PUBLIC_NPM_VERSION
    ? `v${process.env.NEXT_PUBLIC_NPM_VERSION}`
    : `v${pkg.version}`;

  const closeMenu = () => setIsMobileMenuOpen(false);

  return (
    <header className="sticky top-0 z-40 w-full">
      <GlassNavbar
        depth={2}
        material="crystal"
        isSticky={false}
        className="border-b border-white/10 px-6 py-3.5 backdrop-blur-xl"
      >
        {/* Left: Brand Logo */}
        <div className="flex items-center gap-3">
          <a href="#hero" onClick={closeMenu} className="flex items-center gap-2.5 group">
            <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-blue-500/80 to-purple-500/80 border border-white/40 flex items-center justify-center shadow-lg shadow-blue-500/20 group-hover:scale-105 transition-transform">
              <Sparkles className="w-4 h-4 text-white" />
            </div>
            <span className="text-lg font-bold tracking-tight bg-gradient-to-r from-white via-white/90 to-white/60 bg-clip-text text-transparent">
              Glass UI
            </span>
          </a>
          <GlassBadge variant="purple" size="sm" dot className="hidden sm:inline-flex">
            {currentVersion}
          </GlassBadge>
        </div>

        {/* Center: Desktop Navigation Links */}
        <nav className="hidden md:flex items-center gap-1 text-sm font-medium">
          <a
            href="#studio"
            className="px-3 py-1.5 rounded-lg text-white/70 hover:text-white hover:bg-white/5 transition-all flex items-center gap-1.5"
          >
            <Sliders className="w-3.5 h-3.5 text-blue-400" />
            Studio
          </a>
          <a
            href="#showcases"
            className="px-3 py-1.5 rounded-lg text-white/70 hover:text-white hover:bg-white/5 transition-all flex items-center gap-1.5"
          >
            <Layout className="w-3.5 h-3.5 text-purple-400" />
            Showcases
          </a>
          <a
            href="#components"
            className="px-3 py-1.5 rounded-lg text-white/70 hover:text-white hover:bg-white/5 transition-all flex items-center gap-1.5"
          >
            <Layers className="w-3.5 h-3.5 text-emerald-400" />
            Components
          </a>
        </nav>

        {/* Right: Actions (Desktop & Mobile Trigger) */}
        <div className="flex items-center gap-2 sm:gap-3">
          {/* NPM Badge Button (Desktop) */}
          <a
            href="https://www.npmjs.com/package/@gadiegon/glass-ui"
            target="_blank"
            rel="noopener noreferrer"
            className="hidden lg:inline-block"
          >
            <GlassButton size="sm" variant="ghost" className="gap-1.5 font-mono text-xs text-red-300 hover:text-red-200">
              <span className="font-bold text-red-400">npm</span>
              <span>{currentVersion}</span>
            </GlassButton>
          </a>

          {/* GitHub Button (Desktop) */}
          <a
            href="https://github.com/GadiegoN/glass-ui"
            target="_blank"
            rel="noopener noreferrer"
            className="hidden sm:inline-block"
          >
            <GlassButton size="sm" variant="ghost" className="gap-2">
              <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
              </svg>
              <span>GitHub</span>
            </GlassButton>
          </a>

          {/* Primary Action Button (Desktop & Tablet) */}
          <a href="#studio" onClick={closeMenu} className="hidden xs:inline-block">
            <GlassButton size="sm" variant="primary" className="shadow-lg shadow-blue-500/20">
              Experimentar
            </GlassButton>
          </a>

          {/* Mobile Hamburger Toggle Button */}
          <div className="md:hidden">
            <GlassIconButton
              size="md"
              variant="ghost"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              aria-label={isMobileMenuOpen ? 'Fechar menu de navegação' : 'Abrir menu de navegação'}
            >
              {isMobileMenuOpen ? <X className="w-5 h-5 text-white" /> : <Menu className="w-5 h-5 text-white" />}
            </GlassIconButton>
          </div>
        </div>
      </GlassNavbar>

      {/* Mobile Responsive Glass Drawer */}
      {isMobileMenuOpen && (
        <Glass
          depth={3}
          material="crystal"
          className="md:hidden w-full border-b border-white/15 px-6 py-5 shadow-2xl backdrop-blur-2xl animate-in fade-in slide-in-from-top-3 duration-200"
        >
          <nav className="flex flex-col space-y-2">
            <a
              href="#studio"
              onClick={closeMenu}
              className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-white/85 hover:text-white hover:bg-white/10 transition-colors text-base font-medium"
            >
              <div className="w-8 h-8 rounded-lg bg-blue-500/20 flex items-center justify-center border border-blue-400/30">
                <Sliders className="w-4 h-4 text-blue-400" />
              </div>
              <span>Studio Playground</span>
            </a>

            <a
              href="#showcases"
              onClick={closeMenu}
              className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-white/85 hover:text-white hover:bg-white/10 transition-colors text-base font-medium"
            >
              <div className="w-8 h-8 rounded-lg bg-purple-500/20 flex items-center justify-center border border-purple-400/30">
                <Layout className="w-4 h-4 text-purple-400" />
              </div>
              <span>Showcases em Ação</span>
            </a>

            <a
              href="#components"
              onClick={closeMenu}
              className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-white/85 hover:text-white hover:bg-white/10 transition-colors text-base font-medium"
            >
              <div className="w-8 h-8 rounded-lg bg-emerald-500/20 flex items-center justify-center border border-emerald-400/30">
                <Layers className="w-4 h-4 text-emerald-400" />
              </div>
              <span>Catálogo de Componentes</span>
            </a>

            <div className="pt-2 pb-1">
              <GlassDivider />
            </div>

            {/* Mobile Actions: NPM & GitHub Links */}
            <div className="grid grid-cols-2 gap-3 pt-1">
              <a
                href="https://www.npmjs.com/package/@gadiegon/glass-ui"
                target="_blank"
                rel="noopener noreferrer"
                className="w-full"
              >
                <GlassButton size="sm" variant="secondary" className="w-full justify-center gap-2 font-mono text-xs">
                  <span className="font-bold text-red-400">npm</span>
                  <span>{currentVersion}</span>
                </GlassButton>
              </a>

              <a
                href="https://github.com/GadiegoN/glass-ui"
                target="_blank"
                rel="noopener noreferrer"
                className="w-full"
              >
                <GlassButton size="sm" variant="secondary" className="w-full justify-center gap-2 text-xs">
                  <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
                    <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
                  </svg>
                  <span>GitHub</span>
                </GlassButton>
              </a>
            </div>

            <div className="pt-2">
              <a href="#studio" onClick={closeMenu} className="w-full block">
                <GlassButton size="md" variant="primary" className="w-full justify-center shadow-xl shadow-blue-500/25">
                  Abrir Studio Interativo
                </GlassButton>
              </a>
            </div>
          </nav>
        </Glass>
      )}
    </header>
  );
}

