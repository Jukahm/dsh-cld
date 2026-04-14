import { createContext, useContext, useState } from "react";
import type { ReactNode } from "react";
import { ConfigProvider, App, theme as antdThemeAPI } from "antd";
import { antdTheme } from "@/tokens";

// ── Context ───────────────────────────────────────────────────────────────────

interface ThemeContextValue {
  isDark: boolean;
  toggle: () => void;
}

const ThemeContext = createContext<ThemeContextValue | null>(null);

export function useTheme(): ThemeContextValue {
  const ctx = useContext(ThemeContext);
  if (!ctx) throw new Error("useTheme must be used inside ThemeProvider");
  return ctx;
}

// ── Provider ──────────────────────────────────────────────────────────────────

interface ThemeProviderProps {
  children: ReactNode;
}

export function ThemeProvider({ children }: ThemeProviderProps) {
  const [isDark, setIsDark] = useState(false);

  function toggle() {
    setIsDark((prev) => {
      const next = !prev;
      document.documentElement.setAttribute("data-theme", next ? "dark" : "light");
      // Also set on body for Antd popup portals that mount outside <html>
      document.body.setAttribute("data-theme", next ? "dark" : "light");
      return next;
    });
  }

  const configTheme = {
    ...antdTheme,
    algorithm: isDark ? antdThemeAPI.darkAlgorithm : antdThemeAPI.defaultAlgorithm,
    token: {
      ...antdTheme.token,
      colorBgBase:          isDark ? "#1E293B" : "#ffffff",
      colorTextBase:        isDark ? "#F8FAFC" : "#0F172A",
      colorBorder:          isDark ? "#334155" : "#E2E8F0",
      colorBorderSecondary: isDark ? "#475569" : "#CBD5E1",
    },
    components: {
      ...antdTheme.components,
      Table: {
        ...antdTheme.components.Table,
        headerBg:           isDark ? "#1E293B" : "#F8FAFC",
        headerColor:        isDark ? "#94A3B8" : "#64748B",
        headerSortActiveBg: isDark ? "#334155" : "#F1F5F9",
        rowHoverBg:         isDark ? "#334155" : "#F8FAFC",
        borderColor:        isDark ? "#334155" : "#E2E8F0",
      },
      Layout: {
        ...antdTheme.components.Layout,
        // Page background: darkest — #0F172A so cards (#1E293B) pop against it
        bodyBg:   isDark ? "#0F172A" : "#F8FAFC",
        // Sidebar has its own bg via CSS var — this only affects Antd Layout header
        headerBg: isDark ? "#1E293B" : "#ffffff",
        siderBg:  isDark ? "#1A2333" : "#ffffff",
      },
      Menu: {
        ...antdTheme.components.Menu,
        // In dark mode override the dark item tokens for the sidebar menu
        darkItemBg:            isDark ? "#1A2333"                    : antdTheme.components.Menu.darkItemBg,
        darkItemHoverBg:       isDark ? "rgba(34, 197, 94, 0.12)"    : antdTheme.components.Menu.darkItemHoverBg,
        darkItemSelectedBg:    isDark ? "rgba(22, 163, 74, 0.22)"    : antdTheme.components.Menu.darkItemSelectedBg,
        darkItemSelectedColor: isDark ? "#4ADE80"                    : antdTheme.components.Menu.darkItemSelectedColor,
      },
    },
  };

  return (
    <ThemeContext.Provider value={{ isDark, toggle }}>
      <ConfigProvider theme={configTheme}>
        <App>{children}</App>
      </ConfigProvider>
    </ThemeContext.Provider>
  );
}
