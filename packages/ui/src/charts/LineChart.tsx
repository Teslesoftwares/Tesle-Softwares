'use client';

import { motion } from 'framer-motion';

interface DataPoint {
  label: string;
  value: number;
}

interface LineChartProps {
  data: DataPoint[];
  height?: number;
  showDots?: boolean;
  showGrid?: boolean;
  showArea?: boolean;
  color?: string;
  className?: string;
}

export function LineChart({ data, height = 240, showDots = true, showGrid = true, showArea = false, color = '#f59e0b', className }: LineChartProps) {
  if (data.length < 2) return null;

  const maxValue = Math.max(...data.map(d => d.value), 1);
  const padding = { top: 20, right: 16, bottom: 32, left: 40 };
  const chartWidth = 640;
  const chartHeight = height;

  const getX = (i: number) => padding.left + (i / (data.length - 1)) * (chartWidth - padding.left - padding.right);
  const getY = (v: number) => chartHeight - padding.bottom - ((v / maxValue) * (chartHeight - padding.top - padding.bottom));

  const linePath = data.map((d, i) => `${i === 0 ? 'M' : 'L'}${getX(i)},${getY(d.value)}`).join(' ');
  const areaPath = `${linePath} L${getX(data.length - 1)},${chartHeight - padding.bottom} L${getX(0)},${chartHeight - padding.bottom} Z`;

  return (
    <svg viewBox={`0 0 ${chartWidth} ${chartHeight}`} className={className} role="img" aria-label="Line chart">
      {showGrid && Array.from({ length: 5 }, (_, i) => {
        const y = padding.top + (i / 4) * (chartHeight - padding.top - padding.bottom);
        return <line key={i} x1={padding.left} y1={y} x2={chartWidth - padding.right} y2={y} stroke="currentColor" strokeOpacity={0.1} />;
      })}
      {showArea && (
        <motion.path
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          d={areaPath}
          fill={color}
          fillOpacity={0.08}
        />
      )}
      <motion.path
        initial={{ pathLength: 0 }}
        animate={{ pathLength: 1 }}
        transition={{ duration: 1, ease: 'easeInOut' }}
        d={linePath}
        fill="none"
        stroke={color}
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      {showDots && data.map((d, i) => (
        <motion.circle
          key={i}
          initial={{ r: 0, opacity: 0 }}
          animate={{ r: 3, opacity: 1 }}
          transition={{ duration: 0.3, delay: i * 0.05 }}
          cx={getX(i)}
          cy={getY(d.value)}
          fill="white"
          stroke={color}
          strokeWidth={2}
        />
      ))}
      {data.map((d, i) => (
        <text key={i} x={getX(i)} y={chartHeight - padding.bottom + 16} textAnchor="middle" className="fill-gray-500 dark:fill-gray-400 text-[10px]">
          {d.label}
        </text>
      ))}
      {data.filter((_, i) => i % Math.ceil(data.length / 5) === 0).map((d, i) => (
        <text key={i} x={padding.left - 8} y={getY(d.value)} textAnchor="end" dominantBaseline="central" className="fill-gray-400 dark:fill-gray-500 text-[10px]">
          {d.value}
        </text>
      ))}
    </svg>
  );
}
