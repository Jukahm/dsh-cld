import { useEffect, useState } from "react";
import {
  createRootRoute,
  Outlet,
  useNavigate,
  useRouterState,
} from "@tanstack/react-router";
import {
  AppShell,
  SideNav,
  HeaderProvider,
  useTheme,
  BankOutlined,
  DashboardOutlined,
  FileAddOutlined,
  LineChartOutlined,
  FundOutlined,
  TableOutlined,
  BellOutlined,
  SettingOutlined,
  QuestionCircleOutlined,
} from "@/ui";
import type { NavSection, AppNotification } from "@/ui";
import { useMediaQuery, breakpoints } from "@/shared/hooks/use-media-query.js";

const navSections: NavSection[] = [
  {
    key: "main",
    items: [
      { key: "/", label: "Dashboard", icon: <DashboardOutlined /> },
      { key: "/comparables", label: "Comparables", icon: <FundOutlined /> },
      { key: "/comparables/matrix", label: "Instr. Matrix", icon: <TableOutlined /> },
      {
        key: "/new-issuance",
        label: "New Issuance",
        icon: <FileAddOutlined />,
        disabled: true,
      },
      {
        key: "/alpha",
        label: "Alpha",
        icon: <LineChartOutlined />,
        disabled: true,
      },
    ],
  },
  {
    key: "support",
    label: "Support",
    bottom: true,
    items: [
      {
        key: "/notifications",
        label: "Notifications",
        icon: <BellOutlined />,
        disabled: true,
      },
      {
        key: "/settings",
        label: "Settings",
        icon: <SettingOutlined />,
        disabled: true,
      },
      {
        key: "/help",
        label: "Help",
        icon: <QuestionCircleOutlined />,
        disabled: true,
      },
    ],
  },
];

const MOCK_NOTIFICATIONS: AppNotification[] = [
  {
    id: "1",
    title: "New order book update",
    description: "10-Year Senior Notes order book exceeded target size",
    time: "2 min ago",
    read: false,
  },
  {
    id: "2",
    title: "Pricing guidance tightened",
    description: "5-Year Senior Notes guidance moved to T+165",
    time: "18 min ago",
    read: false,
  },
  {
    id: "3",
    title: "Allocation report ready",
    description: "Q1 allocation summary is available for review",
    time: "1 hour ago",
    read: true,
  },
];

const USER = {
  name: "Juliano Martins",
  email: "julianoahm@example.com",
  initials: "JM",
};

function RootLayout() {
  const [collapsed, setCollapsed] = useState(false);
  const [mobileNavOpen, setMobileNavOpen] = useState(false);
  const [notifications, setNotifications] =
    useState<AppNotification[]>(MOCK_NOTIFICATIONS);
  const { isDark, toggle: toggleDark } = useTheme();

  const isDesktop = useMediaQuery(breakpoints.lg);
  const isMobile = !isDesktop;

  const navigate = useNavigate();
  const routerState = useRouterState();
  const activeKey = routerState.location.pathname;

  // Close mobile drawer on route change
  useEffect(() => {
    setMobileNavOpen(false);
  }, [activeKey]);

  // Close mobile drawer when switching to desktop
  useEffect(() => {
    if (isDesktop) setMobileNavOpen(false);
  }, [isDesktop]);

  const sidebar = (
    <SideNav
      sections={navSections}
      activeKey={activeKey}
      onNavigate={(key) => navigate({ to: key })}
      collapsed={isMobile ? false : collapsed}
      onCollapseToggle={() => setCollapsed((c) => !c)}
      logoIcon={<BankOutlined />}
      logoLabel="PRIMARY PORTAL"
      user={USER}
      inDrawer={isMobile}
    />
  );

  return (
    <HeaderProvider
      value={{
        isDark,
        onToggleDark: toggleDark,
        notifications,
        onMarkAllRead: () =>
          setNotifications((prev) => prev.map((n) => ({ ...n, read: true }))),
        user: USER,
        isMobile,
        onOpenMobileNav: () => setMobileNavOpen(true),
      }}
    >
      <AppShell
        sidebar={sidebar}
        collapsed={collapsed}
        onCollapse={setCollapsed}
        isMobile={isMobile}
        mobileNavOpen={mobileNavOpen}
        onMobileNavClose={() => setMobileNavOpen(false)}
      >
        <Outlet />
      </AppShell>
    </HeaderProvider>
  );
}

export const Route = createRootRoute({
  component: RootLayout,
});
