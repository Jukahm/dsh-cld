import type { ReactNode } from "react";
import { ConfigProvider, Menu } from "antd";
import { useTheme } from "../../theme/provider.js";
import { sideNavPalette, menuTokens } from "@/tokens";
import type { NavSection, UserProfile } from "./types.js";
import { toMenuItems } from "./menu-items.js";
import { GradientDivider } from "./components/GradientDivider.js";
import { SideNavLogo } from "./components/SideNavLogo.js";
import { SideNavUser } from "./components/SideNavUser.js";
import { SideNavToggle } from "./components/SideNavToggle.js";

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

export function SideNav({
  sections, activeKey, onNavigate, collapsed, onCollapseToggle,
  logoIcon, logoLabel, user, inDrawer = false,
}: SideNavProps) {
  const { isDark } = useTheme();

  const colors        = isDark ? sideNavPalette.dark : sideNavPalette.light;
  const navMenuTokens = isDark ? menuTokens.dark     : menuTokens.light;

  const sidebarShadow = isDark
    ? "2px 0 16px rgba(0, 0, 0, 0.35), 1px 0 0 rgba(45, 59, 82, 0.6)"
    : "2px 0 12px rgba(15, 23, 42, 0.06), 1px 0 0 rgba(226, 232, 240, 0.9)";

  const topSections    = sections.filter((s) => !s.bottom);
  const bottomSections = sections.filter((s) => s.bottom);

  return (
    <div style={{ display: "flex", flexDirection: "column", height: "100%", background: colors.bg, boxShadow: sidebarShadow, userSelect: "none", transition: "background 0.2s" }}>

      <SideNavLogo collapsed={collapsed} logoIcon={logoIcon} logoLabel={logoLabel} textColor={colors.textPrimary} />

      <GradientDivider color={colors.border} />

      {/* ── Top navigation ───────────────────────────────────────────────── */}
      <div style={{ flex: 1, overflow: "auto", overflowX: "hidden", paddingTop: 4 }}>
        <ConfigProvider theme={{ components: { Menu: navMenuTokens } }}>
          <Menu
            mode="inline"
            inlineCollapsed={collapsed}
            selectedKeys={activeKey ? [activeKey] : []}
            items={toMenuItems(topSections, collapsed)}
            onClick={({ key }) => onNavigate?.(key)}
            style={{ border: "none", background: "transparent", fontSize: "var(--font-size-sm)" }}
          />
        </ConfigProvider>
      </div>

      {/* ── Bottom navigation ────────────────────────────────────────────── */}
      {bottomSections.length > 0 && (
        <>
          <GradientDivider color={colors.border} />
          <div style={{ flexShrink: 0 }}>
            <ConfigProvider theme={{ components: { Menu: navMenuTokens } }}>
              <Menu
                mode="inline"
                inlineCollapsed={collapsed}
                selectedKeys={activeKey ? [activeKey] : []}
                items={toMenuItems(bottomSections, collapsed)}
                onClick={({ key }) => onNavigate?.(key)}
                style={{ border: "none", background: "transparent", fontSize: "var(--font-size-sm)" }}
              />
            </ConfigProvider>
          </div>
        </>
      )}

      {/* ── User profile ─────────────────────────────────────────────────── */}
      {user && (
        <>
          <GradientDivider color={colors.border} />
          <SideNavUser
            user={user}
            collapsed={collapsed}
            textPrimary={colors.textPrimary}
            textMuted={colors.textMuted}
            avatarBg={colors.avatarBg}
          />
        </>
      )}

      {/* ── Collapse toggle ───────────────────────────────────────────────── */}
      {!inDrawer && (
        <>
          <GradientDivider color={colors.border} />
          <SideNavToggle
            collapsed={collapsed}
            onToggle={onCollapseToggle}
            color={colors.toggle}
            colorHover={colors.toggleHover}
          />
        </>
      )}
    </div>
  );
}
