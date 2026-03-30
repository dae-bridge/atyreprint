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
      <div className="p-6 space-y-2">
        {[...Array(6)].map((_, i) => (
          <div key={i} className="animate-pulse flex items-center gap-4 py-3">
            <div className="h-4 bg-gray-100 rounded w-1/4" />
            <div className="h-4 bg-gray-50 rounded w-1/5" />
            <div className="h-4 bg-gray-100 rounded w-1/6" />
            <div className="h-4 bg-gray-50 rounded w-1/6" />
            <div className="h-4 bg-gray-100 rounded w-1/12" />
          </div>
        ))}
      </div>
    );
  }

  if (data.length === 0) {
    return (
      <div className="text-center py-16 text-text-secondary text-sm">
        {emptyMessage}
      </div>
    );
  }

  return (
    <div className="overflow-x-auto">
      <table className="w-full">
        <thead>
          <tr className="bg-gray-50/80">
            {columns.map((col) => (
              <th
                key={col.key}
                className={cn(
                  "px-5 py-3 text-left text-[11px] font-semibold text-text-muted uppercase tracking-wider first:rounded-tl-lg last:rounded-tr-lg",
                  col.className,
                )}
              >
                {col.label}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.map((item, rowIdx) => (
            <tr
              key={rowIdx}
              onClick={() => onRowClick?.(item)}
              className={cn(
                "border-b border-gray-100 last:border-0 transition-colors",
                onRowClick
                  ? "cursor-pointer hover:bg-primary/[0.02] active:bg-primary/[0.04]"
                  : "hover:bg-gray-50/40",
              )}
            >
              {columns.map((col) => (
                <td
                  key={col.key}
                  className={cn(
                    "px-5 py-3.5 text-sm text-foreground",
                    col.className,
                  )}
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
