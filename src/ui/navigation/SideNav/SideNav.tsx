import type { ReactNode } from "react";
import { ConfigProvider, Menu, Tooltip } from "antd";
import type { MenuProps } from "antd";
import { LeftOutlined, RightOutlined } from "@ant-design/icons";
import { useTheme } from "../../theme/provider.js";

export interface NavItem {
  key: string;
  label: string;
  icon?: ReactNode;
  href?: string;
  disabled?: boolean;
  children?: NavItem[];
}

export interface NavSection {
  key: string;
  label?: string;
  items: NavItem[];
  bottom?: boolean;
}

export interface UserProfile {
  name: string;
  email: string;
  initials: string;
}

interface SideNavProps {
  sections: NavSection[];
  activeKey?: string;
  onNavigate?: (key: string) => void;
  collapsed: boolean;
  onCollapseToggle: () => void;
  logoIcon?: ReactNode;
  logoLabel?: string;
  user?: UserProfile;
  /** When true (inside a Drawer), hides the collapse toggle strip */
  inDrawer?: boolean;
}

type AntdItem = Required<MenuProps>["items"][number];

function toMenuItems(sections: NavSection[], collapsed: boolean): AntdItem[] {
  const items: AntdItem[] = [];
  for (const section of sections) {
    if (section.label) {
      items.push({
        type: "group",
        label: collapsed ? null : section.label,
        key: `group-${section.key}`,
      });
    }
    for (const item of section.items) {
      if (item.children && item.children.length > 0) {
        items.push({
          key: item.key,
          label: item.label,
          icon: item.icon,
          disabled: item.disabled,
          children: item.children.map((child) => ({
            key: child.key,
            label: child.label,
            icon: child.icon,
            disabled: child.disabled,
          })),
        });
      } else {
        items.push({
          key: item.key,
          label: item.label,
          icon: item.icon,
          disabled: item.disabled,
        });
      }
    }
  }
  return items;
}

