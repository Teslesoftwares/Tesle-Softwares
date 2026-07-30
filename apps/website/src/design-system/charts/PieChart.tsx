'use client';

import { motion } from 'framer-motion';

interface DataPoint {
  label: string;
  value: number;
  color?: string;
}

interface PieChartProps {
  data: DataPoint[];
  size?: number;
  innerRadius?: number;
  showLabels?: boolean;
  className?: string;
}

const defaultColors = [
  '#f59e0b', '#10b981', '#3b82f6', '#ef4444', '#8b5cf6',
  '#ec4899', '#14b8a6', '#f97316', '#6366f1', '#84cc16',
];

function polarToCartesian(cx: number, cy: number, r: number, angleDeg: number) {
  const angleRad = (angleDeg - 90) * (Math.PI / 180);
  return { x: cx + r * Math.cos(angleRad), y: cy + r * Math.sin(angleRad) };
}

function describeArc(cx: number, cy: number, r: number, startAngle: number, endAngle: number) {
  const start = polarToCartesian(cx, cy, r, endAngle);
  const end = polarToCartesian(cx, cy, r, startAngle);
  const largeArcFlag = endAngle - startAngle > 180 ? 1 : 0;
  return `M ${cx} ${cy} L ${start.x} ${start.y} A ${r} ${r} 0 ${largeArcFlag} 0 ${end.x} ${end.y} Z`;
}

export function PieChart({ data, size = 240, innerRadius = 0, showLabels = false, className }: PieChartProps) {
  if (data.length === 0) return null;

  const total = data.reduce((sum, d) => sum + d.value, 0);
  const cx = size / 2;
  const cy = size / 2;
  const r = size / 2 - 16;

  let currentAngle = 0;
  const slices = data.map((d) => {
    const angle = (d.value / total) * 360;
    const slice = { ...d, startAngle: currentAngle, endAngle: currentAngle + angle, midAngle: currentAngle + angle / 2 };
    currentAngle += angle;
    return slice;
  });

  return (
    <svg viewBox={`0 0 ${size} ${size}`} className={className} role="img" aria-label="Pie chart">
      {innerRadius > 0 ? (
        slices.map((d, i) => {
          const outer = describeArc(cx, cy, r, d.startAngle, d.endAngle);
          const inner = describeArc(cx, cy, innerRadius, d.startAngle, d.endAngle);
          const color = d.color || defaultColors[i % defaultColors.length];
          return (
            <motion.path
              key={i}
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: i * 0.05 }}
              d={`${outer} ${inner}`}
              fill={color}
              stroke="white"
              strokeWidth={1}
              style={{ transformOrigin: `${cx}px ${cy}px` }}
            />
          );
        })
      ) : (
        slices.map((d, i) => {
          const path = describeArc(cx, cy, r, d.startAngle, d.endAngle);
          const color = d.color || defaultColors[i % defaultColors.length];
          return (
            <motion.path
              key={i}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: i * 0.05 }}
              d={path}
              fill={color}
              stroke="white"
              strokeWidth={1}
            />
          );
        })
      )}
      {showLabels && slices.map((d, i) => {
        const labelR = r * 0.65;
        const pos = polarToCartesian(cx, cy, labelR, d.midAngle);
        return (
          <text key={i} x={pos.x} y={pos.y} textAnchor="middle" dominantBaseline="central" className="fill-white text-[10px] font-medium">
            {Math.round((d.value / total) * 100)}%
          </text>
        );
      })}
    </svg>
  );
}

export function DonutChart(props: PieChartProps) {
  return <PieChart {...props} innerRadius={Math.min(props.size ? props.size / 4 : 60, 60)} />;
}
