import type { ReactNode } from "react";
import type { TableProps, TableColumnsType } from "antd";
import { Table } from "antd";
import { EmptyState } from "../../feedback/EmptyState/index.js";
import { ErrorState } from "../../feedback/ErrorState/index.js";
import { SkeletonWidget } from "../../feedback/SkeletonWidget/index.js";

export type { TableColumnsType };

interface DataTableProps<T extends object> {
  columns: TableColumnsType<T>;
  data: T[];
  rowKey: keyof T | ((record: T) => string);
  loading?: boolean;
  error?: Error | null;
  onRetry?: () => void;
  sticky?: boolean;
  virtual?: boolean;
  pagination?: TableProps<T>["pagination"];
  onChange?: TableProps<T>["onChange"];
  expandable?: TableProps<T>["expandable"];
  rowSelection?: TableProps<T>["rowSelection"];
  scroll?: TableProps<T>["scroll"];
  summary?: TableProps<T>["summary"];
  footer?: () => ReactNode;
  size?: "small" | "middle";
  emptyMessage?: string;
  emptyDescription?: string;
  onRow?: TableProps<T>["onRow"];
}

export function DataTable<T extends object>({
  columns,
  data,
  rowKey,
  loading = false,
  error = null,
  onRetry,
  sticky = true,
  pagination = false,
  scroll,
  size = "small",
  emptyMessage,
  emptyDescription,
  ...rest
}: DataTableProps<T>) {
  if (error) {
    return <ErrorState error={error} onRetry={onRetry} />;
  }

  if (loading && data.length === 0) {
    return <SkeletonWidget rows={6} />;
  }

  return (
    <Table<T>
      columns={columns}
      dataSource={data}
      rowKey={rowKey as TableProps<T>["rowKey"]}
      loading={loading}
      pagination={pagination}
      size={size}
      sticky={sticky}
      scroll={{ x: "max-content", ...scroll }}
      locale={{
        emptyText: (
          <EmptyState
            message={emptyMessage ?? "No data available"}
            description={emptyDescription}
          />
        ),
      }}
      style={{
        "--ant-table-header-bg": "var(--color-surface-gray-50)",
        "--ant-table-border-color": "var(--color-border)",
      } as React.CSSProperties}
      {...rest}
    />
  );
}
