import type { ReactNode } from "react";
import { Empty } from "antd";

interface EmptyStateProps {
  icon?: ReactNode;
  message?: string;
  description?: string;
  action?: ReactNode;
}

export function EmptyState({
  icon,
  message = "No data",
  description,
  action,
}: EmptyStateProps) {
  return (
    <Empty
      image={icon ?? Empty.PRESENTED_IMAGE_SIMPLE}
      description={
        <div style={{ textAlign: "center" }}>
          <p style={{ margin: 0, color: "var(--color-text-secondary)" }}>{message}</p>
          {description && (
            <p
              style={{
                margin: "4px 0 0",
                fontSize: "var(--font-size-xs)",
                color: "var(--color-text-tertiary)",
              }}
            >
              {description}
            </p>
          )}
        </div>
      }
      style={{ margin: "24px 0" }}
    >
      {action}
    </Empty>
  );
}
