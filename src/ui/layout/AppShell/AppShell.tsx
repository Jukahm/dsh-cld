import type { ReactNode } from "react";
import { Drawer, Layout } from "antd";

const { Sider, Content } = Layout;

interface AppShellProps {
  sidebar: ReactNode;
  children: ReactNode;
  collapsed: boolean;
  onCollapse: (collapsed: boolean) => void;
  isMobile: boolean;
  mobileNavOpen: boolean;
  onMobileNavClose: () => void;
}

export function AppShell({
  sidebar,
  children,
  collapsed,
  onCollapse,
  isMobile,
  mobileNavOpen,
  onMobileNavClose,
}: AppShellProps) {
  return (
    <Layout style={{ minHeight: "100vh" }}>
      {/* ── Desktop sidebar ────────────────────────────────────────────────── */}
      {!isMobile && (
        <Sider
          collapsible
          collapsed={collapsed}
          onCollapse={onCollapse}
          trigger={null}
          width={220}
          collapsedWidth={56}
          style={{
            overflow:          "auto",
            height:            "100vh",
            position:          "fixed",
            insetInlineStart:  0,
            top:               0,
            bottom:            0,
            scrollbarWidth:    "none",
            background:        "var(--sidebar-bg)",
          }}
        >
          {sidebar}
        </Sider>
      )}

      {/* ── Mobile drawer ──────────────────────────────────────────────────── */}
      {isMobile && (
        <Drawer
          placement="left"
          open={mobileNavOpen}
          onClose={onMobileNavClose}
          width={220}
          closable={false}
          styles={{
            body: { padding: 0, overflow: "hidden" },
            mask: {
              backdropFilter:       "blur(6px)",
              WebkitBackdropFilter: "blur(6px)",
              background:           "rgba(15, 23, 42, 0.35)",
            },
            wrapper: { boxShadow: "var(--shadow-lg)" },
          }}
        >
          {sidebar}
        </Drawer>
      )}

      {/* ── Main content ───────────────────────────────────────────────────── */}
      <Layout
        style={{
          marginInlineStart: isMobile ? 0 : collapsed ? 56 : 220,
          transition:        "margin 0.2s",
        }}
      >
        <Content
          style={{
            padding:    "var(--spacing-4) var(--spacing-6)",
            overflow:   "auto",
            minHeight:  "100vh",
            background: "var(--color-surface-gray-50)",
          }}
        >
          {children}
        </Content>
      </Layout>
    </Layout>
  );
}
