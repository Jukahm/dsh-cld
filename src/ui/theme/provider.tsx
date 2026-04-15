import { createContext, useContext, useState } from "react";
import type { ReactNode } from "react";
import { ConfigProvider, App, theme as antdThemeAPI } from "antd";
import { antdTheme, antdDarkOverrides } from "@/tokens";

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
    token: isDark
      ? { ...antdTheme.token, ...antdDarkOverrides.token }
      : antdTheme.token,
    components: isDark
      ? {
          ...antdTheme.components,
          Table:  { ...antdTheme.components.Table,  ...antdDarkOverrides.components.Table  },
          Layout: { ...antdTheme.components.Layout, ...antdDarkOverrides.components.Layout },
          Menu:   { ...antdTheme.components.Menu,   ...antdDarkOverrides.components.Menu   },
        }
      : antdTheme.components,
  };

  return (
    <ThemeContext.Provider value={{ isDark, toggle }}>
      <ConfigProvider theme={configTheme}>
        <App>{children}</App>
      </ConfigProvider>
    </ThemeContext.Provider>
  );
}
