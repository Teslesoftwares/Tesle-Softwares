'use client';

import { motion } from 'framer-motion';

interface DataPoint {
  label: string;
  value: number;
  color?: string;
}

interface BarChartProps {
  data: DataPoint[];
  height?: number;
  showValues?: boolean;
  showGrid?: boolean;
  horizontal?: boolean;
  className?: string;
}

const defaultColors = [
  '#f59e0b', '#10b981', '#3b82f6', '#ef4444', '#8b5cf6',
  '#ec4899', '#14b8a6', '#f97316', '#6366f1', '#84cc16',
];

export function BarChart({ data, height = 240, showValues = false, showGrid = true, horizontal = false, className }: BarChartProps) {
  if (data.length === 0) return null;

  const maxValue = Math.max(...data.map(d => d.value), 1);
  const padding = { top: 16, right: 16, bottom: 32, left: showValues ? 40 : 16 };
  const chartWidth = horizontal ? height : 640;
  const chartHeight = horizontal ? 640 : height;

  if (horizontal) {
    const barHeight = Math.max((chartHeight - padding.top - padding.bottom) / data.length - 4, 8);
    return (
      <svg viewBox={`0 0 ${chartWidth} ${chartHeight}`} className={className} role="img" aria-label="Bar chart">
        {showGrid && Array.from({ length: 5 }, (_, i) => {
          const x = padding.left + (i / 4) * (chartWidth - padding.left - padding.right);
          return <line key={i} x1={x} y1={padding.top} x2={x} y2={chartHeight - padding.bottom} stroke="currentColor" strokeOpacity={0.1} />;
        })}
        {data.map((d, i) => {
          const y = padding.top + i * (barHeight + 4);
          const barWidth = ((d.value / maxValue) * (chartWidth - padding.left - padding.right));
          const color = d.color || defaultColors[i % defaultColors.length];
          return (
            <g key={i}>
              <motion.rect
                initial={{ width: 0 }}
                animate={{ width: barWidth }}
                transition={{ duration: 0.6, delay: i * 0.04, ease: 'easeOut' }}
                x={padding.left}
                y={y}
                height={barHeight}
                width={barWidth}
                fill={color}
                rx={3}
              />
              <text x={padding.left - 8} y={y + barHeight / 2} textAnchor="end" dominantBaseline="central" className="fill-gray-500 dark:fill-gray-400 text-[10px]">
                {d.label}
              </text>
              {showValues && (
                <text x={padding.left + barWidth + 4} y={y + barHeight / 2} dominantBaseline="central" className="fill-gray-700 dark:fill-gray-300 text-[10px]">
                  {d.value}
                </text>
              )}
            </g>
          );
        })}
      </svg>
    );
  }

  const barWidth = Math.max((chartWidth - padding.left - padding.right) / data.length - 4, 4);
  return (
    <svg viewBox={`0 0 ${chartWidth} ${chartHeight}`} className={className} role="img" aria-label="Bar chart">
      {showGrid && Array.from({ length: 5 }, (_, i) => {
        const y = padding.top + (i / 4) * (chartHeight - padding.top - padding.bottom);
        return <line key={i} x1={padding.left} y1={y} x2={chartWidth - padding.right} y2={y} stroke="currentColor" strokeOpacity={0.1} />;
      })}
      {data.map((d, i) => {
        const x = padding.left + i * (barWidth + 4);
        const barHeightVal = ((d.value / maxValue) * (chartHeight - padding.top - padding.bottom));
        const y = chartHeight - padding.bottom - barHeightVal;
        const color = d.color || defaultColors[i % defaultColors.length];
        return (
          <g key={i}>
            <motion.rect
              initial={{ height: 0, y: chartHeight - padding.bottom }}
              animate={{ height: barHeightVal, y }}
              transition={{ duration: 0.6, delay: i * 0.04, ease: 'easeOut' }}
              x={x}
              y={y}
              width={barWidth}
              height={barHeightVal}
              fill={color}
              rx={3}
            />
            <text x={x + barWidth / 2} y={chartHeight - padding.bottom + 16} textAnchor="middle" className="fill-gray-500 dark:fill-gray-400 text-[10px]">
              {d.label}
            </text>
            {showValues && (
              <text x={x + barWidth / 2} y={y - 6} textAnchor="middle" className="fill-gray-700 dark:fill-gray-300 text-[10px]">
                {d.value}
              </text>
            )}
          </g>
        );
      })}
    </svg>
  );
}
