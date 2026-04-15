import type { ReactNode } from "react";
import { ConfigProvider, Menu, Tooltip } from "antd";
import type { MenuProps } from "antd";
import { LeftOutlined, RightOutlined } from "@ant-design/icons";
import { useTheme } from "../../theme/provider.js";
import { sideNavPalette, menuTokens } from "@/tokens";

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
          children: item.children.map((c) => ({
            key: c.key,
            label: c.label,
            icon: c.icon,
            disabled: c.disabled,
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

/** Horizontal rule that fades to transparent at both edges. */
function GradientDivider({ color }: { color: string }) {
  return (
    <div
      style={{
        height: 1,
        flexShrink: 0,
        background: `linear-gradient(to right, transparent, ${color} 20%, ${color} 80%, transparent)`,
      }}
    />
  );
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

  const colors = isDark ? sideNavPalette.dark : sideNavPalette.light;
  const navMenuTokens = isDark ? menuTokens.dark : menuTokens.light;

  // Right-edge shadow separates sidebar from content more convincingly than a border alone
  const sidebarShadow = isDark
    ? "2px 0 16px rgba(0, 0, 0, 0.35), 1px 0 0 rgba(45, 59, 82, 0.6)"
    : "2px 0 12px rgba(15, 23, 42, 0.06), 1px 0 0 rgba(226, 232, 240, 0.9)";

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        height: "100%",
        background: colors.bg,
        boxShadow: sidebarShadow,
        userSelect: "none",
        transition: "background 0.2s",
      }}
    >
      {/* ── Logo ─────────────────────────────────────────────────────────── */}
      <div
        style={{
          height: 58,
          padding: collapsed ? "0 var(--spacing-2)" : "0 var(--spacing-4)",
          display: "flex",
          alignItems: "center",
          justifyContent: collapsed ? "center" : "flex-start",
          flexShrink: 0,
          gap: "var(--spacing-3)",
        }}
      >
        {logoIcon && (
          <>
            {/* Branded icon badge — green square, white icon */}
            <div
              style={{
                width: 32,
                height: 32,
                borderRadius: "var(--radius-md)",
                background: "var(--color-primary)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                color: "#fff",
                fontSize: 16,
                flexShrink: 0,
                boxShadow: "0 1px 4px rgba(0, 135, 85, 0.35)",
              }}
            >
              {logoIcon}
            </div>
            {!collapsed && logoLabel && (
              <span
                style={{
                  color: colors.textPrimary,
                  fontWeight: "var(--font-weight-semibold)",
                  fontSize: "var(--font-size-sm)",
                  letterSpacing: "-0.01em",
                  whiteSpace: "nowrap",
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                  lineHeight: 1,
                }}
              >
                {logoLabel}
              </span>
            )}
          </>
        )}
      </div>

      <GradientDivider color={colors.border} />

      {/* ── Top navigation ───────────────────────────────────────────────── */}
      <div
        style={{
          flex: 1,
          overflow: "auto",
          overflowX: "hidden",
          paddingTop: 4,
        }}
      >
        <ConfigProvider theme={{ components: { Menu: navMenuTokens } }}>
          <Menu
            mode="inline"
            inlineCollapsed={collapsed}
            selectedKeys={activeKey ? [activeKey] : []}
            items={toMenuItems(
              sections.filter((s) => !s.bottom),
              collapsed,
            )}
            onClick={({ key }) => onNavigate?.(key)}
            style={{
              border: "none",
              background: "transparent",
              fontSize: "var(--font-size-sm)",
            }}
          />
        </ConfigProvider>
      </div>

      {/* ── Bottom navigation ────────────────────────────────────────────── */}
      {sections.some((s) => s.bottom) && (
        <>
          <div style={{ flexShrink: 0 }}>
            <ConfigProvider theme={{ components: { Menu: navMenuTokens } }}>
              <Menu
                mode="inline"
                inlineCollapsed={collapsed}
                selectedKeys={activeKey ? [activeKey] : []}
                items={toMenuItems(
                  sections.filter((s) => s.bottom),
                  collapsed,
                )}
                onClick={({ key }) => onNavigate?.(key)}
                style={{
                  border: "none",
                  background: "transparent",
                  fontSize: "var(--font-size-sm)",
                }}
              />
            </ConfigProvider>
          </div>
        </>
      )}

      {/* ── User profile ─────────────────────────────────────────────────── */}
      {user && (
        <>
          <GradientDivider color={colors.border} />
          <Tooltip
            title={collapsed ? `${user.name}\n${user.email}` : undefined}
            placement="right"
          >
            <div
              style={{
                padding: collapsed
                  ? "var(--spacing-3) var(--spacing-2)"
                  : "var(--spacing-3) var(--spacing-4)",
                display: "flex",
                alignItems: "center",
                gap: "var(--spacing-2)",
                justifyContent: collapsed ? "center" : "flex-start",
                flexShrink: 0,
              }}
            >
              <div
                style={{
                  width: 30,
                  height: 30,
                  borderRadius: "var(--radius-full)",
                  background: colors.avatarBg,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  color: "var(--color-text-inverse)",
                  fontSize: "var(--font-size-xs)",
                  fontWeight: "var(--font-weight-semibold)",
                  flexShrink: 0,
                  lineHeight: 1,
                }}
              >
                {user.initials}
              </div>
              {!collapsed && (
                <div style={{ minWidth: 0 }}>
                  <div
                    style={{
                      color: colors.textPrimary,
                      fontSize: "var(--font-size-sm)",
                      fontWeight: "var(--font-weight-medium)",
                      whiteSpace: "nowrap",
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                    }}
                  >
                    {user.name}
                  </div>
                  <div
                    style={{
                      color: colors.textMuted,
                      fontSize: "var(--font-size-xs)",
                      whiteSpace: "nowrap",
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                    }}
                  >
                    {user.email}
                  </div>
                </div>
              )}
            </div>
          </Tooltip>
        </>
      )}

      {/* ── Collapse toggle ───────────────────────────────────────────────── */}
      {!inDrawer && (
        <>
          <div
            style={{
              height: 32,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              flexShrink: 0,
            }}
          >
            <button
              onClick={onCollapseToggle}
              style={{
                background: "none",
                border: "none",
                cursor: "pointer",
                color: colors.toggle,
                width: "100%",
                height: "100%",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                transition: "color 0.15s",
              }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLButtonElement).style.color =
                  colors.toggleHover;
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLButtonElement).style.color =
                  colors.toggle;
              }}
            >
              {collapsed ? (
                <RightOutlined style={{ fontSize: 11 }} />
              ) : (
                <LeftOutlined style={{ fontSize: 11 }} />
              )}
            </button>
          </div>
        </>
      )}
    </div>
  );
}
