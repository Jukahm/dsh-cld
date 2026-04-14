import type { ReactNode, CSSProperties } from "react";

type ColCount = 1 | 2 | 3 | 4;

interface WidgetGridProps {
  children: ReactNode;
  cols?: ColCount;
  style?: CSSProperties;
  className?: string;
}

const colMap: Record<ColCount, string> = {
  1: "1fr",
  2: "repeat(2, 1fr)",
  3: "repeat(3, 1fr)",
  4: "repeat(4, 1fr)",
};

export function WidgetGrid({ children, cols = 3, style, className }: WidgetGridProps) {
  return (
    <div
      className={className}
      style={{
        display: "grid",
        gridTemplateColumns: colMap[cols],
        gap: "var(--spacing-4)",
        ...style,
      }}
    >
      {children}
    </div>
  );
}

interface WidgetGridItemProps {
  children: ReactNode;
  span?: 1 | 2 | 3 | 4;
  style?: CSSProperties;
}

export function WidgetGridItem({ children, span = 1, style }: WidgetGridItemProps) {
  return (
    <div style={{ gridColumn: `span ${span}`, ...style }}>
      {children}
    </div>
  );
}
