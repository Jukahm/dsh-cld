import { useState, useContext, createContext } from "react";
import type { ReactNode } from "react";
import { Input, Badge, Popover, Dropdown, Avatar, Divider, Button } from "antd";
import type { MenuProps } from "antd";
import {
  SearchOutlined,
  BulbOutlined,
  MoonFilled,
  BellOutlined,
  UserOutlined,
  LogoutOutlined,
  CheckOutlined,
  MenuOutlined,
} from "@ant-design/icons";
import type { UserProfile } from "../../navigation/SideNav/SideNav.js";

// ── Types ─────────────────────────────────────────────────────────────────────

export interface AppNotification {
  id: string;
  title: string;
  description?: string;
  time: string;
  read: boolean;
}

interface HeaderContextValue {
  isDark: boolean;
  onToggleDark: () => void;
  notifications: AppNotification[];
  onMarkAllRead: () => void;
  user: UserProfile;
  isMobile: boolean;
  onOpenMobileNav: () => void;
}

// ── Context ───────────────────────────────────────────────────────────────────

export const HeaderContext = createContext<HeaderContextValue | null>(null);

interface HeaderProviderProps {
  value: HeaderContextValue;
  children: ReactNode;
}

export function HeaderProvider({ value, children }: HeaderProviderProps) {
  return (
    <HeaderContext.Provider value={value}>{children}</HeaderContext.Provider>
  );
}

// ── NotificationPanel ─────────────────────────────────────────────────────────

function NotificationPanel({
  notifications,
  onMarkAllRead,
}: {
  notifications: AppNotification[];
  onMarkAllRead: () => void;
}) {
  const hasUnread = notifications.some((n) => !n.read);

  return (
    <div style={{ width: 300 }}>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "var(--spacing-3) var(--spacing-4)",
          borderBottom: "1px solid var(--color-border)",
        }}
      >
        <span
          style={{
            fontWeight: "var(--font-weight-semibold)",
            fontSize: "var(--font-size-sm)",
            color: "var(--color-text-primary)",
          }}
        >
          Notifications
        </span>
        {hasUnread && (
          <button
            onClick={onMarkAllRead}
            style={{
              background: "none",
              border: "none",
              cursor: "pointer",
              color: "var(--color-text-accent)",
              fontSize: "var(--font-size-xs)",
              display: "flex",
              alignItems: "center",
              gap: 4,
              padding: 0,
            }}
          >
            <CheckOutlined style={{ fontSize: 10 }} />
            Mark all read
          </button>
        )}
      </div>

      <div style={{ maxHeight: 340, overflow: "auto" }}>
        {notifications.length === 0 ? (
          <div
            style={{
              padding: "var(--spacing-6) var(--spacing-4)",
              textAlign: "center",
              color: "var(--color-text-tertiary)",
              fontSize: "var(--font-size-sm)",
            }}
          >
            No notifications
          </div>
        ) : (
          notifications.map((n, i) => (
            <div key={n.id}>
              <div
                style={{
                  padding: "var(--spacing-3) var(--spacing-4)",
                  background: n.read
                    ? "transparent"
                    : "var(--color-surface-gray-50)",
                  display: "flex",
                  gap: "var(--spacing-2)",
                  alignItems: "flex-start",
                }}
              >
                <div
                  style={{
                    width: 7,
                    height: 7,
                    borderRadius: "var(--radius-full)",
                    background: n.read ? "transparent" : "var(--color-accent)",
                    flexShrink: 0,
                    marginTop: 5,
                  }}
                />
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div
                    style={{
                      fontSize: "var(--font-size-sm)",
                      fontWeight: n.read
                        ? "var(--font-weight-normal)"
                        : "var(--font-weight-medium)",
                      color: "var(--color-text-primary)",
                      marginBottom: 2,
                    }}
                  >
                    {n.title}
                  </div>
                  {n.description && (
                    <div
                      style={{
                        fontSize: "var(--font-size-xs)",
                        color: "var(--color-text-secondary)",
                        marginBottom: 4,
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                        whiteSpace: "nowrap",
                      }}
                    >
                      {n.description}
                    </div>
                  )}
                  <div
                    style={{
                      fontSize: "var(--font-size-xs)",
                      color: "var(--color-text-tertiary)",
                    }}
                  >
                    {n.time}
                  </div>
                </div>
              </div>
              {i < notifications.length - 1 && (
                <Divider style={{ margin: 0 }} />
              )}
            </div>
          ))
        )}
      </div>
    </div>
  );
}

// ── Icon button helper ────────────────────────────────────────────────────────

const iconButtonStyle: React.CSSProperties = {
  background: "none",
  border: "none",
  cursor: "pointer",
  color: "var(--color-text-secondary)",
  padding: "var(--spacing-1)",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  borderRadius: "var(--radius-sm)",
  lineHeight: 1,
  height: 30,
  width: 30,
  transition: "color 0.15s, background 0.15s",
};

// ── HeaderActions (renders inside PageHeader's actions slot) ──────────────────

