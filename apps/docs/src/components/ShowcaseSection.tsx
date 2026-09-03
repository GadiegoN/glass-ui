'use client';

import React, { useState } from 'react';
import {
  Glass,
  GlassCard,
  GlassButton,
  GlassIconButton,
  GlassBadge,
  GlassAvatar,
  GlassSwitch,
  GlassSlider,
  GlassDock,
} from '@gadiegon/glass-ui';
import {
  Play,
  Pause,
  SkipForward,
  SkipBack,
  Volume2,
  Heart,
  Shuffle,
  Repeat,
  Wifi,
  Bluetooth,
  Moon,
  Sun,
  Airplay,
  TrendingUp,
  ArrowUpRight,
  MoreVertical,
  Terminal,
  Folder,
  Compass,
  MessageSquare,
  Music,
  Camera,
  Settings,
  Sparkles,
  Layers,
  Layout,
  Radio,
} from 'lucide-react';

export function ShowcaseSection() {
  const [activeTab, setActiveTab] = useState<'dock' | 'music' | 'analytics' | 'control'>('dock');

  // Music player state
  const [isPlaying, setIsPlaying] = useState(true);
  const [liked, setLiked] = useState(false);
  const [trackProgress, setTrackProgress] = useState(42);
  const [volume, setVolume] = useState(75);

  // Control center state
  const [wifiEnabled, setWifiEnabled] = useState(true);
  const [bluetoothEnabled, setBluetoothEnabled] = useState(true);
  const [airdropEnabled, setAirdropEnabled] = useState(true);
  const [darkMode, setDarkMode] = useState(true);
  const [brightness, setBrightness] = useState(85);

  return (
    <section id="showcases" className="relative py-20 px-6 max-w-7xl mx-auto">
      <div className="text-center space-y-3 mb-12">
        <GlassBadge variant="success" size="md" dot>
          Real World Interfaces
        </GlassBadge>
        <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
          Superfícies em Ação
        </h2>
        <p className="text-white/60 max-w-2xl mx-auto text-base">
          Glass UI não é apenas para cards isolados. Veja como ecossistemas inteiros ganham vida
          através da linguagem de profundidade do vidro.
        </p>

        {/* Tab Selector Buttons */}
        <div className="flex justify-center pt-4">
          <div className="inline-flex p-1 rounded-2xl bg-white/10 backdrop-blur-md border border-white/10">
            <button
              onClick={() => setActiveTab('dock')}
              className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all ${
                activeTab === 'dock'
                  ? 'bg-white/20 text-white shadow-lg border border-white/20'
                  : 'text-white/60 hover:text-white'
              }`}
            >
              visionOS Dock
            </button>
            <button
              onClick={() => setActiveTab('music')}
              className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all ${
                activeTab === 'music'
                  ? 'bg-white/20 text-white shadow-lg border border-white/20'
                  : 'text-white/60 hover:text-white'
              }`}
            >
              Cyberpunk Audio
            </button>
            <button
              onClick={() => setActiveTab('analytics')}
              className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all ${
                activeTab === 'analytics'
                  ? 'bg-white/20 text-white shadow-lg border border-white/20'
                  : 'text-white/60 hover:text-white'
              }`}
            >
              Analytics Dashboard
            </button>
            <button
              onClick={() => setActiveTab('control')}
              className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all ${
                activeTab === 'control'
                  ? 'bg-white/20 text-white shadow-lg border border-white/20'
                  : 'text-white/60 hover:text-white'
              }`}
            >
              Control Center
            </button>
          </div>
        </div>
      </div>

      {/* Container for the Active Showcase */}
      <div className="relative rounded-3xl p-6 sm:p-12 overflow-hidden bg-black/40 border border-white/15 min-h-[500px] flex items-center justify-center">
        {/* Colorful backdrop orbs behind showcases */}
        <div className="absolute top-12 left-20 w-64 h-64 rounded-full bg-gradient-to-r from-blue-600 to-indigo-600 opacity-60 blur-3xl" />
        <div className="absolute bottom-10 right-20 w-72 h-72 rounded-full bg-gradient-to-r from-purple-600 to-pink-600 opacity-50 blur-3xl" />

        {/* TAB 1: visionOS / macOS Glass Dock */}
        {activeTab === 'dock' && (
          <div className="relative z-10 w-full max-w-2xl flex flex-col items-center space-y-8 animate-in fade-in duration-300">
            <div className="text-center space-y-2">
              <h3 className="text-xl font-bold text-white">Apple visionOS & macOS Glass Dock</h3>
              <p className="text-xs text-white/60">
                Passe o cursor sobre os ícones para notar a magnificação elástica e o reflexo especular na cápsula de vidro.
              </p>
            </div>

            {/* Desktop Mock Window */}
            <Glass depth={2} material="frosted" rounded="2xl" className="w-full p-6 border border-white/20 shadow-2xl">
              <div className="flex items-center justify-between pb-4 border-b border-white/10">
                <div className="flex items-center gap-2">
                  <span className="w-3 h-3 rounded-full bg-rose-500/80" />
                  <span className="w-3 h-3 rounded-full bg-amber-500/80" />
                  <span className="w-3 h-3 rounded-full bg-emerald-500/80" />
                  <span className="text-xs font-mono text-white/50 ml-2">Glass Desktop • visionOS Spatial Canvas</span>
                </div>
                <GlassBadge variant="purple" size="sm">Active Space</GlassBadge>
              </div>

              <div className="py-12 flex flex-col items-center justify-center text-center space-y-3">
                <div className="w-16 h-16 rounded-2xl bg-gradient-to-tr from-cyan-400 via-blue-500 to-purple-600 p-0.5 shadow-xl">
                  <div className="w-full h-full rounded-2xl bg-black/40 flex items-center justify-center">
                    <Sparkles className="w-8 h-8 text-white" />
                  </div>
                </div>
                <h4 className="text-lg font-bold text-white">Spatial Depth Engine</h4>
                <p className="text-xs text-white/60 max-w-sm">
                  Cápsulas de vidro com profundidade física e micro-sombras integradas.
                </p>
              </div>

              {/* The Actual Glass Dock */}
              <GlassDock depth={3} material="crystal" rounded="2xl" className="mt-4">
                <GlassDock.Item
                  icon={<Compass className="w-5 h-5 text-sky-400" />}
                  label="Safari"
                  isActive
                />
                <GlassDock.Item
                  icon={<Terminal className="w-5 h-5 text-emerald-400" />}
                  label="Terminal"
                  isActive
                />
                <GlassDock.Item
                  icon={<Folder className="w-5 h-5 text-blue-400" />}
                  label="Arquivos"
                />
                <GlassDock.Item
                  icon={<MessageSquare className="w-5 h-5 text-indigo-400" />}
                  label="Mensagens"
                  notificationCount={3}
                  isActive
                />
                <GlassDock.Item
                  icon={<Music className="w-5 h-5 text-pink-400" />}
                  label="Música"
                />
                <GlassDock.Item
                  icon={<Camera className="w-5 h-5 text-amber-400" />}
                  label="Fotos"
                />
                <GlassDock.Item
                  icon={<Settings className="w-5 h-5 text-slate-300" />}
                  label="Ajustes"
                />
              </GlassDock>
            </Glass>
          </div>
        )}

        {/* TAB 2: Cyberpunk Glass Music Player */}
        {activeTab === 'music' && (
          <div className="relative z-10 w-full max-w-md animate-in fade-in duration-300">
            <Glass
              material="crystal"
              depth={3}
              interactiveLight
              rounded="3xl"
              className="p-6 sm:p-8 shadow-2xl border border-white/30 backdrop-blur-2xl space-y-6"
            >
              {/* Album Art & Audio Spectrum Visualizer */}
              <div className="relative w-full aspect-square rounded-2xl overflow-hidden bg-gradient-to-tr from-purple-900 via-indigo-900 to-rose-900 flex items-center justify-center shadow-xl border border-white/20 group">
                {/* Glowing neon backdrop elements inside album */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent z-10" />
                <div className="w-36 h-36 rounded-full bg-gradient-to-tr from-rose-500 to-purple-500 blur-xl opacity-70 animate-pulse-slow" />
                
                {/* Animated Glass Audio Spectrum Visualizer Bars */}
                <div className="absolute bottom-4 inset-x-6 z-20 flex items-end justify-between h-14 gap-1">
                  {[40, 75, 55, 90, 60, 100, 45, 80, 70, 95, 50, 85, 65, 90, 40].map((h, i) => (
                    <div
                      key={i}
                      className="w-full bg-gradient-to-t from-blue-400 to-pink-400 rounded-full transition-all duration-300"
                      style={{
                        height: isPlaying ? `${h}%` : '15%',
                        opacity: 0.85,
                      }}
                    />
                  ))}
                </div>

                <div className="relative z-20 text-center space-y-1">
                  <Radio className="w-8 h-8 text-white/90 mx-auto animate-pulse" />
                  <span className="text-[10px] font-mono uppercase tracking-widest text-white/70 block">
                    Lossless Hi-Res Audio
                  </span>
                </div>
              </div>

              {/* Track Info */}
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="text-lg font-bold text-white tracking-tight">Refractive Echoes</h4>
                  <p className="text-xs text-white/60">Glass Odyssey • Liquid Ambient Vol. 2</p>
                </div>
                <button
                  onClick={() => setLiked(!liked)}
                  className={`p-2.5 rounded-full transition-colors ${
                    liked ? 'text-rose-400 bg-rose-500/20' : 'text-white/60 hover:text-white'
                  }`}
                >
                  <Heart className={`w-5 h-5 ${liked ? 'fill-rose-400' : ''}`} />
                </button>
              </div>

              {/* Scrub Slider */}
              <div className="space-y-1.5">
                <GlassSlider
                  value={trackProgress}
                  min={0}
                  max={100}
                  onChange={(v) => setTrackProgress(v)}
                />
                <div className="flex justify-between text-[11px] font-mono text-white/50">
                  <span>1:48</span>
                  <span>4:20</span>
                </div>
              </div>

              {/* Controls */}
              <div className="flex items-center justify-between">
                <button className="text-white/50 hover:text-white transition-colors">
                  <Shuffle className="w-4 h-4" />
                </button>
                <button className="text-white/70 hover:text-white transition-colors">
                  <SkipBack className="w-5 h-5" />
                </button>
                <GlassIconButton
                  size="xl"
                  variant="primary"
                  onClick={() => setIsPlaying(!isPlaying)}
                  className="shadow-xl shadow-blue-500/30"
                >
                  {isPlaying ? <Pause className="w-6 h-6" /> : <Play className="w-6 h-6 ml-1" />}
                </GlassIconButton>
                <button className="text-white/70 hover:text-white transition-colors">
                  <SkipForward className="w-5 h-5" />
                </button>
                <button className="text-white/50 hover:text-white transition-colors">
                  <Repeat className="w-4 h-4" />
                </button>
              </div>

              {/* Volume Slider */}
              <div className="flex items-center gap-3 pt-2 border-t border-white/10">
                <Volume2 className="w-4 h-4 text-white/60" />
                <GlassSlider
                  value={volume}
                  min={0}
                  max={100}
                  onChange={(v) => setVolume(v)}
                />
                <span className="text-[11px] font-mono text-white/60 w-8">{volume}%</span>
              </div>
            </Glass>
          </div>
        )}

        {/* TAB 3: Executive Analytics Dashboard */}
        {activeTab === 'analytics' && (
          <div className="relative z-10 w-full max-w-4xl space-y-6 animate-in fade-in duration-300">
            {/* KPI Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <GlassCard depth={2} material="crystal" className="p-5 space-y-2 border border-white/20">
                <div className="flex justify-between items-center text-xs text-white/60">
                  <span>Receita Recorrente</span>
                  <GlassBadge variant="success" size="sm" dot>+28.4%</GlassBadge>
                </div>
                <div className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
                  R$ 184.920
                </div>
                <p className="text-[11px] text-white/50">vs. R$ 143.900 no mês anterior</p>
              </GlassCard>

              <GlassCard depth={2} material="crystal" className="p-5 space-y-2 border border-white/20">
                <div className="flex justify-between items-center text-xs text-white/60">
                  <span>Usuários Ativos</span>
                  <GlassBadge variant="info" size="sm" dot>+14.2%</GlassBadge>
                </div>
                <div className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
                  42.850
                </div>
                <p className="text-[11px] text-white/50">89% de retenção líquida</p>
              </GlassCard>

              <GlassCard depth={2} material="crystal" className="p-5 space-y-2 border border-white/20">
                <div className="flex justify-between items-center text-xs text-white/60">
                  <span>Taxa de Conversão</span>
                  <GlassBadge variant="purple" size="sm" dot>+5.8%</GlassBadge>
                </div>
                <div className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
                  4.92%
                </div>
                <p className="text-[11px] text-white/50">Acima do benchmark da indústria</p>
              </GlassCard>
            </div>

            {/* Glass Transactions Table */}
            <GlassCard depth={1} material="frosted" className="p-6 border border-white/15">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h4 className="font-bold text-white text-base">Últimas Transações</h4>
                  <p className="text-xs text-white/50">Transações confirmadas na rede</p>
                </div>
                <GlassButton size="sm" variant="ghost">Exportar CSV</GlassButton>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full text-left text-sm">
                  <thead>
                    <tr className="border-b border-white/10 text-xs font-semibold text-white/50 uppercase tracking-wider">
                      <th className="pb-3">Cliente</th>
                      <th className="pb-3">Plano</th>
                      <th className="pb-3">Valor</th>
                      <th className="pb-3">Status</th>
                      <th className="pb-3 text-right">Data</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-white/5">
                    {[
                      { name: 'Sarah Connor', plan: 'Enterprise Spatial', value: 'R$ 4.290', status: 'Concluído', variant: 'success' },
                      { name: 'Alex Murphy', plan: 'Pro Glass Team', value: 'R$ 890', status: 'Processando', variant: 'warning' },
                      { name: 'Ellen Ripley', plan: 'Custom Studio', value: 'R$ 12.400', status: 'Concluído', variant: 'success' },
                    ].map((tx, idx) => (
                      <tr key={idx} className="hover:bg-white/[0.04] transition-colors">
                        <td className="py-3 flex items-center gap-3">
                          <GlassAvatar fallback={tx.name[0]} size="sm" status="online" />
                          <span className="font-medium text-white">{tx.name}</span>
                        </td>
                        <td className="py-3 text-white/70">{tx.plan}</td>
                        <td className="py-3 font-mono font-semibold text-white">{tx.value}</td>
                        <td className="py-3">
                          <GlassBadge variant={tx.variant as any} size="sm" dot>
                            {tx.status}
                          </GlassBadge>
                        </td>
                        <td className="py-3 text-right text-xs text-white/50 font-mono">Hoje, 14:32</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </GlassCard>
          </div>
        )}

        {/* TAB 4: Glass Control Center */}
        {activeTab === 'control' && (
          <div className="relative z-10 w-full max-w-sm animate-in fade-in duration-300">
            <Glass
              material="crystal"
              depth={3}
              interactiveLight
              rounded="3xl"
              className="p-6 shadow-2xl border border-white/25 backdrop-blur-2xl space-y-6"
            >
              <div className="flex items-center justify-between pb-3 border-b border-white/10">
                <h4 className="font-bold text-white text-base">Central de Controle</h4>
                <GlassBadge variant="info" size="sm">visionOS</GlassBadge>
              </div>

              {/* 2x2 Network Grid */}
              <div className="grid grid-cols-2 gap-3">
                <Glass
                  as="button"
                  depth={wifiEnabled ? 2 : 0}
                  opacity={wifiEnabled ? 0.35 : 0.1}
                  tint={wifiEnabled ? 'blue' : 'neutral'}
                  onClick={() => setWifiEnabled(!wifiEnabled)}
                  rounded="2xl"
                  className="p-3.5 flex items-center gap-3 text-left transition-all cursor-pointer hover:brightness-110"
                >
                  <div className={`p-2 rounded-xl ${wifiEnabled ? 'bg-blue-500 text-white' : 'bg-white/10 text-white/50'}`}>
                    <Wifi className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="text-xs font-bold text-white">Wi-Fi</div>
                    <div className="text-[10px] text-white/60">{wifiEnabled ? 'Glass-5GHz' : 'Desligado'}</div>
                  </div>
                </Glass>

                <Glass
                  as="button"
                  depth={bluetoothEnabled ? 2 : 0}
                  opacity={bluetoothEnabled ? 0.35 : 0.1}
                  tint={bluetoothEnabled ? 'blue' : 'neutral'}
                  onClick={() => setBluetoothEnabled(!bluetoothEnabled)}
                  rounded="2xl"
                  className="p-3.5 flex items-center gap-3 text-left transition-all cursor-pointer hover:brightness-110"
                >
                  <div className={`p-2 rounded-xl ${bluetoothEnabled ? 'bg-blue-500 text-white' : 'bg-white/10 text-white/50'}`}>
                    <Bluetooth className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="text-xs font-bold text-white">Bluetooth</div>
                    <div className="text-[10px] text-white/60">{bluetoothEnabled ? 'Conectado' : 'Desligado'}</div>
                  </div>
                </Glass>

                <Glass
                  as="button"
                  depth={airdropEnabled ? 2 : 0}
                  opacity={airdropEnabled ? 0.35 : 0.1}
                  tint={airdropEnabled ? 'blue' : 'neutral'}
                  onClick={() => setAirdropEnabled(!airdropEnabled)}
                  rounded="2xl"
                  className="p-3.5 flex items-center gap-3 text-left transition-all cursor-pointer hover:brightness-110"
                >
                  <div className={`p-2 rounded-xl ${airdropEnabled ? 'bg-blue-500 text-white' : 'bg-white/10 text-white/50'}`}>
                    <Airplay className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="text-xs font-bold text-white">AirDrop</div>
                    <div className="text-[10px] text-white/60">{airdropEnabled ? 'Todos' : 'Inativo'}</div>
                  </div>
                </Glass>

                <Glass
                  as="button"
                  depth={darkMode ? 2 : 0}
                  opacity={darkMode ? 0.35 : 0.1}
                  tint={darkMode ? 'purple' : 'neutral'}
                  onClick={() => setDarkMode(!darkMode)}
                  rounded="2xl"
                  className="p-3.5 flex items-center gap-3 text-left transition-all cursor-pointer hover:brightness-110"
                >
                  <div className={`p-2 rounded-xl ${darkMode ? 'bg-purple-500 text-white' : 'bg-white/10 text-white/50'}`}>
                    {darkMode ? <Moon className="w-4 h-4" /> : <Sun className="w-4 h-4" />}
                  </div>
                  <div>
                    <div className="text-xs font-bold text-white">Modo Escuro</div>
                    <div className="text-[10px] text-white/60">{darkMode ? 'Ativado' : 'Desativado'}</div>
                  </div>
                </Glass>
              </div>

              {/* Display Brightness Slider */}
              <div className="space-y-1.5 p-3 rounded-2xl bg-white/[0.04] border border-white/10">
                <div className="flex items-center justify-between text-xs text-white/70">
                  <div className="flex items-center gap-1.5">
                    <Sun className="w-3.5 h-3.5 text-amber-400" />
                    <span>Brilho da Tela</span>
                  </div>
                  <span className="font-mono text-white">{brightness}%</span>
                </div>
                <GlassSlider
                  value={brightness}
                  min={10}
                  max={100}
                  onChange={(v) => setBrightness(v)}
                />
              </div>
            </Glass>
          </div>
        )}
      </div>
    </section>
  );
}
