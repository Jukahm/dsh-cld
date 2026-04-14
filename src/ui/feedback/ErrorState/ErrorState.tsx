import { Button } from "antd";
import { WarningOutlined } from "@ant-design/icons";

interface ErrorStateProps {
  error?: Error | null;
  message?: string;
  onRetry?: () => void;
  compact?: boolean;
}

export function ErrorState({
  error,
  message,
  onRetry,
  compact = false,
}: ErrorStateProps) {
  const displayMessage = message ?? error?.message ?? "Something went wrong";

  if (compact) {
    return (
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: 8,
          color: "var(--color-danger)",
          fontSize: "var(--font-size-sm)",
        }}
      >
        <WarningOutlined />
        <span>{displayMessage}</span>
        {onRetry && (
          <Button size="small" type="link" onClick={onRetry} style={{ padding: 0, height: "auto" }}>
            Retry
          </Button>
        )}
      </div>
    );
  }

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        padding: "32px 16px",
        gap: 12,
        textAlign: "center",
      }}
    >
      <WarningOutlined
        style={{ fontSize: 32, color: "var(--color-danger)" }}
      />
      <div>
        <p
          style={{
            margin: 0,
            fontWeight: "var(--font-weight-medium)",
            color: "var(--color-text-primary)",
          }}
        >
          Failed to load data
        </p>
        <p
          style={{
            margin: "4px 0 0",
            fontSize: "var(--font-size-sm)",
            color: "var(--color-text-secondary)",
          }}
        >
          {displayMessage}
        </p>
      </div>
      {onRetry && (
        <Button onClick={onRetry} size="small">
          Try again
        </Button>
      )}
    </div>
  );
}
