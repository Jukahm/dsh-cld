import type { ReactNode } from "react";
import { Card } from "antd";
import { SkeletonWidget } from "../../feedback/SkeletonWidget/index.js";
import { ErrorState } from "../../feedback/ErrorState/index.js";

interface WidgetCardProps {
  title?: ReactNode;
  actions?: ReactNode;
  children: ReactNode;
  loading?: boolean;
  error?: Error | null;
  onRetry?: () => void;
  style?: React.CSSProperties;
  bodyStyle?: React.CSSProperties;
}

export function WidgetCard({
  title,
  actions,
  children,
  loading = false,
  error = null,
  onRetry,
  style,
  bodyStyle,
}: WidgetCardProps) {
  const extra = actions ? <div>{actions}</div> : undefined;

  return (
    <Card
      title={title}
      extra={extra}
      style={{
        border: "1px solid var(--color-border)",
        borderRadius: "var(--radius-md)",
        boxShadow: "none",
        ...style,
      }}
      styles={{
        body: {
          padding: "var(--spacing-4)",
          ...bodyStyle,
        },
        header: {
          borderBottom: "1px solid var(--color-border)",
          padding: "8px 16px",
          minHeight: 40,
          fontSize: "var(--font-size-sm)",
          fontWeight: "var(--font-weight-semibold)",
        },
      }}
    >
      {loading ? (
        <SkeletonWidget />
      ) : error ? (
        <ErrorState error={error} onRetry={onRetry} />
      ) : (
        children
      )}
    </Card>
  );
}
