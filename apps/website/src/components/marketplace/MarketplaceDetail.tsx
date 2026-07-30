'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  X, Star, Download, Check, Plus, ExternalLink,
  Globe, Calendar, Shield, ChevronRight,
} from 'lucide-react';
import { type MarketplaceItem, type MarketplaceItemType } from '@/data/marketplace';
import { cn } from '@tesle/ui';

interface MarketplaceDetailProps {
  item: MarketplaceItem | null;
  open: boolean;
  onClose: () => void;
  installed?: boolean;
  onInstall?: (item: MarketplaceItem) => void;
}

const typeLabels: Record<MarketplaceItemType, string> = {
  app: 'App', integration: 'Integration', theme: 'Theme',
  template: 'Template', report: 'Report',
  ai_agent: 'AI Agent', extension: 'Extension',
};

export function MarketplaceDetail({ item, open, onClose, installed, onInstall }: MarketplaceDetailProps) {
  const [activeScreenshot, setActiveScreenshot] = useState(0);

  if (!item) return null;
  const Icon = item.icon;

  return (
    <AnimatePresence>
      {open && (
        <div className="fixed inset-0 z-[70] flex">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            onClick={onClose}
          />
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', stiffness: 400, damping: 35 }}
            className="absolute right-0 top-0 bottom-0 w-full max-w-2xl bg-card border-l border-glass shadow-2xl flex flex-col overflow-hidden"
          >
            {/* Header */}
            <div className="flex items-center justify-between px-6 py-4 border-b border-glass shrink-0">
              <div className="flex items-center gap-3">
                <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${item.color} border border-glass flex items-center justify-center`}>
                  <Icon className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h2 className="text-base font-semibold text-text">{item.name}</h2>
                  <p className="text-[11px] text-muted">{item.provider} · {typeLabels[item.type]}</p>
                </div>
              </div>
              <button onClick={onClose} className="p-2 rounded-lg text-muted hover:text-white hover:bg-white/5 transition-colors">
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Body */}
            <div className="flex-1 overflow-y-auto">
              {/* Screenshot preview */}
              <div className={`h-48 bg-gradient-to-br ${item.color}/10 via-transparent to-transparent flex items-center justify-center border-b border-white/[0.06]`}>
                <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${item.color} border border-white/[0.08] flex items-center justify-center`}>
                  <Icon className="w-8 h-8 text-white" />
                </div>
              </div>

              <div className="p-6 space-y-6">
                {/* Rating & installs */}
                <div className="flex items-center gap-4 flex-wrap">
                  <div className="flex items-center gap-1.5">
                    <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                    <span className="text-sm font-semibold text-text">{item.rating}</span>
                    <span className="text-xs text-muted">({item.ratingCount.toLocaleString()} ratings)</span>
                  </div>
                  <div className="w-px h-4 bg-white/[0.06]" />
                  <span className="text-xs text-muted">{item.installCount.toLocaleString()} installs</span>
                  <div className="w-px h-4 bg-white/[0.06]" />
                  <span className="text-xs text-muted">v{item.version}</span>
                  <div className="w-px h-4 bg-white/[0.06]" />
                  <span className="text-xs text-muted">Updated {item.updatedAt}</span>
                </div>

                {/* Tags */}
                <div className="flex items-center gap-2 flex-wrap">
                  <span className="text-[10px] font-medium px-2 py-0.5 rounded-full bg-white/[0.04] border border-white/[0.06] text-muted capitalize">{item.pricing}{item.price ? ` · ${item.price}` : ''}</span>
                  <span className="text-[10px] font-medium px-2 py-0.5 rounded-full bg-white/[0.04] border border-white/[0.06] text-muted">{item.category}</span>
                  {item.verified && <span className="text-[10px] font-medium px-2 py-0.5 rounded-full bg-emerald-400/10 border border-emerald-400/20 text-emerald-400">Verified</span>}
                  {item.featured && <span className="text-[10px] font-medium px-2 py-0.5 rounded-full bg-amber-400/10 border border-amber-400/20 text-amber-400">Featured</span>}
                </div>

                {/* Description */}
                <div>
                  <h3 className="text-sm font-semibold text-text mb-2">About</h3>
                  <p className="text-sm text-muted leading-relaxed">{item.description}</p>
                </div>

                {/* Works With */}
                {item.worksWith.length > 0 && (
                  <div>
                    <h3 className="text-sm font-semibold text-text mb-2">Works With</h3>
                    <div className="flex items-center gap-2 flex-wrap">
                      {item.worksWith.map((w) => (
                        <span key={w} className="text-xs text-muted bg-white/[0.04] px-2.5 py-1 rounded-lg border border-white/[0.06] capitalize">{w}</span>
                      ))}
                    </div>
                  </div>
                )}

                {/* Requirements */}
                {item.requirements.length > 0 && (
                  <div>
                    <h3 className="text-sm font-semibold text-text mb-2">Requirements</h3>
                    <ul className="space-y-1">
                      {item.requirements.map((r, i) => (
                        <li key={i} className="flex items-center gap-2 text-xs text-muted">
                          <Shield className="w-3 h-3 text-accent/60" />
                          {r}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {/* Permissions */}
                {item.permissions.length > 0 && (
                  <div>
                    <h3 className="text-sm font-semibold text-text mb-2">Permissions</h3>
                    <ul className="space-y-1">
                      {item.permissions.map((p, i) => (
                        <li key={i} className="flex items-center gap-2 text-xs text-muted">
                          <Shield className="w-3 h-3 text-accent/60" />
                          {p}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {item.size && (
                  <div className="flex items-center gap-2 text-xs text-muted">
                    <Download className="w-3.5 h-3.5" />
                    Size: {item.size}
                  </div>
                )}
              </div>
            </div>

            {/* Footer */}
            <div className="border-t border-white/[0.06] p-4 shrink-0">
              <div className="flex items-center gap-3">
                {onInstall && (
                  <button
                    onClick={() => onInstall(item)}
                    className={cn(
                      'flex-1 py-2.5 rounded-xl text-sm font-semibold transition-all flex items-center justify-center gap-2',
                      installed
                        ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20'
                        : 'bg-accent text-black hover:bg-accent/90',
                    )}
                  >
                    {installed ? <><Check className="w-4 h-4" /> Installed</> : <><Plus className="w-4 h-4" /> Install</>}
                  </button>
                )}
                <button className="px-4 py-2.5 rounded-xl text-sm font-medium text-muted hover:text-white hover:bg-white/5 border border-white/[0.06] transition-colors">
                  Learn More
                </button>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
