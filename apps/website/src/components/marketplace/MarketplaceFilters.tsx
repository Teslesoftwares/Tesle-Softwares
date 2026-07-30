'use client';

import { Search, SlidersHorizontal, X } from 'lucide-react';
import { type MarketplaceItemType } from '@/data/marketplace';
import { marketplaceTypes, marketplaceCategories } from '@/data/marketplace';
import { cn } from '@tesle/ui';

interface MarketplaceFiltersProps {
  search: string;
  onSearchChange: (v: string) => void;
  activeType: MarketplaceItemType | 'all';
  onTypeChange: (v: MarketplaceItemType | 'all') => void;
  activeCategory: string;
  onCategoryChange: (v: string) => void;
  sort: 'popular' | 'rating' | 'newest' | 'name';
  onSortChange: (v: 'popular' | 'rating' | 'newest' | 'name') => void;
}

export function MarketplaceFilters({
  search, onSearchChange,
  activeType, onTypeChange,
  activeCategory, onCategoryChange,
  sort, onSortChange,
}: MarketplaceFiltersProps) {
  return (
    <div className="space-y-4">
      {/* Search + Sort */}
      <div className="flex items-center gap-3">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted" />
          <input
            type="text"
            value={search}
            onChange={(e) => onSearchChange(e.target.value)}
            placeholder="Search marketplace..."
            className="w-full pl-9 pr-8 py-2.5 bg-white border border-gray-200 rounded-xl text-sm text-text placeholder:text-muted focus:outline-none focus:border-accent/40 transition-colors"
          />
          {search && (
            <button onClick={() => onSearchChange('')} className="absolute right-3 top-1/2 -translate-y-1/2 text-muted hover:text-white">
              <X className="w-3.5 h-3.5" />
            </button>
          )}
        </div>
        <div className="flex items-center gap-2">
          <SlidersHorizontal className="w-4 h-4 text-muted" />
          <select
            value={sort}
            onChange={(e) => onSortChange(e.target.value as typeof sort)}
            className="bg-white border border-gray-200 rounded-xl px-3 py-2.5 text-xs text-text focus:outline-none focus:border-accent/40 transition-colors"
          >
            <option value="popular">Most Popular</option>
            <option value="rating">Highest Rated</option>
            <option value="newest">Newest</option>
            <option value="name">Name A-Z</option>
          </select>
        </div>
      </div>

      {/* Type tabs */}
      <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-thin">
        <button
          onClick={() => onTypeChange('all')}
          className={cn(
            'px-3.5 py-1.5 rounded-lg text-xs font-medium whitespace-nowrap transition-all',
            activeType === 'all'
              ? 'bg-accent/20 text-accent border border-accent/10'
              : 'text-muted hover:text-white glass hover:border-white/[0.1]',
          )}
        >
          All
        </button>
        {marketplaceTypes.map((t) => {
          const Icon = t.icon;
          const isActive = activeType === t.value;
          return (
            <button
              key={t.value}
              onClick={() => onTypeChange(t.value)}
              className={cn(
                'flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg text-xs font-medium whitespace-nowrap transition-all',
                isActive
                  ? 'bg-accent/20 text-accent border border-accent/10'
                  : 'text-muted hover:text-white glass hover:border-white/[0.1]',
              )}
            >
              <Icon className="w-3.5 h-3.5" />
              {t.label}
            </button>
          );
        })}
      </div>

      {/* Category chips */}
      <div className="flex items-center gap-1.5 flex-wrap">
        {marketplaceCategories.map((cat) => {
          const isActive = activeCategory === cat;
          return (
            <button
              key={cat}
              onClick={() => onCategoryChange(isActive ? 'All' : cat)}
              className={cn(
                'px-2.5 py-1 rounded-lg text-[10px] font-medium transition-all',
                isActive
                  ? 'bg-white/[0.08] text-white border border-white/[0.1]'
                  : 'text-muted hover:text-white glass hover:border-white/[0.08]',
              )}
            >
              {cat}
            </button>
          );
        })}
      </div>
    </div>
  );
}