export function HeaderActions() {
  const ctx = useContext(HeaderContext);
  const [notifOpen, setNotifOpen] = useState(false);

  if (!ctx) return null;

  const { isDark, onToggleDark, notifications, onMarkAllRead, user, isMobile, onOpenMobileNav } = ctx;
  const hasUnread = notifications.some((n) => !n.read);

  const profileItems: MenuProps["items"] = [
    {
      key: "profile-info",
      label: (
        <div style={{ padding: "var(--spacing-1) 0" }}>
          <div
            style={{
              fontWeight: "var(--font-weight-medium)",
              fontSize: "var(--font-size-sm)",
              color: "var(--color-text-primary)",
            }}
          >
            {user.name}
          </div>
          <div
            style={{
              fontSize: "var(--font-size-xs)",
              color: "var(--color-text-tertiary)",
            }}
          >
            {user.email}
          </div>
        </div>
      ),
      disabled: true,
    },
    { type: "divider" },
    {
      key: "account",
      icon: <UserOutlined />,
      label: "My Account",
      disabled: true,
    },
    {
      key: "logout",
      icon: <LogoutOutlined />,
      label: "Log out",
      disabled: true,
    },
  ];

  return (
    <div
      style={{ display: "flex", alignItems: "center", gap: "var(--spacing-1)" }}
    >
      {/* Mobile hamburger — only shown when sidebar is hidden */}
      {isMobile && (
        <button
          style={iconButtonStyle}
          onClick={onOpenMobileNav}
          title="Menu"
          onMouseEnter={(e) => {
            const el = e.currentTarget as HTMLButtonElement;
            el.style.color = "var(--color-text-primary)";
            el.style.background = "var(--color-surface-gray-100)";
          }}
          onMouseLeave={(e) => {
            const el = e.currentTarget as HTMLButtonElement;
            el.style.color = "var(--color-text-secondary)";
            el.style.background = "none";
          }}
        >
          <MenuOutlined style={{ fontSize: 15 }} />
        </button>
      )}

      {/* Search */}
      <Input
        placeholder="Search..."
        prefix={
          <SearchOutlined style={{ color: "var(--color-text-tertiary)" }} />
        }
        size="small"
        style={{
          width: 180,
          borderRadius: "var(--radius-md)",
          fontSize: "var(--font-size-sm)",
        }}
      />

      {/* Dark mode toggle */}
      <button
        onClick={onToggleDark}
        style={iconButtonStyle}
        title={isDark ? "Switch to light mode" : "Switch to dark mode"}
        onMouseEnter={(e) => {
          const el = e.currentTarget as HTMLButtonElement;
          el.style.color = "var(--color-text-primary)";
          el.style.background = "var(--color-surface-gray-100)";
        }}
        onMouseLeave={(e) => {
          const el = e.currentTarget as HTMLButtonElement;
          el.style.color = "var(--color-text-secondary)";
          el.style.background = "none";
        }}
      >
        {isDark ? (
          <BulbOutlined style={{ fontSize: 15 }} />
        ) : (
          <MoonFilled style={{ fontSize: 14 }} />
        )}
      </button>

      {/* Notifications */}
      <Popover
        open={notifOpen}
        onOpenChange={setNotifOpen}
        trigger="click"
        placement="bottomRight"
        arrow={false}
        content={
          <NotificationPanel
            notifications={notifications}
            onMarkAllRead={() => {
              onMarkAllRead();
              setNotifOpen(false);
            }}
          />
        }
        styles={{ body: { padding: 0 } }}
      >
        <button
          style={iconButtonStyle}
          title="Notifications"
          onMouseEnter={(e) => {
            const el = e.currentTarget as HTMLButtonElement;
            el.style.color = "var(--color-text-primary)";
            el.style.background = "var(--color-surface-gray-100)";
          }}
          onMouseLeave={(e) => {
            const el = e.currentTarget as HTMLButtonElement;
            el.style.color = "var(--color-text-secondary)";
            el.style.background = "none";
          }}
        >
          <Badge dot={hasUnread} status="processing" offset={[-2, 2]}>
            <BellOutlined style={{ fontSize: 15, display: "block" }} />
          </Badge>
        </button>
      </Popover>

      {/* Profile */}
      <Dropdown
        menu={{ items: profileItems }}
        trigger={["click"]}
        placement="bottomRight"
      >
        <Button
          type="text"
          size="small"
          style={{
            display: "flex",
            alignItems: "center",
            gap: "var(--spacing-1)",
            padding: "0 var(--spacing-2)",
            height: 30,
            borderRadius: "var(--radius-md)",
          }}
        >
          <Avatar
            size={22}
            style={{
              background: "var(--color-accent)",
              fontSize: "var(--font-size-xs)",
              fontWeight: "var(--font-weight-semibold)",
              flexShrink: 0,
            }}
          >
            {user.initials}
          </Avatar>
        </Button>
      </Dropdown>
    </div>
  );
}
