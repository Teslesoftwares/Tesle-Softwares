interface PageHeaderProps {
  title: string;
  subtitle: string;
  action?: { label: string; onClick: () => void };
}

export function PageHeader({ title, subtitle, action }: PageHeaderProps) {
  return (
    <div className="flex items-center justify-between mb-6 flex-wrap gap-3">
      <div>
        <h1 className="text-xl font-bold">{title}</h1>
        <p className="text-sm text-gray-200 mt-0.5">{subtitle}</p>
      </div>
      {action && (
        <button onClick={action.onClick} className="px-4 py-2 bg-[#d4a853] text-black text-sm font-medium rounded-lg hover:bg-[#b8943a] transition-colors">
          {action.label}
        </button>
      )}
    </div>
  );
}
