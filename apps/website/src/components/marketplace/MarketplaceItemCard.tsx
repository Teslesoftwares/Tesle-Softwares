'use client';

import { motion } from 'framer-motion';
import { Star, Download, Check, Plus } from 'lucide-react';
import { type MarketplaceItem, type MarketplaceItemType } from '@/data/marketplace';
import { cn } from '@tesle/ui';

interface MarketplaceItemCardProps {
  item: MarketplaceItem;
  installed?: boolean;
  onInstall?: (item: MarketplaceItem) => void;
  onClick?: (item: MarketplaceItem) => void;
}

const typeLabels: Record<MarketplaceItemType, string> = {
  app: 'App',
  integration: 'Integration',
  theme: 'Theme',
  template: 'Template',
  report: 'Report',
  ai_agent: 'AI Agent',
  extension: 'Extension',
};

export function MarketplaceItemCard({ item, installed, onInstall, onClick }: MarketplaceItemCardProps) {
  const Icon = item.icon;

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="rounded-2xl glass hover:glass-hover transition-all group cursor-pointer overflow-hidden"
      onClick={() => onClick?.(item)}
    >
      {/* Preview area */}
      <div className={`h-28 bg-gradient-to-br ${item.color}/10 via-transparent to-transparent relative`}>
        <div className={`absolute top-3 left-3 w-10 h-10 rounded-xl bg-gradient-to-br ${item.color} border border-white/[0.08] flex items-center justify-center shadow-lg`}>
          <Icon className="w-5 h-5 text-white" />
        </div>
        {item.featured && (
          <span className="absolute top-3 right-3 text-[9px] font-bold text-amber-400 bg-amber-400/10 border border-amber-400/20 px-2 py-0.5 rounded-full">
            Featured
          </span>
        )}
        {item.verified && (
          <span className="absolute bottom-3 left-3 text-[9px] font-medium text-emerald-400 bg-emerald-400/10 border border-emerald-400/20 px-2 py-0.5 rounded-full">
            Verified
          </span>
        )}
        <span className="absolute bottom-3 right-3 text-[9px] font-medium text-muted bg-black/40 px-2 py-0.5 rounded-full backdrop-blur-sm">
          {typeLabels[item.type]}
        </span>
      </div>

      {/* Content */}
      <div className="p-4">
        <h3 className="text-sm font-semibold text-text group-hover:text-accent transition-colors truncate">{item.name}</h3>
        <p className="text-[11px] text-muted mt-0.5 truncate">{item.provider}</p>
        <p className="text-[11px] text-muted mt-1.5 line-clamp-2 leading-relaxed">{item.tagline}</p>

        <div className="flex items-center justify-between mt-3">
          <div className="flex items-center gap-1.5">
            <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" />
            <span className="text-xs font-medium text-text">{item.rating}</span>
            <span className="text-[10px] text-muted">({item.ratingCount.toLocaleString()})</span>
          </div>
          <span className="text-[10px] font-medium text-muted bg-white/[0.04] px-2 py-0.5 rounded-full capitalize">{item.pricing}</span>
        </div>

        <div className="flex items-center gap-2 mt-3">
          <span className="text-[10px] text-muted">{item.installCount.toLocaleString()} installs</span>
          <span className="text-muted/80">·</span>
          <span className="text-[10px] text-muted">v{item.version}</span>
        </div>

        {/* Install button */}
        {onInstall && (
          <button
            onClick={(e) => { e.stopPropagation(); onInstall(item); }}
            className={cn(
              'w-full mt-3 py-2 rounded-xl text-xs font-semibold transition-all flex items-center justify-center gap-1.5',
              installed
                ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20'
                : 'bg-accent/20 text-accent hover:bg-accent/30 border border-accent/10',
            )}
          >
            {installed ? (
              <><Check className="w-3.5 h-3.5" /> Installed</>
            ) : (
              <><Plus className="w-3.5 h-3.5" /> Install</>
            )}
          </button>
        )}
      </div>
    </motion.div>
  );
}
