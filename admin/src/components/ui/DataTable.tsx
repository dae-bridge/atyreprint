"use client";

import { cn } from "@/lib/utils";

export interface Column<T> {
  key: string;
  label: string;
  sortable?: boolean;
  className?: string;
  render: (item: T) => React.ReactNode;
}

interface DataTableProps<T> {
  columns: Column<T>[];
  data: T[];
  loading?: boolean;
  emptyMessage?: string;
  onRowClick?: (item: T) => void;
}

export function DataTable<T>({
  columns,
  data,
  loading,
  emptyMessage = "No data found",
  onRowClick,
}: DataTableProps<T>) {
  if (loading) {
    return (
      <div className="animate-pulse space-y-3 p-6">
        {[...Array(5)].map((_, i) => (
          <div key={i} className="h-12 bg-gray-100 rounded-lg" />
        ))}
      </div>
    );
  }

  if (data.length === 0) {
    return (
      <div className="text-center py-12 text-text-secondary text-sm">
        {emptyMessage}
      </div>
    );
  }

  return (
    <div className="overflow-x-auto">
      <table className="w-full">
        <thead>
          <tr className="border-b border-border">
            {columns.map((col) => (
              <th
                key={col.key}
                className={cn(
                  "px-6 py-3 text-left text-xs font-semibold text-text-secondary uppercase tracking-wider",
                  col.className,
                )}
              >
                {col.label}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="divide-y divide-border">
          {data.map((item, rowIdx) => (
            <tr
              key={rowIdx}
              onClick={() => onRowClick?.(item)}
              className={cn(
                "hover:bg-gray-50/50 transition-colors",
                onRowClick && "cursor-pointer",
              )}
            >
              {columns.map((col) => (
                <td
                  key={col.key}
                  className={cn("px-6 py-4 text-sm", col.className)}
                >
                  {col.render(item)}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
