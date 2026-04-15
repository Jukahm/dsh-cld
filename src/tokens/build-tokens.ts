/**
 * Token build script: reads tokens.json → emits CSS custom properties,
 * Antd 5 theme config, Tailwind theme extension, and theme constants.
 *
 * Run via: npm run build:tokens
 */

import { writeFileSync, mkdirSync, readFileSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const rootDir = __dirname; // src/tokens/
const generatedDir = join(rootDir, "generated");
const tokensPath = join(rootDir, "tokens.json");

const tokens = JSON.parse(readFileSync(tokensPath, "utf-8")) as TokensJson;

mkdirSync(generatedDir, { recursive: true });

// ─── Type definitions ────────────────────────────────────────────────────────

interface ColorScale {
  [key: string]: string | undefined;
}

interface ThemeColors {
  primary?: ColorScale;
  surface?: ColorScale;
  accent?: ColorScale;
  success?: ColorScale;
  danger?: ColorScale;
  warning?: ColorScale;
  text?: ColorScale;
  border?: ColorScale;
}

interface SidebarTokens {
  bg: string;
  border: string;
  "text-primary": string;
  "text-secondary": string;
  divider: string;
  "toggle-color": string;
  "toggle-hover": string;
  "avatar-bg": string;
}

interface ThemeVariant {
  color: ThemeColors;
  sidebar: SidebarTokens;
}

// Dark only overrides surfaces/text/border — primary/accent/semantic stay fixed
interface DarkThemeVariant {
  color: Pick<ThemeColors, "surface" | "text" | "border">;
  sidebar: SidebarTokens;
}

interface TokensJson {
  themes: {
    light: ThemeVariant;
    dark: DarkThemeVariant;
  };
  spacing: Record<string, string>;
  radius: Record<string, string>;
  fontSize: Record<string, string>;
  fontFamily: Record<string, string>;
  fontWeight: Record<string, string>;
  lineHeight: Record<string, string>;
  shadow: Record<string, string>;
  zIndex: Record<string, string>;
}

// ─── Helpers ─────────────────────────────────────────────────────────────────

/** Emit flat CSS vars from a color group map. */
function colorGroupVars(group: string, values: ColorScale): string[] {
  const lines: string[] = [];
  for (const [key, value] of Object.entries(values)) {
    if (key === "DEFAULT") continue;
    lines.push(`  --color-${group}-${key}: ${value};`);
  }
  if ("DEFAULT" in values && values.DEFAULT) {
    lines.push(`  --color-${group}: ${values.DEFAULT};`);
  }
  return lines;
}

/** Emit flat CSS vars from a sidebar token map. */
function sidebarVars(sidebar: SidebarTokens): string[] {
  return Object.entries(sidebar).map(
    ([key, value]) => `  --sidebar-${key}: ${value};`,
  );
}

// ─── CSS custom properties ───────────────────────────────────────────────────

function buildCss(t: TokensJson): string {
  const lc = t.themes.light.color;
  const ls = t.themes.light.sidebar;
  const dc = t.themes.dark.color;
  const ds = t.themes.dark.sidebar;

  const root: string[] = [":root {"];

  // Light colors
  for (const [group, values] of Object.entries(lc)) {
    root.push(...colorGroupVars(group, values as ColorScale));
  }

  // Light sidebar
  root.push(...sidebarVars(ls));

  // Spacing
  for (const [key, value] of Object.entries(t.spacing)) {
    root.push(`  --spacing-${key}: ${value};`);
  }

  // Radius
  for (const [key, value] of Object.entries(t.radius)) {
    if (key === "DEFAULT") continue;
    root.push(`  --radius-${key}: ${value};`);
  }
  if (t.radius.DEFAULT) root.push(`  --radius: ${t.radius.DEFAULT};`);

  // Font size
  for (const [key, value] of Object.entries(t.fontSize)) {
    root.push(`  --font-size-${key}: ${value};`);
  }

  // Font family
  for (const [key, value] of Object.entries(t.fontFamily)) {
    root.push(`  --font-family-${key}: ${value};`);
  }

  // Font weight
  for (const [key, value] of Object.entries(t.fontWeight)) {
    root.push(`  --font-weight-${key}: ${value};`);
  }

  // Line height
  for (const [key, value] of Object.entries(t.lineHeight)) {
    root.push(`  --line-height-${key}: ${value};`);
  }

  // Shadow
  for (const [key, value] of Object.entries(t.shadow)) {
    if (key === "DEFAULT") continue;
    root.push(`  --shadow-${key}: ${value};`);
  }
  if (t.shadow.DEFAULT) root.push(`  --shadow: ${t.shadow.DEFAULT};`);

  // Z-index
  for (const [key, value] of Object.entries(t.zIndex)) {
    root.push(`  --z-${key}: ${value};`);
  }

  root.push("}");

  // Dark overrides — only what changes
  const dark: string[] = ["", "[data-theme=\"dark\"] {"];

  for (const [group, values] of Object.entries(dc)) {
    dark.push(...colorGroupVars(group, values as ColorScale));
  }
  dark.push(...sidebarVars(ds));
  dark.push("}");

  // Base typography (references vars, so always correct in both themes)
  const base = [
    "",
    "/* Base typography */",
    "body {",
    "  font-family: var(--font-family-sans);",
    "  font-size: var(--font-size-base);",
    "  color: var(--color-text-primary);",
    "  background-color: var(--color-surface-gray-50);",
    "}",
  ];

  return [...root, ...dark, ...base].join("\n");
}

// ─── Antd 5 theme config ─────────────────────────────────────────────────────

function buildAntdTheme(t: TokensJson): string {
  const lc = t.themes.light.color;
  const dc = t.themes.dark.color;

  // Convenient accessors
  const p  = lc.primary  as ColorScale;
  const s  = lc.surface  as ColorScale;
  const a  = lc.accent   as ColorScale;
  const su = lc.success  as ColorScale;
  const w  = lc.warning  as ColorScale;
  const d  = lc.danger   as ColorScale;
  const tx = lc.text     as ColorScale;
  const b  = lc.border   as ColorScale;

  const ds = dc.surface  as ColorScale;
  const dt = dc.text     as ColorScale;
  const db = dc.border   as ColorScale;

  const sidebarDark = t.themes.dark.sidebar;

  const lightTheme = {
    token: {
      colorPrimary:              p.DEFAULT ?? p["600"],
      colorInfo:                 a.DEFAULT,
      colorSuccess:              su.DEFAULT,
      colorWarning:              w.DEFAULT,
      colorError:                d.DEFAULT,
      colorTextBase:             tx.primary,
      colorBgBase:               s.white,
      colorBorder:               b.DEFAULT,
      colorBorderSecondary:      b.strong,
      borderRadius:              6,
      borderRadiusSM:            4,
      borderRadiusLG:            8,
      fontSize:                  14,
      fontSizeSM:                12,
      fontSizeLG:                16,
      fontSizeXL:                20,
      fontFamily:                t.fontFamily.sans,
      lineHeight:                1.5,
      controlHeight:             32,
      controlHeightSM:           24,
      controlHeightLG:           40,
      paddingContentVertical:    12,
      paddingContentHorizontal:  16,
      paddingContentVerticalSM:  8,
      paddingContentHorizontalSM: 12,
      motionDurationSlow:        "0.2s",
      motionDurationMid:         "0.15s",
      motionDurationFast:        "0.1s",
      wireframe:                 false,
    },
    components: {
      Table: {
        headerBg:           s["gray-50"],
        headerColor:        tx.secondary,
        headerSortActiveBg: s["gray-100"],
        rowHoverBg:         s["gray-50"],
        borderColor:        b.DEFAULT,
        headerBorderRadius: 0,
        cellPaddingBlock:   8,
        cellPaddingInline:  12,
      },
      Card: {
        paddingLG:  16,
        headerBg:   "transparent",
      },
      Layout: {
        siderBg:  s.white,
        headerBg: s.white,
        bodyBg:   s["gray-50"],
        triggerBg:    p["600"],
        triggerColor: s.white,
      },
      Menu: {
        itemBg:               "transparent",
        itemColor:            tx.secondary,
        itemHoverColor:       p["700"],
        itemHoverBg:          p["50"],
        itemSelectedColor:    p["700"],
        itemSelectedBg:       p["100"],
        groupTitleColor:      tx.tertiary,
        // Dark sidebar tokens — used when Menu is inside a dark Sider
        darkItemBg:           sidebarDark.bg,
        darkItemColor:        sidebarDark["text-secondary"],
        darkItemHoverBg:      "rgba(0, 135, 85, 0.12)",
        darkItemSelectedBg:   "rgba(0, 135, 85, 0.20)",
        darkItemSelectedColor: lc.primary?.["400"] ?? "#6ABB97",
        darkSubMenuItemBg:    "#141D2B",
      },
      Button: { borderRadius: 6 },
      Input:  { borderRadius: 6 },
      Select: { borderRadius: 6 },
      DatePicker: { borderRadius: 6 },
    },
  };

  // Only the deltas needed on top of lightTheme when isDark = true
  const darkOverrides = {
    token: {
      colorBgBase:          ds.white,
      colorTextBase:        dt.primary,
      colorBorder:          db.DEFAULT,
      colorBorderSecondary: db.strong,
    },
    components: {
      Table: {
        headerBg:           ds["gray-100"],
        headerColor:        dt.secondary,
        headerSortActiveBg: ds["gray-200"],
        rowHoverBg:         ds["gray-200"],
        borderColor:        db.DEFAULT,
      },
      Layout: {
        bodyBg:   ds["gray-50"],
        headerBg: ds["gray-100"],
        siderBg:  sidebarDark.bg,
      },
      Menu: {
        darkItemBg:           sidebarDark.bg,
        darkItemHoverBg:      "rgba(0, 135, 85, 0.12)",
        darkItemSelectedBg:   "rgba(0, 135, 85, 0.20)",
        darkItemSelectedColor: lc.primary?.["400"] ?? "#6ABB97",
      },
    },
  };

  return [
    "// AUTO-GENERATED — do not edit. Re-run: npm run build:tokens",
    "// Source: src/tokens/tokens.json",
    "",
    `export const antdTheme = ${JSON.stringify(lightTheme, null, 2)} as const;`,
    "",
    "export type AntdTheme = typeof antdTheme;",
    "",
    `export const antdDarkOverrides = ${JSON.stringify(darkOverrides, null, 2)} as const;`,
    "",
    "export type AntdDarkOverrides = typeof antdDarkOverrides;",
  ].join("\n");
}

// ─── Tailwind tokens ──────────────────────────────────────────────────────────

function buildTailwindTokens(t: TokensJson): string {
  const lc = t.themes.light.color;

  const colors: Record<string, string | Record<string, string>> = {};
  for (const [group, values] of Object.entries(lc)) {
    const entries: Record<string, string> = {};
    for (const [key, value] of Object.entries(values as ColorScale)) {
      if (value !== undefined) {
        entries[key === "DEFAULT" ? "DEFAULT" : key] = value;
      }
    }
    colors[group] = entries;
  }

  const borderRadius: Record<string, string> = {};
  for (const [key, value] of Object.entries(t.radius)) {
    borderRadius[key] = value;
  }

  const fontFamily: Record<string, string[]> = {};
  for (const [key, value] of Object.entries(t.fontFamily)) {
    fontFamily[key] = [value];
  }

  const config = {
    colors,
    spacing:      t.spacing,
    borderRadius,
    fontSize:     t.fontSize,
    fontFamily,
    boxShadow:    t.shadow,
    zIndex:       t.zIndex,
  };

  return [
    "// AUTO-GENERATED — do not edit. Re-run: npm run build:tokens",
    "// Source: src/tokens/tokens.json",
    "",
    `export const tailwindTokens = ${JSON.stringify(config, null, 2)} as const;`,
    "",
    "export type TailwindTokens = typeof tailwindTokens;",
  ].join("\n");
}

// ─── Theme constants (JS color objects for Antd-native components) ────────────

function buildThemeConstants(t: TokensJson): string {
  const ll = t.themes.light;
  const dd = t.themes.dark;
  const lp = ll.color.primary as ColorScale;

  const sideNavPalette = {
    light: {
      bg:          ll.sidebar.bg,
      border:      ll.sidebar.border,
      textPrimary: ll.sidebar["text-primary"],
      textMuted:   ll.sidebar["text-secondary"],
      toggle:      ll.sidebar["toggle-color"],
      toggleHover: ll.sidebar["toggle-hover"],
      avatarBg:    ll.sidebar["avatar-bg"],
    },
    dark: {
      bg:          dd.sidebar.bg,
      border:      dd.sidebar.border,
      textPrimary: dd.sidebar["text-primary"],
      textMuted:   dd.sidebar["text-secondary"],
      toggle:      dd.sidebar["toggle-color"],
      toggleHover: dd.sidebar["toggle-hover"],
      avatarBg:    dd.sidebar["avatar-bg"],
    },
  };

  const menuTokens = {
    light: {
      itemBg:            "transparent",
      itemColor:         (ll.color.text as ColorScale).secondary,
      itemHoverColor:    lp["700"],
      itemHoverBg:       lp["50"],
      itemSelectedColor: lp["700"],
      itemSelectedBg:    lp["100"],
      groupTitleColor:   (ll.color.text as ColorScale).tertiary,
      iconSize:          14,
    },
    dark: {
      itemBg:            "transparent",
      itemColor:         dd.sidebar["text-secondary"],
      itemHoverColor:    lp["400"],
      itemHoverBg:       "rgba(0, 135, 85, 0.12)",
      itemSelectedColor: lp["400"],
      itemSelectedBg:    "rgba(0, 135, 85, 0.20)",
      groupTitleColor:   (dd.color.text as ColorScale).tertiary,
      iconSize:          14,
    },
  };

  return [
    "// AUTO-GENERATED — do not edit. Re-run: npm run build:tokens",
    "// Source: src/tokens/tokens.json",
    "",
    `export const sideNavPalette = ${JSON.stringify(sideNavPalette, null, 2)} as const;`,
    "",
    "export type SideNavPalette = typeof sideNavPalette;",
    "",
    `export const menuTokens = ${JSON.stringify(menuTokens, null, 2)} as const;`,
    "",
    "export type MenuTokens = typeof menuTokens;",
  ].join("\n");
}

// ─── Write files ──────────────────────────────────────────────────────────────

writeFileSync(join(generatedDir, "tokens.css"),          buildCss(tokens),            "utf-8");
console.log("✓ tokens.css");

writeFileSync(join(generatedDir, "antd-theme.ts"),       buildAntdTheme(tokens),      "utf-8");
console.log("✓ antd-theme.ts");

writeFileSync(join(generatedDir, "tailwind-tokens.ts"),  buildTailwindTokens(tokens), "utf-8");
console.log("✓ tailwind-tokens.ts");

writeFileSync(join(generatedDir, "theme-constants.ts"),  buildThemeConstants(tokens), "utf-8");
console.log("✓ theme-constants.ts");

console.log("\n✅ Token build complete → src/tokens/generated/");
