'use client';

import React from 'react';
import { Glass, GlassBadge } from '@gadiegon/glass-ui';
import { Sparkles, Heart } from 'lucide-react';

export function Footer() {
  return (
    <footer className="relative border-t border-white/10 mt-24 py-12 px-6 max-w-7xl mx-auto">
      <div className="flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="flex items-center gap-3">
          <div className="w-7 h-7 rounded-lg bg-gradient-to-tr from-blue-500 to-purple-500 flex items-center justify-center">
            <Sparkles className="w-4 h-4 text-white" />
          </div>
          <span className="font-bold text-white text-base">Glass UI</span>
          <span className="text-white/40 text-sm">• The Glass First Component Library</span>
        </div>

        <div className="flex items-center gap-2 text-xs text-white/50">
          <span>Construído para Next.js & React</span>
          <span>•</span>
          <span>Open Source sob licença MIT</span>
        </div>
      </div>
    </footer>
  );
}
