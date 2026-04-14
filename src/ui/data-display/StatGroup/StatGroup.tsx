import type { ReactNode } from "react";

interface StatGroupProps {
  children: ReactNode;
  cols?: 2 | 3 | 4 | 5;
}

export function StatGroup({ children, cols = 4 }: StatGroupProps) {
  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: `repeat(${cols}, 1fr)`,
        gap: "var(--spacing-3)",
      }}
    >
      {children}
    </div>
  );
}
