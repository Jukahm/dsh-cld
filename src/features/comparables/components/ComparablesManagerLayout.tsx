import type { ReactNode, CSSProperties } from "react";

type Props = {
  leftSlot: ReactNode;
  centerSlot: ReactNode;
  rightSlot: ReactNode;
  isDrawerOpen: boolean;
};

const PANEL_HEIGHT = "calc(100vh - 100px)";

const shellStyle: CSSProperties = {
  display: "flex",
  flexDirection: "row",
  height: PANEL_HEIGHT,
  overflow: "hidden",
  background: "var(--color-surface-white)",
  border: "1px solid var(--color-border)",
  borderRadius: "var(--radius-md)",
};

const leftStyle: CSSProperties = {
  width: 240,
  flexShrink: 0,
  overflowY: "auto",
  borderRight: "1px solid var(--color-border)",
  background: "var(--color-surface-white)",
  display: "flex",
  flexDirection: "column",
};

const centerStyle: CSSProperties = {
  flex: 1,
  minWidth: 0,
  display: "flex",
  flexDirection: "column",
  overflow: "hidden",
  background: "var(--color-surface-gray-50)",
};

export function ComparablesManagerLayout({
  leftSlot,
  centerSlot,
  rightSlot,
  isDrawerOpen,
}: Props) {
  return (
    <div style={shellStyle}>
      <div style={leftStyle}>{leftSlot}</div>

      <div style={centerStyle}>{centerSlot}</div>

      <div
        style={{
          width: isDrawerOpen ? 380 : 0,
          flexShrink: 0,
          overflow: "hidden",
          borderLeft: isDrawerOpen ? "1px solid var(--color-border)" : "none",
          background: "var(--color-surface-white)",
          transition: "width 200ms ease-in-out",
          display: "flex",
          flexDirection: "column",
        }}
      >
        <div
          style={{
            width: 380,
            height: "100%",
            overflowY: "auto",
            display: "flex",
            flexDirection: "column",
          }}
        >
          {rightSlot}
        </div>
      </div>
    </div>
  );
}
