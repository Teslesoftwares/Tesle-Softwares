'use client';

import { motion } from 'framer-motion';
import { Globe, Mail, CheckCircle, Package, Download, ExternalLink } from 'lucide-react';
import { type DeveloperProfile, getDeveloperItems } from '@/data/marketplace';
import { cn } from '@tesle/ui';

interface MarketplaceDeveloperProfileProps {
  developer: DeveloperProfile;
  onClose?: () => void;
}

export function MarketplaceDeveloperProfile({ developer, onClose }: MarketplaceDeveloperProfileProps) {
  const items = getDeveloperItems(developer.id);

  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      className="rounded-2xl glass p-5"
    >
      <div className="flex items-start gap-4">
        <div className={cn(
          'w-12 h-12 rounded-xl flex items-center justify-center text-lg font-bold shrink-0',
          developer.verified ? 'bg-gradient-to-br from-accent/30 to-violet-500/30 text-accent' : 'bg-white/[0.04] text-muted',
        )}>
          {developer.name.charAt(0)}
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2">
            <h3 className="text-sm font-semibold text-text">{developer.name}</h3>
            {developer.verified && <CheckCircle className="w-4 h-4 text-accent" />}
          </div>
          <p className="text-xs text-muted mt-1 line-clamp-2">{developer.bio}</p>
          <div className="flex items-center gap-4 mt-2">
            <span className="flex items-center gap-1 text-[11px] text-muted">
              <Package className="w-3 h-3" />
              {developer.itemsCount} items
            </span>
            <span className="flex items-center gap-1 text-[11px] text-muted">
              <Download className="w-3 h-3" />
              {developer.totalInstalls.toLocaleString()} installs
            </span>
          </div>
          <div className="flex items-center gap-3 mt-2">
            {developer.website && (
              <a href={developer.website} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1 text-[11px] text-accent hover:underline">
                <Globe className="w-3 h-3" />
                Website
              </a>
            )}
            <a href={`mailto:${developer.email}`} className="flex items-center gap-1 text-[11px] text-accent hover:underline">
              <Mail className="w-3 h-3" />
              Contact
            </a>
          </div>
        </div>
      </div>

      {items.length > 0 && (
        <div className="mt-4 pt-4 border-t border-white/[0.06]">
          <p className="text-[10px] font-semibold text-muted uppercase tracking-wider mb-2">Published Items</p>
          <div className="space-y-1.5">
            {items.map((item) => {
              const Icon = item.icon;
              return (
                <div key={item.id} className="flex items-center gap-2.5 px-2 py-1.5 rounded-lg hover:glass transition-colors">
                  <div className={`w-6 h-6 rounded-lg bg-gradient-to-br ${item.color}/20 border border-white/[0.06] flex items-center justify-center`}>
                    <Icon className="w-3 h-3 text-white" />
                  </div>
                  <span className="text-xs text-text flex-1">{item.name}</span>
                  <span className="text-[10px] text-muted">{item.installCount.toLocaleString()} installs</span>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </motion.div>
  );
}
