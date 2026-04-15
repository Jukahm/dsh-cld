import { Tooltip } from "antd";
import type { UserProfile } from "../types.js";

interface SideNavUserProps {
  user: UserProfile;
  collapsed: boolean;
  textPrimary: string;
  textMuted: string;
  avatarBg: string;
}

export function SideNavUser({ user, collapsed, textPrimary, textMuted, avatarBg }: SideNavUserProps) {
  return (
    <Tooltip title={collapsed ? `${user.name}\n${user.email}` : undefined} placement="right">
      <div
        style={{
          padding:        collapsed ? "var(--spacing-3) var(--spacing-2)" : "var(--spacing-3) var(--spacing-4)",
          display:        "flex",
          alignItems:     "center",
          gap:            "var(--spacing-2)",
          justifyContent: collapsed ? "center" : "flex-start",
          flexShrink:     0,
        }}
      >
        <div
          style={{
            width:          30,
            height:         30,
            borderRadius:   "var(--radius-full)",
            background:     avatarBg,
            display:        "flex",
            alignItems:     "center",
            justifyContent: "center",
            color:          "var(--color-text-inverse)",
            fontSize:       "var(--font-size-xs)",
            fontWeight:     "var(--font-weight-semibold)",
            flexShrink:     0,
            lineHeight:     1,
          }}
        >
          {user.initials}
        </div>

        {!collapsed && (
          <div style={{ minWidth: 0 }}>
            <div style={{ color: textPrimary, fontSize: "var(--font-size-sm)", fontWeight: "var(--font-weight-medium)", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
              {user.name}
            </div>
            <div style={{ color: textMuted, fontSize: "var(--font-size-xs)", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
              {user.email}
            </div>
          </div>
        )}
      </div>
    </Tooltip>
  );
}
