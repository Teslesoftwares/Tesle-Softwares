import { Pencil, Trash2 } from 'lucide-react';

export interface Column<T> {
  key: string;
  header: string;
  render?: (item: T) => React.ReactNode;
  sortable?: boolean;
}

interface DataTableProps<T> {
  columns: Column<T>[];
  data: T[];
  onEdit?: (item: T) => void;
  onDelete?: (item: T) => void;
  loading?: boolean;
}

export function DataTable<T extends { id: number }>({ columns, data, onEdit, onDelete, loading }: DataTableProps<T>) {
  if (loading) {
    return (
      <div className="text-center py-12 text-gray-400">
        <div className="animate-spin w-6 h-6 border-2 border-[#d4a853] border-t-transparent rounded-full mx-auto mb-2" />
        Loading...
      </div>
    );
  }

  if (!data.length) {
    return <div className="text-center py-12 text-gray-500">No items found.</div>;
  }

  return (
    <div className="overflow-x-auto">
      <table className="w-full text-sm">
        <thead>
          <tr className="border-b border-gray-800">
            {columns.map((col) => (
              <th key={col.key} className="text-left py-3 px-4 text-gray-400 font-medium uppercase tracking-wider text-xs">
                {col.header}
              </th>
            ))}
            {(onEdit || onDelete) && <th className="text-right py-3 px-4 text-gray-400 font-medium uppercase tracking-wider text-xs">Actions</th>}
          </tr>
        </thead>
        <tbody>
          {data.map((item) => (
            <tr key={item.id} className="border-b border-gray-800/50 hover:bg-gray-800/30 transition-colors">
              {columns.map((col) => (
                <td key={col.key} className="py-3 px-4">
                  {col.render ? col.render(item) : String((item as Record<string, unknown>)[col.key] ?? '')}
                </td>
              ))}
              {(onEdit || onDelete) && (
                <td className="py-3 px-4 text-right">
                  <div className="flex justify-end gap-2">
                    {onEdit && (
                      <button onClick={() => onEdit(item)} className="p-1.5 text-gray-400 hover:text-[#d4a853] transition-colors" title="Edit">
                        <Pencil size={15} />
                      </button>
                    )}
                    {onDelete && (
                      <button onClick={() => onDelete(item)} className="p-1.5 text-gray-400 hover:text-red-400 transition-colors" title="Delete">
                        <Trash2 size={15} />
                      </button>
                    )}
                  </div>
                </td>
              )}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
