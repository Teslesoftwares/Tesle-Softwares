'use client';

import { useState, useMemo } from 'react';
import { Sparkles, ArrowRight } from 'lucide-react';
import { useWorkspace } from '@/components/workspace/WorkspaceContext';
import {
  type MarketplaceItem, type MarketplaceItemType,
  marketplaceItems, getFeaturedItems,
  searchItems, installItem, getInstalledItems,
} from '@/data/marketplace';
import { MarketplaceFilters } from './MarketplaceFilters';
import { MarketplaceItemCard } from './MarketplaceItemCard';
import { MarketplaceDetail } from './MarketplaceDetail';
import { MarketplaceDeveloperProfile } from './MarketplaceDeveloperProfile';
import { getDeveloperById } from '@/data/marketplace';

export function MarketplacePage() {
  const { currentOrg } = useWorkspace();
  const [search, setSearch] = useState('');
  const [activeType, setActiveType] = useState<MarketplaceItemType | 'all'>('all');
  const [activeCategory, setActiveCategory] = useState('All');
  const [sort, setSort] = useState<'popular' | 'rating' | 'newest' | 'name'>('popular');
  const [selectedItem, setSelectedItem] = useState<MarketplaceItem | null>(null);
  const [showInstalled, setShowInstalled] = useState(false);
  const [installed, setInstalled] = useState<string[]>(() => {
    if (!currentOrg) return [];
    return getInstalledItems(currentOrg.id).map((i) => i.itemId);
  });

  const featured = useMemo(() => getFeaturedItems().slice(0, 4), []);

  const filtered = useMemo(() => {
    let items = search ? searchItems(search) : [...marketplaceItems];

    if (showInstalled) {
      items = items.filter((i) => installed.includes(i.id));
    }
    if (activeType !== 'all') {
      items = items.filter((i) => i.type === activeType);
    }
    if (activeCategory !== 'All') {
      items = items.filter((i) => i.category === activeCategory);
    }

    switch (sort) {
      case 'popular': return items.sort((a, b) => b.installCount - a.installCount);
      case 'rating': return items.sort((a, b) => b.rating - a.rating);
      case 'newest': return items.sort((a, b) => new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime());
      case 'name': return items.sort((a, b) => a.name.localeCompare(b.name));
      default: return items;
    }
  }, [search, activeType, activeCategory, sort, showInstalled, installed]);

  const handleInstall = (item: MarketplaceItem) => {
    if (!currentOrg) return;
    const result = installItem(item.id, currentOrg.id);
    setInstalled((prev) =>
      result.status === 'active'
        ? [...prev, item.id]
        : prev.filter((id) => id !== item.id),
    );
  };

  return (
    <div className="p-4 sm:p-6 lg:p-8 max-w-7xl">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-text">Marketplace</h1>
          <p className="text-sm text-muted mt-1">
            Extend your workspace with apps, integrations, AI agents, and more.
          </p>
        </div>
        <button
          onClick={() => setShowInstalled(!showInstalled)}
          className={`px-4 py-2 rounded-xl text-xs font-medium transition-all border ${
            showInstalled
              ? 'bg-accent/20 text-accent border-accent/10'
              : 'text-muted hover:text-white hover:bg-white/5 border-white/[0.06]'
          }`}
        >
          {showInstalled ? 'Browse All' : `Installed (${installed.length})`}
        </button>
      </div>

      {/* Filters */}
      <MarketplaceFilters
        search={search} onSearchChange={setSearch}
        activeType={activeType} onTypeChange={setActiveType}
        activeCategory={activeCategory} onCategoryChange={setActiveCategory}
        sort={sort} onSortChange={setSort}
      />

      {/* Featured section (only when no filters active) */}
      {!search && activeType === 'all' && activeCategory === 'All' && !showInstalled && (
        <div className="mt-8">
          <div className="flex items-center gap-2 mb-4">
            <Sparkles className="w-4 h-4 text-amber-400" />
            <h2 className="text-sm font-semibold text-text">Featured</h2>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {featured.map((item) => (
              <MarketplaceItemCard
                key={item.id}
                item={item}
                installed={installed.includes(item.id)}
                onInstall={handleInstall}
                onClick={setSelectedItem}
              />
            ))}
          </div>
        </div>
      )}

      {/* All / filtered items */}
      <div className="mt-6">
        <h2 className="text-sm font-semibold text-text mb-4">
          {showInstalled ? 'Installed Items' : search ? `Search Results (${filtered.length})` : `All Items (${filtered.length})`}
        </h2>
        {filtered.length === 0 ? (
          <div className="flex flex-col items-center py-16 text-center">
            <div className="w-16 h-16 rounded-2xl glass flex items-center justify-center mb-4">
              <Sparkles className="w-8 h-8 text-muted/80" />
            </div>
            <p className="text-sm text-muted">No items found matching your criteria.</p>
            <button
              onClick={() => { setSearch(''); setActiveType('all'); setActiveCategory('All'); }}
              className="mt-3 text-xs text-accent hover:underline"
            >
              Clear filters
            </button>
          </div>
        ) : (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {filtered.map((item) => (
              <MarketplaceItemCard
                key={item.id}
                item={item}
                installed={installed.includes(item.id)}
                onInstall={handleInstall}
                onClick={setSelectedItem}
              />
            ))}
          </div>
        )}
      </div>

      {/* Detail slide-over */}
      <MarketplaceDetail
        item={selectedItem}
        open={!!selectedItem}
        onClose={() => setSelectedItem(null)}
        installed={selectedItem ? installed.includes(selectedItem.id) : false}
        onInstall={handleInstall}
      />
    </div>
  );
}
