import { motion } from 'framer-motion';
import { Play, ArrowLeftRight, Maximize2 } from 'lucide-react';
import type { MediaImageItem, MediaVideoItem, MediaComparisonItem } from '@/types';

type MediaItem = MediaImageItem | MediaVideoItem | MediaComparisonItem;

interface MediaCardProps {
  item: MediaItem;
  type: 'image' | 'video' | 'comparison';
  onClick?: () => void;
  index?: number;
}

export function MediaCard({ item, type, onClick, index = 0 }: MediaCardProps) {
  const isVideo = type === 'video';
  const isComparison = type === 'comparison';

  const videoItem = item as MediaVideoItem;
  const imageItem = item as MediaImageItem;
  const comparisonItem = item as MediaComparisonItem;

  const imgSrc = isVideo
    ? videoItem.thumbnail.url
    : isComparison
    ? comparisonItem.before.url
    : imageItem.image.url;

  const imgAlt = isVideo
    ? videoItem.thumbnail.alt
    : isComparison
    ? comparisonItem.before.alt
    : imageItem.image.alt;

  const tags = item.tags || [];

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ duration: 0.5, delay: index * 0.05 }}
      className={`group relative overflow-hidden rounded-2xl bg-white/[0.02] ${
        isComparison ? 'cursor-default' : 'cursor-pointer'
      }`}
      onClick={onClick}
    >
      {/* Image */}
      <div className={`relative overflow-hidden ${isComparison ? '' : 'aspect-[4/3]'}`}>
        <img decoding="async"
          src={imgSrc}
          alt={imgAlt}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
         
        />

        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

        {/* Play button overlay for videos */}
        {isVideo && (
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-16 h-16 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 flex items-center justify-center transition-transform duration-300 group-hover:scale-110 group-hover:bg-accent/90 group-hover:border-accent">
              <Play className="w-7 h-7 text-white ml-0.5" />
            </div>
          </div>
        )}

        {/* Duration badge for videos */}
        {isVideo && (
          <div className="absolute bottom-3 right-3 px-2 py-1 rounded-md bg-black/70 backdrop-blur-sm text-[11px] font-medium text-white/90">
            {videoItem.duration}
          </div>
        )}

        {/* Comparison icon */}
        {isComparison && (
          <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-500">
            <div className="px-4 py-2 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 flex items-center gap-2 text-sm text-white">
              <ArrowLeftRight className="w-4 h-4" />
              <span>Drag to compare</span>
            </div>
          </div>
        )}

        {/* Expand icon for images */}
        {!isVideo && !isComparison && (
          <div className="absolute top-3 right-3 w-8 h-8 rounded-full bg-white/10 backdrop-blur-sm flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <Maximize2 className="w-4 h-4 text-white" />
          </div>
        )}
      </div>

      {/* Info */}
      <div className="p-4">
        <h3 className="text-base font-semibold text-white mb-1 group-hover:text-accent transition-colors">
          {item.title}
        </h3>
        <p className="text-sm text-muted leading-relaxed line-clamp-2">
          {item.description}
        </p>
        {tags.length > 0 && (
          <div className="mt-3 flex flex-wrap gap-1.5">
            {tags.slice(0, 3).map((tag) => (
              <span
                key={tag}
                className="px-2 py-0.5 text-[10px] rounded-full bg-white/[0.04] border border-white/[0.08] text-muted"
              >
                {tag}
              </span>
            ))}
          </div>
        )}
      </div>
    </motion.div>
  );
}