export function SideNav({
  sections,
  activeKey,
  onNavigate,
  collapsed,
  onCollapseToggle,
  logoIcon,
  logoLabel,
  user,
  inDrawer = false,
}: SideNavProps) {
  const { isDark } = useTheme();

  // ── Derived sidebar-specific colors ────────────────────────────────────────
  // These are intentionally local to the sidebar and don't follow the
  // page surface tokens — the sidebar has its own independent background.
  const colors = isDark
    ? {
        bg:          "#1A2333",
        border:      "#2D3B52",
        textPrimary: "#F8FAFC",
        textMuted:   "#94A3B8",
        toggle:      "#64748B",
        toggleHover: "#94A3B8",
        avatarBg:    "#16A34A",
      }
    : {
        bg:          "#ffffff",
        border:      "#E2E8F0",
        textPrimary: "#111827",
        textMuted:   "#64748B",
        toggle:      "#94A3B8",
        toggleHover: "#374151",
        avatarBg:    "#16A34A",
      };

  // ── Antd Menu token overrides (green active states) ─────────────────────────
  const menuTokens = isDark
    ? {
        itemBg:             "transparent",
        itemColor:          "#CBD5E1",
        itemHoverColor:     "#4ADE80",
        itemHoverBg:        "rgba(34, 197, 94, 0.12)",
        itemSelectedColor:  "#4ADE80",
        itemSelectedBg:     "rgba(22, 163, 74, 0.22)",
        groupTitleColor:    "#64748B",
        iconSize:           14,
      }
    : {
        itemBg:             "transparent",
        itemColor:          "#4B5563",
        itemHoverColor:     "#15803D",
        itemHoverBg:        "#F0FDF4",
        itemSelectedColor:  "#15803D",
        itemSelectedBg:     "#DCFCE7",
        groupTitleColor:    "#94A3B8",
        iconSize:           14,
      };

  const dividerStyle = `1px solid ${colors.border}`;

  return (
    <div
      style={{
        display:         "flex",
        flexDirection:   "column",
        height:          "100%",
        background:      colors.bg,
        borderRight:     dividerStyle,
        userSelect:      "none",
        transition:      "background 0.2s",
      }}
    >
      {/* ── Logo ─────────────────────────────────────────────────────────── */}
      <div
        style={{
          height:          52,
          padding:         collapsed ? "0 var(--spacing-2)" : "0 var(--spacing-4)",
          display:         "flex",
          alignItems:      "center",
          justifyContent:  collapsed ? "center" : "flex-start",
          borderBottom:    dividerStyle,
          flexShrink:      0,
          gap:             "var(--spacing-2)",
        }}
      >
        {logoIcon && (
          <>
            <span
              style={{
                color:      "#16A34A",
                fontSize:   "var(--font-size-lg)",
                flexShrink: 0,
                lineHeight: 1,
              }}
            >
              {logoIcon}
            </span>
            {!collapsed && logoLabel && (
              <span
                style={{
                  color:         colors.textPrimary,
                  fontWeight:    "var(--font-weight-semibold)",
                  fontSize:      "var(--font-size-sm)",
                  whiteSpace:    "nowrap",
                  overflow:      "hidden",
                  textOverflow:  "ellipsis",
                }}
              >
                {logoLabel}
              </span>
            )}
          </>
        )}
      </div>

      {/* ── Top navigation ───────────────────────────────────────────────── */}
      <div style={{ flex: 1, overflow: "auto", overflowX: "hidden" }}>
        <ConfigProvider theme={{ components: { Menu: menuTokens } }}>
          <Menu
            mode="inline"
            inlineCollapsed={collapsed}
            selectedKeys={activeKey ? [activeKey] : []}
            items={toMenuItems(sections.filter((s) => !s.bottom), collapsed)}
            onClick={({ key }) => onNavigate?.(key)}
            style={{
              border:     "none",
              background: "transparent",
              fontSize:   "var(--font-size-sm)",
            }}
          />
        </ConfigProvider>
      </div>

      {/* ── Bottom navigation (Support etc.) ─────────────────────────────── */}
      {sections.some((s) => s.bottom) && (
        <div style={{ flexShrink: 0 }}>
          <ConfigProvider theme={{ components: { Menu: menuTokens } }}>
            <Menu
              mode="inline"
              inlineCollapsed={collapsed}
              selectedKeys={activeKey ? [activeKey] : []}
              items={toMenuItems(sections.filter((s) => s.bottom), collapsed)}
              onClick={({ key }) => onNavigate?.(key)}
              style={{
                border:     "none",
                background: "transparent",
                fontSize:   "var(--font-size-sm)",
              }}
            />
          </ConfigProvider>
        </div>
      )}

      {/* ── User profile ─────────────────────────────────────────────────── */}
      {user && (
        <Tooltip
          title={collapsed ? `${user.name}\n${user.email}` : undefined}
          placement="right"
        >
          <div
            style={{
              borderTop:      dividerStyle,
              padding:        collapsed
                ? "var(--spacing-3) var(--spacing-2)"
                : "var(--spacing-3) var(--spacing-4)",
              display:        "flex",
              alignItems:     "center",
              gap:            "var(--spacing-2)",
              justifyContent: collapsed ? "center" : "flex-start",
              flexShrink:     0,
            }}
          >
            {/* Avatar */}
            <div
              style={{
                width:           30,
                height:          30,
                borderRadius:    "var(--radius-full)",
                background:      colors.avatarBg,
                display:         "flex",
                alignItems:      "center",
                justifyContent:  "center",
                color:           "#ffffff",
                fontSize:        "var(--font-size-xs)",
                fontWeight:      "var(--font-weight-semibold)",
                flexShrink:      0,
                lineHeight:      1,
              }}
            >
              {user.initials}
            </div>

            {!collapsed && (
              <div style={{ minWidth: 0 }}>
                <div
                  style={{
                    color:         colors.textPrimary,
                    fontSize:      "var(--font-size-sm)",
                    fontWeight:    "var(--font-weight-medium)",
                    whiteSpace:    "nowrap",
                    overflow:      "hidden",
                    textOverflow:  "ellipsis",
                  }}
                >
                  {user.name}
                </div>
                <div
                  style={{
                    color:         colors.textMuted,
                    fontSize:      "var(--font-size-xs)",
                    whiteSpace:    "nowrap",
                    overflow:      "hidden",
                    textOverflow:  "ellipsis",
                  }}
                >
                  {user.email}
                </div>
              </div>
            )}
          </div>
        </Tooltip>
      )}

      {/* ── Collapse toggle (hidden inside Drawer) ────────────────────────── */}
      {!inDrawer && (
        <div
          style={{
            borderTop:      dividerStyle,
            height:         36,
            display:        "flex",
            alignItems:     "center",
            justifyContent: "center",
            flexShrink:     0,
          }}
        >
          <button
            onClick={onCollapseToggle}
            style={{
              background:     "none",
              border:         "none",
              cursor:         "pointer",
              color:          colors.toggle,
              width:          "100%",
              height:         "100%",
              display:        "flex",
              alignItems:     "center",
              justifyContent: "center",
              transition:     "color 0.15s",
            }}
            onMouseEnter={(e) => {
              (e.currentTarget as HTMLButtonElement).style.color = colors.toggleHover;
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLButtonElement).style.color = colors.toggle;
            }}
          >
            {collapsed ? (
              <RightOutlined style={{ fontSize: 11 }} />
            ) : (
              <LeftOutlined style={{ fontSize: 11 }} />
            )}
          </button>
        </div>
      )}
    </div>
  );
}
