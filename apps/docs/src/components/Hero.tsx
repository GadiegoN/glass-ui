'use client';

import React, { useState } from 'react';
import { Glass, GlassButton, GlassBadge } from '@gadiegon/glass-ui';
import { Sparkles, ArrowRight, Copy, Check, ShieldCheck, Cpu, Eye, Zap } from 'lucide-react';

export function Hero() {
  const [copied, setCopied] = useState(false);

  const copyCommand = () => {
    navigator.clipboard.writeText('pnpm add @gadiegon/glass-ui');
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section id="hero" className="relative pt-24 pb-20 px-6 max-w-7xl mx-auto">
      {/* Background ambient orbs */}
      <div className="ambient-glow-1 -top-20 -left-20 animate-pulse-slow" />
      <div className="ambient-glow-2 top-40 -right-20 animate-pulse-slow" style={{ animationDelay: '2s' }} />

      <div className="relative z-10 grid lg:grid-cols-12 gap-12 items-center">
        {/* Left Column: Heading & Value Proposition */}
        <div className="lg:col-span-7 flex flex-col items-start text-left space-y-6">
          <GlassBadge variant="info" size="md" dot className="shadow-lg shadow-blue-500/10">
            Digital Material Architecture
          </GlassBadge>

          <h1 className="text-4xl sm:text-6xl font-extrabold tracking-tight text-white leading-[1.1]">
            Treating Glass as a{' '}
            <span className="bg-gradient-to-r from-blue-400 via-indigo-300 to-purple-400 bg-clip-text text-transparent">
              Living Digital Material
            </span>
          </h1>

          <p className="text-lg sm:text-xl text-white/70 max-w-2xl font-normal leading-relaxed">
            Not just another transparent <code className="text-blue-300 bg-white/5 px-1.5 py-0.5 rounded font-mono text-sm">backdrop-filter</code>.
            Glass UI calculates physical diffusion, specular edge highlights, optical refraction,
            and micro-textures for genuine visual depth in React and Next.js.
          </p>

          {/* Quick Install Snippet */}
          <div className="flex flex-wrap items-center gap-3 w-full sm:w-auto">
            <Glass
              depth={1}
              material="crystal"
              rounded="xl"
              className="flex items-center gap-3 px-4 py-2.5 font-mono text-sm text-white/90 border border-white/20 shadow-xl"
            >
              <span className="text-blue-400 select-none">$</span>
              <span>pnpm add @gadiegon/glass-ui</span>
              <button
                onClick={copyCommand}
                className="ml-2 text-white/50 hover:text-white transition-colors p-1 rounded hover:bg-white/10"
                title="Copiar comando"
              >
                {copied ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
              </button>
            </Glass>

            <a href="#studio">
              <GlassButton variant="primary" size="md" className="gap-2 shadow-xl shadow-blue-500/25">
                <span>Abrir Studio</span>
                <ArrowRight className="w-4 h-4" />
              </GlassButton>
            </a>
          </div>

          {/* Core Feature Badges */}
          <div className="pt-6 grid grid-cols-2 sm:grid-cols-3 gap-4 border-t border-white/10 w-full">
            <div className="flex items-center gap-2.5 text-sm text-white/80">
              <Cpu className="w-4 h-4 text-blue-400" />
              <span>Glass Engine Real-Time</span>
            </div>
            <div className="flex items-center gap-2.5 text-sm text-white/80">
              <Eye className="w-4 h-4 text-purple-400" />
              <span>Specular Physics</span>
            </div>
            <div className="flex items-center gap-2.5 text-sm text-white/80">
              <Zap className="w-4 h-4 text-emerald-400" />
              <span>Zero Overhead & Tree-Shake</span>
            </div>
          </div>
        </div>

        {/* Right Column: Hero Visual Material Showcase */}
        <div className="lg:col-span-5 relative flex justify-center">
          <div className="relative w-full max-w-md">
            {/* Underlying vibrant graphics that highlight the glass refraction */}
            <div className="absolute -top-6 -left-6 w-36 h-36 rounded-full bg-gradient-to-tr from-pink-500 to-rose-500 opacity-80 blur-lg animate-float" />
            <div className="absolute -bottom-8 -right-6 w-40 h-40 rounded-3xl bg-gradient-to-tr from-cyan-400 to-blue-600 opacity-80 blur-lg animate-float" style={{ animationDelay: '3s' }} />

            {/* Central Elevated Glass Masterpiece Card */}
            <Glass
              material="crystal"
              depth={3}
              interactiveLight
              noise="subtle"
              rounded="2xl"
              className="relative p-6 sm:p-8 space-y-6 shadow-2xl border border-white/30 backdrop-blur-2xl"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-400 to-indigo-600 flex items-center justify-center shadow-lg shadow-blue-500/30">
                    <Sparkles className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <h4 className="font-bold text-white text-base">Optics Engine v1</h4>
                    <p className="text-xs text-white/60">Depth 3 • Crystal Recipe</p>
                  </div>
                </div>
                <GlassBadge variant="success" size="sm" dot>
                  Active Sheen
                </GlassBadge>
              </div>

              <div className="p-4 rounded-xl bg-white/[0.04] border border-white/10 space-y-2">
                <div className="flex justify-between text-xs text-white/70">
                  <span>Surface Diffusion</span>
                  <span className="font-mono text-blue-300">24px</span>
                </div>
                <div className="w-full h-1.5 bg-white/10 rounded-full overflow-hidden">
                  <div className="w-[78%] h-full bg-gradient-to-r from-blue-400 to-indigo-400 rounded-full" />
                </div>
                <div className="flex justify-between text-xs text-white/70 pt-1">
                  <span>Specular Edge Reflection</span>
                  <span className="font-mono text-purple-300">85% Alpha</span>
                </div>
                <div className="w-full h-1.5 bg-white/10 rounded-full overflow-hidden">
                  <div className="w-[85%] h-full bg-gradient-to-r from-indigo-400 to-purple-400 rounded-full" />
                </div>
              </div>

              <div className="flex items-center justify-between pt-2">
                <div className="flex -space-x-2">
                  <div className="w-7 h-7 rounded-full bg-blue-500/80 border border-white/40 flex items-center justify-center text-[10px] font-bold">G</div>
                  <div className="w-7 h-7 rounded-full bg-purple-500/80 border border-white/40 flex items-center justify-center text-[10px] font-bold">L</div>
                  <div className="w-7 h-7 rounded-full bg-emerald-500/80 border border-white/40 flex items-center justify-center text-[10px] font-bold">A</div>
                  <div className="w-7 h-7 rounded-full bg-pink-500/80 border border-white/40 flex items-center justify-center text-[10px] font-bold">S</div>
                </div>
                <span className="text-xs text-white/60 font-medium">Passe o cursor para iluminar</span>
              </div>
            </Glass>
          </div>
        </div>
      </div>
    </section>
  );
}
