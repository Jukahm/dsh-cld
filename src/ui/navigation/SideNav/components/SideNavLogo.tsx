import type { ReactNode } from "react";

interface SideNavLogoProps {
  collapsed: boolean;
  logoIcon?: ReactNode;
  logoLabel?: string;
  textColor: string;
}

export function SideNavLogo({ collapsed, logoIcon, logoLabel, textColor }: SideNavLogoProps) {
  if (!logoIcon) return null;

  return (
    <div
      style={{
        height:         58,
        padding:        collapsed ? "0 var(--spacing-2)" : "0 var(--spacing-4)",
        display:        "flex",
        alignItems:     "center",
        justifyContent: collapsed ? "center" : "flex-start",
        flexShrink:     0,
        gap:            "var(--spacing-3)",
      }}
    >
      {/* Branded icon badge — green square, white icon */}
      <div
        style={{
          width:          32,
          height:         32,
          borderRadius:   "var(--radius-md)",
          background:     "var(--color-primary)",
          display:        "flex",
          alignItems:     "center",
          justifyContent: "center",
          color:          "#fff",
          fontSize:       16,
          flexShrink:     0,
          boxShadow:      "0 1px 4px rgba(0, 135, 85, 0.35)",
        }}
      >
        {logoIcon}
      </div>

      {!collapsed && logoLabel && (
        <span
          style={{
            color:         textColor,
            fontWeight:    "var(--font-weight-semibold)",
            fontSize:      "var(--font-size-sm)",
            letterSpacing: "-0.01em",
            whiteSpace:    "nowrap",
            overflow:      "hidden",
            textOverflow:  "ellipsis",
            lineHeight:    1,
          }}
        >
          {logoLabel}
        </span>
      )}
    </div>
  );
}
