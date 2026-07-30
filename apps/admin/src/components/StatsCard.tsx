import { type ReactNode } from 'react';

interface StatsCardProps {
  label: string;
  value: number | string;
  icon: ReactNode;
  color?: string;
}

export function StatsCard({ label, value, icon, color = 'text-[#d4a853]' }: StatsCardProps) {
  return (
    <div className="bg-gray-900 border border-gray-800 rounded-xl p-5 flex items-center gap-4">
      <div className={`p-3 rounded-lg bg-gray-800 ${color}`}>
        {icon}
      </div>
      <div>
        <p className="text-2xl font-bold">{value}</p>
        <p className="text-sm text-gray-200">{label}</p>
      </div>
    </div>
  );
}
