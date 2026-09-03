'use client';

import React, { useState } from 'react';
import {
  Glass,
  GlassCard,
  GlassButton,
  GlassIconButton,
  GlassInput,
  GlassTextarea,
  GlassSwitch,
  GlassSlider,
  GlassBadge,
  GlassAvatar,
  GlassTabs,
  GlassModal,
  GlassAlert,
  GlassDivider,
} from '@gadiegon/glass-ui';
import {
  Sparkles,
  Layers,
  Search,
  Mail,
  Send,
  Bell,
  Heart,
  Settings,
  Info,
  CheckCircle,
  AlertTriangle,
  AlertOctagon,
  ExternalLink,
} from 'lucide-react';

export function ComponentCatalog() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [switchState, setSwitchState] = useState(true);
  const [sliderVal, setSliderVal] = useState(60);
  const [btnLoading, setBtnLoading] = useState(false);

  const triggerLoading = () => {
    setBtnLoading(true);
    setTimeout(() => setBtnLoading(false), 2000);
  };

  return (
    <section id="components" className="relative py-20 px-6 max-w-7xl mx-auto">
      <div className="text-center space-y-3 mb-16">
        <GlassBadge variant="info" size="md" dot>
          Design System Elements
        </GlassBadge>
        <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
          Catálogo de Componentes
        </h2>
        <p className="text-white/60 max-w-2xl mx-auto text-base">
          Componentes acessíveis, fortemente tipados e projetados desde a base para a linguagem
          visual Glassmorphism.
        </p>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 items-start">
        {/* 1. GlassButton & GlassIconButton */}
        <GlassCard depth={1} material="crystal" className="p-6 space-y-4">
          <div className="flex items-center justify-between border-b border-white/10 pb-3">
            <h4 className="font-bold text-white text-base">GlassButton & Icons</h4>
            <GlassBadge variant="purple" size="sm">Buttons</GlassBadge>
          </div>
          <p className="text-xs text-white/60">
            Responde ao clique com contração física e ao hover com reflexo luminoso.
          </p>

          <div className="flex flex-wrap gap-2 pt-2">
            <GlassButton variant="primary" size="sm">Primary</GlassButton>
            <GlassButton variant="secondary" size="sm">Secondary</GlassButton>
            <GlassButton variant="danger" size="sm">Danger</GlassButton>
            <GlassButton variant="ghost" size="sm">Ghost</GlassButton>
          </div>

          <div className="flex items-center gap-3 pt-2">
            <GlassButton
              variant="primary"
              size="sm"
              isLoading={btnLoading}
              onClick={triggerLoading}
            >
              {btnLoading ? 'Processando' : 'Testar Loading'}
            </GlassButton>
            <GlassIconButton size="md" variant="primary">
              <Heart className="w-4 h-4" />
            </GlassIconButton>
            <GlassIconButton size="md" variant="secondary">
              <Bell className="w-4 h-4" />
            </GlassIconButton>
            <GlassIconButton size="md" variant="ghost">
              <Settings className="w-4 h-4" />
            </GlassIconButton>
          </div>
        </GlassCard>

        {/* 2. GlassInput & GlassTextarea */}
        <GlassCard depth={1} material="crystal" className="p-6 space-y-4">
          <div className="flex items-center justify-between border-b border-white/10 pb-3">
            <h4 className="font-bold text-white text-base">GlassInput & Forms</h4>
            <GlassBadge variant="info" size="sm">Formulários</GlassBadge>
          </div>
          <p className="text-xs text-white/60">
            Campos com contraste óptico aprimorado e halo de foco luminoso.
          </p>

          <div className="space-y-3 pt-1">
            <GlassInput
              placeholder="Pesquisar componentes..."
              leftIcon={<Search className="w-4 h-4" />}
            />
            <GlassInput
              placeholder="seu.email@exemplo.com"
              leftIcon={<Mail className="w-4 h-4" />}
              rightIcon={<Send className="w-4 h-4" />}
            />
            <GlassTextarea
              rows={2}
              placeholder="Digite sua mensagem em vidro..."
            />
          </div>
        </GlassCard>

        {/* 3. GlassSwitch & GlassSlider */}
        <GlassCard depth={1} material="crystal" className="p-6 space-y-4">
          <div className="flex items-center justify-between border-b border-white/10 pb-3">
            <h4 className="font-bold text-white text-base">GlassSwitch & Slider</h4>
            <GlassBadge variant="success" size="sm">Controles</GlassBadge>
          </div>
          <p className="text-xs text-white/60">
            Toggles deslizantes com indicador translúcido e trilhos táteis.
          </p>

          <div className="space-y-4 pt-2">
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold text-white">Efeito de Blur Ativo</span>
              <GlassSwitch checked={switchState} onCheckedChange={(v) => setSwitchState(v)} />
            </div>

            <div className="space-y-1.5">
              <div className="flex justify-between text-xs text-white/70">
                <span>Intensidade de Refração</span>
                <span className="font-mono text-blue-400">{sliderVal}%</span>
              </div>
              <GlassSlider
                value={sliderVal}
                min={0}
                max={100}
                onChange={(v) => setSliderVal(v)}
              />
            </div>
          </div>
        </GlassCard>

        {/* 4. GlassBadge & GlassAvatar */}
        <GlassCard depth={1} material="crystal" className="p-6 space-y-4">
          <div className="flex items-center justify-between border-b border-white/10 pb-3">
            <h4 className="font-bold text-white text-base">GlassBadge & Avatar</h4>
            <GlassBadge variant="purple" size="sm">Identidade</GlassBadge>
          </div>
          <p className="text-xs text-white/60">
            Badges de status translúcidos e avatares com borda de vidro polida.
          </p>

          <div className="flex flex-wrap gap-2 pt-1">
            <GlassBadge variant="default" size="sm">Default</GlassBadge>
            <GlassBadge variant="success" size="sm" dot>Online</GlassBadge>
            <GlassBadge variant="warning" size="sm" dot>Alerta</GlassBadge>
            <GlassBadge variant="error" size="sm" dot>Crítico</GlassBadge>
            <GlassBadge variant="purple" size="sm">Spatial</GlassBadge>
          </div>

          <div className="flex items-center gap-3 pt-2">
            <GlassAvatar fallback="JD" size="sm" status="online" />
            <GlassAvatar fallback="AG" size="md" status="busy" />
            <GlassAvatar fallback="GU" size="lg" status="away" />
          </div>
        </GlassCard>

        {/* 5. GlassTabs */}
        <GlassCard depth={1} material="crystal" className="p-6 space-y-4">
          <div className="flex items-center justify-between border-b border-white/10 pb-3">
            <h4 className="font-bold text-white text-base">GlassTabs</h4>
            <GlassBadge variant="info" size="sm">Navegação</GlassBadge>
          </div>
          <p className="text-xs text-white/60">
            Abas com cápsula de destaque que desliza sob o item selecionado.
          </p>

          <div className="pt-1">
            <GlassTabs defaultValue="design">
              <GlassTabs.List className="w-full justify-between">
                <GlassTabs.Trigger value="design">Design</GlassTabs.Trigger>
                <GlassTabs.Trigger value="physics">Física</GlassTabs.Trigger>
                <GlassTabs.Trigger value="tokens">Tokens</GlassTabs.Trigger>
              </GlassTabs.List>
              <GlassTabs.Content value="design">
                <p className="text-xs text-white/70 p-2">
                  Princípio visual com bordas especulares e transmissão luminosa.
                </p>
              </GlassTabs.Content>
              <GlassTabs.Content value="physics">
                <p className="text-xs text-white/70 p-2">
                  Cálculo algorítmico de saturação, difusão e elevação por depth.
                </p>
              </GlassTabs.Content>
              <GlassTabs.Content value="tokens">
                <p className="text-xs text-white/70 p-2">
                  CSS Variables nativas com suporte a temas e herança direta.
                </p>
              </GlassTabs.Content>
            </GlassTabs>
          </div>
        </GlassCard>

        {/* 6. GlassModal & Dialog Trigger */}
        <GlassCard depth={1} material="crystal" className="p-6 space-y-4">
          <div className="flex items-center justify-between border-b border-white/10 pb-3">
            <h4 className="font-bold text-white text-base">GlassModal (Depth 4)</h4>
            <GlassBadge variant="success" size="sm">Overlays</GlassBadge>
          </div>
          <p className="text-xs text-white/60">
            Janelas modais em profundidade máxima com backdrop inteligente.
          </p>

          <div className="pt-4 flex flex-col items-start gap-3">
            <GlassButton
              variant="primary"
              size="md"
              onClick={() => setIsModalOpen(true)}
              className="gap-2"
            >
              <ExternalLink className="w-4 h-4" />
              <span>Abrir GlassModal</span>
            </GlassButton>
            <span className="text-[11px] text-white/50">Clique para testar o backdrop blur</span>
          </div>

          {/* The Modal */}
          <GlassModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
            <GlassModal.Header>
              <GlassModal.Title>Superfície Glass Depth 4</GlassModal.Title>
              <GlassModal.Description>
                Esta janela modal utiliza a física de profundidade mais alta da biblioteca,
                com iluminação especular e difusão de 36px sobre o backdrop desfocado.
              </GlassModal.Description>
            </GlassModal.Header>

            <div className="p-4 rounded-xl bg-white/[0.04] border border-white/10 space-y-2 my-2">
              <div className="text-xs font-semibold text-white">Acessibilidade Total</div>
              <p className="text-xs text-white/70">
                Pressione <kbd className="px-1.5 py-0.5 rounded bg-white/10 text-white font-mono text-[10px]">ESC</kbd> ou clique fora para fechar suavemente.
              </p>
            </div>

            <GlassModal.Footer>
              <GlassButton variant="ghost" size="sm" onClick={() => setIsModalOpen(false)}>
                Cancelar
              </GlassButton>
              <GlassButton variant="primary" size="sm" onClick={() => setIsModalOpen(false)}>
                Entendido
              </GlassButton>
            </GlassModal.Footer>
          </GlassModal>
        </GlassCard>
      </div>

      {/* Glass Alerts Section */}
      <div className="mt-12 space-y-4">
        <h3 className="text-xl font-bold text-white">GlassAlerts Luminosos</h3>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <GlassAlert
            variant="info"
            title="Informação"
            icon={<Info className="w-5 h-5 text-blue-400" />}
          >
            Atualização disponível no canal Canary.
          </GlassAlert>

          <GlassAlert
            variant="success"
            title="Sucesso"
            icon={<CheckCircle className="w-5 h-5 text-emerald-400" />}
          >
            Tokens de vidro compilados com êxito.
          </GlassAlert>

          <GlassAlert
            variant="warning"
            title="Atenção"
            icon={<AlertTriangle className="w-5 h-5 text-amber-400" />}
          >
            Verifique o contraste em telas claras.
          </GlassAlert>

          <GlassAlert
            variant="error"
            title="Alerta Crítico"
            icon={<AlertOctagon className="w-5 h-5 text-rose-400" />}
          >
            GPU throttled: modo performance ativo.
          </GlassAlert>
        </div>
      </div>
    </section>
  );
}
