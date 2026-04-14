import type { ReactNode } from "react";

type BadgeVariant = "positive" | "negative" | "neutral" | "warning";
type BadgeSize = "sm" | "md";

interface BadgeProps {
  variant: BadgeVariant;
  children: ReactNode;
  size?: BadgeSize;
}

const variantStyles: Record<BadgeVariant, { bg: string; color: string }> = {
  positive: { bg: "var(--color-success-bg)", color: "var(--color-success-dark)" },
  negative: { bg: "var(--color-danger-bg)", color: "var(--color-danger-dark)" },
  neutral: { bg: "var(--color-surface-gray-100)", color: "var(--color-text-secondary)" },
  warning: { bg: "var(--color-warning-bg)", color: "var(--color-warning-dark)" },
};

const sizeStyles: Record<BadgeSize, { fontSize: string; padding: string }> = {
  sm: { fontSize: "var(--font-size-xs)", padding: "1px 6px" },
  md: { fontSize: "var(--font-size-sm)", padding: "2px 8px" },
};

export function Badge({ variant, children, size = "sm" }: BadgeProps) {
  const { bg, color } = variantStyles[variant];
  const { fontSize, padding } = sizeStyles[size];

  return (
    <span
      style={{
        display: "inline-flex",
        alignItems: "center",
        gap: 3,
        background: bg,
        color,
        fontSize,
        padding,
        borderRadius: "var(--radius-sm)",
        fontWeight: "var(--font-weight-medium)",
        lineHeight: 1.5,
        whiteSpace: "nowrap",
      }}
    >
      {children}
    </span>
  );
}
