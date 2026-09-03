'use client';

import React from 'react';
import { Glass } from '@glass-ui/react';
import { Palette } from 'lucide-react';

export type BackgroundEnv = 'aurora' | 'cyberpunk' | 'obsidian' | 'nebula' | 'crystal-light';

interface BackgroundSwitcherProps {
  current: BackgroundEnv;
  onChange: (env: BackgroundEnv) => void;
}

export function BackgroundSwitcher({ current, onChange }: BackgroundSwitcherProps) {
  const options: { id: BackgroundEnv; label: string; preview: string }[] = [
    {
      id: 'aurora',
      label: 'Aurora',
      preview: 'from-sky-400 via-emerald-400 to-indigo-600',
    },
    {
      id: 'cyberpunk',
      label: 'Cyberpunk',
      preview: 'from-pink-500 via-purple-500 to-cyan-400',
    },
    {
      id: 'nebula',
      label: 'Nebula',
      preview: 'from-indigo-500 via-purple-600 to-pink-500',
    },
    {
      id: 'obsidian',
      label: 'Obsidian OLED',
      preview: 'from-zinc-900 to-black',
    },
    {
      id: 'crystal-light',
      label: 'Light Crystal',
      preview: 'from-slate-200 via-indigo-100 to-pink-100',
    },
  ];

  return (
    <div className="fixed bottom-6 right-6 z-50">
      <Glass
        depth={3}
        material="crystal"
        rounded="full"
        className="flex items-center gap-2 p-1.5 shadow-2xl border border-white/20 backdrop-blur-xl"
      >
        <div className="pl-3 pr-1 flex items-center gap-1.5 text-xs font-semibold text-white/70">
          <Palette className="w-3.5 h-3.5 text-blue-400" />
          <span className="hidden sm:inline">Background:</span>
        </div>

        <div className="flex items-center gap-1">
          {options.map((opt) => (
            <button
              key={opt.id}
              onClick={() => onChange(opt.id)}
              title={opt.label}
              className={`flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium transition-all ${
                current === opt.id
                  ? 'bg-white/20 text-white shadow-md border border-white/30'
                  : 'text-white/60 hover:text-white hover:bg-white/10'
              }`}
            >
              <span
                className={`w-2.5 h-2.5 rounded-full bg-gradient-to-tr ${opt.preview} border border-white/40`}
              />
              <span className="hidden md:inline">{opt.label}</span>
            </button>
          ))}
        </div>
      </Glass>
    </div>
  );
}
