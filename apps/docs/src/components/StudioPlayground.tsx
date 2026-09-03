'use client';

import React, { useState } from 'react';
import {
  Glass,
  GlassCard,
  GlassButton,
  GlassSwitch,
  GlassSlider,
  GlassBadge,
  GlassMaterial,
  GlassDepth,
  GlassBorder,
  GlassNoise,
} from '@gadiegon/glass-ui';
import {
  Sliders,
  Code2,
  Copy,
  Check,
  RotateCcw,
  Sparkles,
  Layers,
  Sun,
  Droplets,
} from 'lucide-react';

export function StudioPlayground() {
  const [material, setMaterial] = useState<GlassMaterial>('crystal');
  const [depth, setDepth] = useState<GlassDepth>(2);
  const [blur, setBlur] = useState<number>(18);
  const [opacity, setOpacity] = useState<number>(0.16);
  const [saturation, setSaturation] = useState<number>(2.0);
  const [brightness, setBrightness] = useState<number>(1.1);
  const [tint, setTint] = useState<string>('neutral');
  const [border, setBorder] = useState<GlassBorder>('specular');
  const [specular, setSpecular] = useState<boolean>(true);
  const [interactiveLight, setInteractiveLight] = useState<boolean>(true);
  const [noise, setNoise] = useState<GlassNoise>('subtle');
  const [copied, setCopied] = useState(false);
  const [codeMode, setCodeMode] = useState<'react' | 'css'>('react');

  const materials: { id: GlassMaterial; label: string; desc: string }[] = [
    { id: 'frosted', label: 'Frosted', desc: 'Equilíbrio clássico de difusão' },
    { id: 'crystal', label: 'Crystal', desc: 'Super transparência e refração' },
    { id: 'liquid', label: 'Liquid', desc: 'Vidro fluido e orgânico' },
    { id: 'smoked', label: 'Smoked', desc: 'Vidro fumê escuro sofisticado' },
    { id: 'milky', label: 'Milky', desc: 'Opalescente e leitoso' },
    { id: 'iridescent', label: 'Iridescent', desc: 'Reflexos furta-cor prismáticos' },
    { id: 'clear', label: 'Clear', desc: 'Ultra-mínimo de precisão' },
    { id: 'tinted', label: 'Tinted', desc: 'Cor pura saturada' },
  ];

  const tints: { id: string; label: string; color: string }[] = [
    { id: 'neutral', label: 'Neutral', color: '#ffffff' },
    { id: 'slate', label: 'Slate', color: '#94a3b8' },
    { id: 'blue', label: 'Blue', color: '#3b82f6' },
    { id: 'purple', label: 'Purple', color: '#a855f7' },
    { id: 'emerald', label: 'Emerald', color: '#10b981' },
    { id: 'amber', label: 'Amber', color: '#f59e0b' },
    { id: 'rose', label: 'Rose', color: '#f43f5e' },
    { id: 'cyan', label: 'Cyan', color: '#06b6d4' },
  ];

  const resetDefaults = () => {
    setMaterial('crystal');
    setDepth(2);
    setBlur(18);
    setOpacity(0.16);
    setSaturation(2.0);
    setBrightness(1.1);
    setTint('neutral');
    setBorder('specular');
    setSpecular(true);
    setInteractiveLight(true);
    setNoise('subtle');
  };

  const generatedReactCode = `<Glass
  material="${material}"
  depth={${depth}}
  blur={${blur}}
  opacity={${opacity}}
  saturation={${saturation}}
  brightness={${brightness}}
  tint="${tint}"
  border="${border}"
  specular={${specular}}
  interactiveLight={${interactiveLight}}
  noise="${noise}"
  rounded="2xl"
>
  <div className="p-8">
    <h3>Glass Digital Surface</h3>
    <p>Physics-driven refractive glass</p>
  </div>
</Glass>`;

  const generatedCSSCode = `.glass-surface {
  backdrop-filter: blur(${blur}px) saturate(${saturation * 100}%) brightness(${brightness * 100}%);
  background-color: rgba(${tint === 'neutral' ? '255, 255, 255' : tint}, ${opacity});
  border: 1px solid rgba(255, 255, 255, ${specular ? 0.35 : 0.15});
  box-shadow: 0 ${depth * 8}px ${depth * 16}px rgba(0, 0, 0, ${0.15 + depth * 0.08});
  border-radius: 1rem;
}`;

  const copyCode = () => {
    navigator.clipboard.writeText(codeMode === 'react' ? generatedReactCode : generatedCSSCode);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section id="studio" className="relative py-20 px-6 max-w-7xl mx-auto">
      <div className="text-center space-y-3 mb-12">
        <GlassBadge variant="purple" size="md" dot>
          Interactive Engine
        </GlassBadge>
        <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
          Glass Engine Studio
        </h2>
        <p className="text-white/60 max-w-2xl mx-auto text-base">
          Ajuste as propriedades físicas do material em tempo real e copie o código pronto para
          usar em qualquer projeto React.
        </p>
      </div>

      <div className="grid lg:grid-cols-12 gap-8 items-start">
        {/* Left 5 Cols: Controls Panel */}
        <div className="lg:col-span-5 space-y-6">
          <GlassCard depth={1} className="space-y-6 p-6">
            <div className="flex items-center justify-between border-b border-white/10 pb-4">
              <div className="flex items-center gap-2">
                <Sliders className="w-5 h-5 text-blue-400" />
                <h3 className="font-bold text-white text-base">Controles Ópticos</h3>
              </div>
              <button
                onClick={resetDefaults}
                className="text-xs text-white/50 hover:text-white flex items-center gap-1 transition-colors"
                title="Restaurar padrão"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>Restaurar</span>
              </button>
            </div>

            {/* Material Presets Selector */}
            <div className="space-y-2">
              <label className="text-xs font-semibold text-white/70 uppercase tracking-wider">
                Material Preset
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                {materials.map((m) => (
                  <button
                    key={m.id}
                    onClick={() => {
                      setMaterial(m.id);
                      if (m.id === 'liquid') setBlur(28);
                      if (m.id === 'crystal') setBlur(14);
                      if (m.id === 'smoked') setOpacity(0.5);
                    }}
                    className={`px-3 py-2 rounded-xl text-xs font-medium transition-all text-left border ${
                      material === m.id
                        ? 'bg-blue-500/25 border-blue-400 text-white shadow-lg shadow-blue-500/20'
                        : 'bg-white/[0.04] border-white/10 text-white/70 hover:bg-white/[0.08]'
                    }`}
                  >
                    <div className="font-bold">{m.label}</div>
                    <div className="text-[10px] text-white/40 truncate">{m.desc}</div>
                  </button>
                ))}
              </div>
            </div>

            {/* Depth Level (0 to 4) */}
            <div className="space-y-2">
              <div className="flex justify-between text-xs font-semibold text-white/70">
                <span className="uppercase tracking-wider">Profundidade (Depth)</span>
                <span className="text-blue-400 font-mono">Nível {depth}</span>
              </div>
              <div className="grid grid-cols-5 gap-2">
                {([0, 1, 2, 3, 4] as GlassDepth[]).map((d) => (
                  <button
                    key={d}
                    onClick={() => setDepth(d)}
                    className={`py-1.5 rounded-lg text-xs font-bold transition-all border ${
                      depth === d
                        ? 'bg-white/20 border-white/40 text-white shadow-md'
                        : 'bg-white/[0.03] border-white/10 text-white/50 hover:bg-white/[0.08]'
                    }`}
                  >
                    D{d}
                  </button>
                ))}
              </div>
            </div>

            {/* Sliders: Blur & Opacity */}
            <div className="space-y-4">
              <div className="space-y-1.5">
                <div className="flex justify-between text-xs font-semibold text-white/70">
                  <span>Blur (Difusão)</span>
                  <span className="text-blue-400 font-mono">{blur}px</span>
                </div>
                <GlassSlider
                  min={0}
                  max={60}
                  step={1}
                  value={blur}
                  onChange={(v) => setBlur(v)}
                />
              </div>

              <div className="space-y-1.5">
                <div className="flex justify-between text-xs font-semibold text-white/70">
                  <span>Opacidade</span>
                  <span className="text-blue-400 font-mono">{Math.round(opacity * 100)}%</span>
                </div>
                <GlassSlider
                  min={0.02}
                  max={0.9}
                  step={0.01}
                  value={opacity}
                  onChange={(v) => setOpacity(v)}
                />
              </div>

              <div className="space-y-1.5">
                <div className="flex justify-between text-xs font-semibold text-white/70">
                  <span>Saturação Visual</span>
                  <span className="text-blue-400 font-mono">{Math.round(saturation * 100)}%</span>
                </div>
                <GlassSlider
                  min={0.8}
                  max={3.0}
                  step={0.1}
                  value={saturation}
                  onChange={(v) => setSaturation(v)}
                />
              </div>
            </div>

            {/* Tint Color Selector */}
            <div className="space-y-2">
              <label className="text-xs font-semibold text-white/70 uppercase tracking-wider">
                Matiz do Vidro (Tint)
              </label>
              <div className="flex items-center gap-2 flex-wrap">
                {tints.map((t) => (
                  <button
                    key={t.id}
                    onClick={() => setTint(t.id)}
                    title={t.label}
                    className={`w-7 h-7 rounded-full transition-transform border flex items-center justify-center ${
                      tint === t.id ? 'scale-110 border-white ring-2 ring-white/40' : 'border-white/20 hover:scale-105'
                    }`}
                    style={{ backgroundColor: t.color }}
                  >
                    {tint === t.id && <Check className="w-3.5 h-3.5 text-black/80" />}
                  </button>
                ))}
              </div>
            </div>

            {/* Toggles: Specular Highlight, Sheen, Noise */}
            <div className="space-y-3 pt-2 border-t border-white/10">
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-xs font-semibold text-white">Borda Especular (Light Edge)</div>
                  <div className="text-[11px] text-white/50">Simula o chanfro e refração da luz</div>
                </div>
                <GlassSwitch checked={specular} onCheckedChange={(c) => setSpecular(c)} />
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <div className="text-xs font-semibold text-white">Reflexo Dinâmico ao Cursor</div>
                  <div className="text-[11px] text-white/50">Sheen de luz que acompanha o mouse</div>
                </div>
                <GlassSwitch
                  checked={interactiveLight}
                  onCheckedChange={(c) => setInteractiveLight(c)}
                />
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <div className="text-xs font-semibold text-white">Micro-textura (Ruído Anti-Banding)</div>
                  <div className="text-[11px] text-white/50">Evita artefatos e adiciona tato físico</div>
                </div>
                <GlassSwitch
                  checked={noise !== false}
                  onCheckedChange={(c) => setNoise(c ? 'subtle' : false)}
                />
              </div>
            </div>
          </GlassCard>
        </div>

        {/* Right 7 Cols: Live Stage Preview & Code Generator */}
        <div className="lg:col-span-7 space-y-6">
          {/* Live Stage with colorful background elements beneath */}
          <div className="relative rounded-3xl p-8 sm:p-12 overflow-hidden bg-black/40 border border-white/10 min-h-[460px] flex items-center justify-center">
            {/* Colorful underlying graphics to test refraction */}
            <div className="absolute top-10 left-10 w-44 h-44 rounded-full bg-gradient-to-tr from-rose-500 to-amber-400 opacity-80 blur-xl animate-float" />
            <div
              className="absolute bottom-8 right-12 w-52 h-52 rounded-full bg-gradient-to-tr from-cyan-400 via-blue-600 to-indigo-600 opacity-75 blur-xl animate-float"
              style={{ animationDelay: '2.5s' }}
            />
            <div className="absolute inset-0 flex items-center justify-center select-none pointer-events-none opacity-25">
              <span className="text-8xl sm:text-9xl font-black text-white/10 tracking-tighter">
                GLASS
              </span>
            </div>

            {/* The Live Interactive Glass Component */}
            <Glass
              material={material}
              depth={depth}
              blur={blur}
              opacity={opacity}
              saturation={saturation}
              brightness={brightness}
              tint={tint}
              border={border}
              specular={specular}
              interactiveLight={interactiveLight}
              noise={noise}
              rounded="2xl"
              className="relative z-10 w-full max-w-md p-8 shadow-2xl transition-all duration-300 border"
            >
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-white/10 border border-white/30 flex items-center justify-center shadow-lg">
                      <Sparkles className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <h4 className="font-bold text-white text-lg capitalize">{material} Surface</h4>
                      <p className="text-xs text-white/60">Depth {depth} • Tint {tint}</p>
                    </div>
                  </div>
                  <GlassBadge variant="info" size="sm">
                    {blur}px Blur
                  </GlassBadge>
                </div>

                <p className="text-sm text-white/80 leading-relaxed">
                  Observe como os gradientes de fundo e o texto refratam sob esta superfície.
                  Mova o cursor para notar o brilho especular dinâmico na borda e no reflexo.
                </p>

                <div className="flex items-center gap-3 pt-2">
                  <GlassButton variant="primary" size="sm">
                    Ação Primária
                  </GlassButton>
                  <GlassButton variant="secondary" size="sm">
                    Secundário
                  </GlassButton>
                </div>
              </div>
            </Glass>
          </div>

          {/* Code Generator & Exporter */}
          <GlassCard depth={1} className="p-6">
            <div className="flex items-center justify-between border-b border-white/10 pb-3 mb-4">
              <div className="flex items-center gap-2">
                <Code2 className="w-4 h-4 text-emerald-400" />
                <span className="font-bold text-sm text-white">Código Gerado</span>
                <div className="flex items-center ml-4 bg-white/10 rounded-lg p-0.5 text-xs">
                  <button
                    onClick={() => setCodeMode('react')}
                    className={`px-2.5 py-1 rounded-md transition-all ${
                      codeMode === 'react' ? 'bg-blue-500 text-white font-semibold' : 'text-white/60 hover:text-white'
                    }`}
                  >
                    React (JSX)
                  </button>
                  <button
                    onClick={() => setCodeMode('css')}
                    className={`px-2.5 py-1 rounded-md transition-all ${
                      codeMode === 'css' ? 'bg-blue-500 text-white font-semibold' : 'text-white/60 hover:text-white'
                    }`}
                  >
                    Pure CSS
                  </button>
                </div>
              </div>

              <GlassButton size="sm" variant="ghost" onClick={copyCode} className="gap-1.5 text-xs">
                {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copied ? 'Copiado!' : 'Copiar'}</span>
              </GlassButton>
            </div>

            <pre className="font-mono text-xs text-blue-200/90 bg-black/50 p-4 rounded-xl overflow-x-auto border border-white/10 leading-relaxed select-text">
              <code>{codeMode === 'react' ? generatedReactCode : generatedCSSCode}</code>
            </pre>
          </GlassCard>
        </div>
      </div>
    </section>
  );
}
