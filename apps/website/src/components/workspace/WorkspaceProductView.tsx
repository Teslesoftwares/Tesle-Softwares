'use client';

import { Brain, Sparkles, ArrowLeft } from 'lucide-react';
import { motion } from 'framer-motion';
import { useWorkspace } from './WorkspaceContext';
import { products, getProductBySlug } from '@/data/products';
import { getAICapabilities } from '@/data/ai';
import { useAI } from '@/components/ai/AIContext';

export function WorkspaceProductView() {
  const { activeApp, setActiveView, setActiveApp } = useWorkspace();
  const { openPanel } = useAI();

  const product = activeApp ? getProductBySlug(activeApp) : null;
  const capabilities = activeApp ? getAICapabilities(activeApp) : [];

  if (!product) {
    return (
      <div className="p-8 text-center">
        <p className="text-muted text-sm">Select an app to get started.</p>
      </div>
    );
  }

  const Icon = product.icon;

  return (
    <div className="p-4 sm:p-6 lg:p-8 max-w-6xl">
      {/* Back button */}
      <button
        onClick={() => { setActiveApp(null); setActiveView('apps'); }}
        className="flex items-center gap-1.5 text-xs text-muted hover:text-text transition-colors mb-4"
      >
        <ArrowLeft className="w-3.5 h-3.5" />
        Back to Apps
      </button>

      {/* Product Header */}
      <div className="flex items-start gap-4 mb-6">
        <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${product.color} border border-white/[0.08] flex items-center justify-center`}>
          <Icon className="w-7 h-7 text-text" />
        </div>
        <div className="flex-1 min-w-0">
          <h1 className="text-2xl font-bold text-text">{product.name.replace('Tesle ', '')}</h1>
          <p className="text-sm text-muted mt-1">{product.tagline}</p>
          <p className="text-xs text-muted mt-0.5">{product.description}</p>
        </div>
      </div>

      {/* AI Section */}
      <div className="rounded-2xl bg-gradient-to-br from-fuchsia-500/[0.05] to-violet-500/[0.05] border border-fuchsia-500/10 p-5 mb-8">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-fuchsia-500/30 to-violet-500/30 border border-white/[0.08] flex items-center justify-center">
            <Brain className="w-4 h-4 text-accent" />
          </div>
          <div>
            <h3 className="text-sm font-semibold text-text">Tesle AI  {product.name.replace('Tesle ', '')}</h3>
            <p className="text-[11px] text-muted">AI-powered assistance for this app</p>
          </div>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-2.5">
          {capabilities.map((cap) => {
            const CapIcon = cap.icon;
            return (
              <motion.button
                key={cap.id}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => openPanel(cap.id)}
                className="flex items-start gap-3 p-3 rounded-xl glass hover:bg-white/[0.06] hover:border-accent/20 transition-all text-left group"
              >
                <div className={`w-8 h-8 rounded-lg bg-gradient-to-br ${cap.color}/20 border border-white/[0.06] flex items-center justify-center shrink-0`}>
                  <CapIcon className="w-4 h-4 text-text" />
                </div>
                <div className="min-w-0">
                  <div className="text-xs font-medium text-text group-hover:text-accent transition-colors">{cap.name}</div>
                  <div className="text-[10px] text-muted mt-0.5 line-clamp-1">{cap.description}</div>
                </div>
                <Sparkles className="w-3 h-3 text-accent/40 shrink-0 mt-1 opacity-0 group-hover:opacity-100 transition-opacity" />
              </motion.button>
            );
          })}
        </div>
      </div>

      {/* Features Grid */}
      <div className="mb-8">
        <h2 className="text-sm font-semibold text-text mb-3">Features</h2>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {product.features.map((f, i) => {
            const FIcon = f.icon;
            return (
              <div key={i} className="rounded-xl glass p-4 hover:border-white/[0.1] transition-colors">
                <FIcon className="w-5 h-5 text-accent/70 mb-2" />
                <h3 className="text-sm font-medium text-text">{f.title}</h3>
                <p className="text-xs text-muted mt-1">{f.description}</p>
              </div>
            );
          })}
        </div>
      </div>

      {/* Modules */}
      <div>
        <h2 className="text-sm font-semibold text-text mb-3">Modules</h2>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {product.modules.map((m, i) => (
            <div key={i} className="rounded-xl glass p-4">
              <h3 className="text-sm font-medium text-text">{m.name}</h3>
              <p className="text-xs text-muted mt-1">{m.description}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
