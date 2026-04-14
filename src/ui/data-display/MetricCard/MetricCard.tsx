import type { ReactNode } from "react";
import { ArrowUpOutlined, ArrowDownOutlined, MinusOutlined } from "@ant-design/icons";
import { Badge } from "../Badge/index.js";

type TrendDirection = "up" | "down" | "flat";

interface MetricCardProps {
  label: string;
  value: string | number;
  trend?: TrendDirection;
  trendValue?: string;
  trendLabel?: string;
  sparklineSlot?: ReactNode;
  size?: "sm" | "md" | "lg";
}

const trendIcon: Record<TrendDirection, ReactNode> = {
  up: <ArrowUpOutlined style={{ fontSize: 10 }} />,
  down: <ArrowDownOutlined style={{ fontSize: 10 }} />,
  flat: <MinusOutlined style={{ fontSize: 10 }} />,
};

const trendVariant: Record<TrendDirection, "positive" | "negative" | "neutral"> = {
  up: "positive",
  down: "negative",
  flat: "neutral",
};

const valueSizes = { sm: "18px", md: "24px", lg: "30px" };

export function MetricCard({
  label,
  value,
  trend,
  trendValue,
  trendLabel,
  sparklineSlot,
  size = "md",
}: MetricCardProps) {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        gap: 4,
        padding: "14px 16px",
        background: "var(--color-surface-white)",
        border: "1px solid var(--color-border)",
        borderRadius: "var(--radius-md)",
      }}
    >
      <p
        style={{
          margin: 0,
          fontSize: "var(--font-size-xs)",
          fontWeight: "var(--font-weight-medium)",
          color: "var(--color-text-secondary)",
          textTransform: "uppercase",
          letterSpacing: "0.05em",
        }}
      >
        {label}
      </p>

      <div style={{ display: "flex", alignItems: "flex-end", justifyContent: "space-between" }}>
        <span
          style={{
            fontSize: valueSizes[size],
            fontWeight: "var(--font-weight-semibold)",
            color: "var(--color-text-primary)",
            lineHeight: 1.2,
            fontVariantNumeric: "tabular-nums",
          }}
        >
          {value}
        </span>

        {sparklineSlot && (
          <div style={{ width: 64, height: 32 }}>{sparklineSlot}</div>
        )}
      </div>

      {trend && (
        <div style={{ display: "flex", alignItems: "center", gap: 6, marginTop: 2 }}>
          <Badge variant={trendVariant[trend]}>
            {trendIcon[trend]}
            {trendValue && <span>{trendValue}</span>}
          </Badge>
          {trendLabel && (
            <span
              style={{
                fontSize: "var(--font-size-xs)",
                color: "var(--color-text-tertiary)",
              }}
            >
              {trendLabel}
            </span>
          )}
        </div>
      )}
    </div>
  );
}
