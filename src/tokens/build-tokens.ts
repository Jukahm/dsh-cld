/**
 * Token build script: reads tokens.json → emits CSS custom properties,
 * Antd 5 theme config, and Tailwind theme extension.
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

// Read source tokens
const tokens = JSON.parse(readFileSync(tokensPath, "utf-8")) as TokensJson;

// Ensure output dir exists
mkdirSync(generatedDir, { recursive: true });

// ─── Type definitions ───────────────────────────────────────────────────────

interface ColorScale {
  [key: string]: string;
  DEFAULT?: string;
}

interface TokensJson {
  color: {
    primary: ColorScale;
    surface: ColorScale;
    accent: ColorScale;
    success: ColorScale;
    danger: ColorScale;
    warning: ColorScale;
    text: ColorScale;
    border: ColorScale;
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

// ─── CSS custom properties ──────────────────────────────────────────────────

function buildCss(t: TokensJson): string {
  const lines: string[] = [":root {"];

  // Colors
  for (const [group, values] of Object.entries(t.color)) {
    for (const [key, value] of Object.entries(values)) {
      if (key === "DEFAULT") continue;
      lines.push(`  --color-${group}-${key}: ${value};`);
    }
    if ("DEFAULT" in values && values.DEFAULT) {
      lines.push(`  --color-${group}: ${values.DEFAULT};`);
    }
  }

  // Spacing
  for (const [key, value] of Object.entries(t.spacing)) {
    lines.push(`  --spacing-${key}: ${value};`);
  }

  // Radius
  for (const [key, value] of Object.entries(t.radius)) {
    if (key === "DEFAULT") continue;
    lines.push(`  --radius-${key}: ${value};`);
  }
  if (t.radius.DEFAULT) {
    lines.push(`  --radius: ${t.radius.DEFAULT};`);
  }

  // Font size
  for (const [key, value] of Object.entries(t.fontSize)) {
    lines.push(`  --font-size-${key}: ${value};`);
  }

  // Font family
  for (const [key, value] of Object.entries(t.fontFamily)) {
    lines.push(`  --font-family-${key}: ${value};`);
  }

  // Font weight
  for (const [key, value] of Object.entries(t.fontWeight)) {
    lines.push(`  --font-weight-${key}: ${value};`);
  }

  // Line height
  for (const [key, value] of Object.entries(t.lineHeight)) {
    lines.push(`  --line-height-${key}: ${value};`);
  }

  // Shadows
  for (const [key, value] of Object.entries(t.shadow)) {
    if (key === "DEFAULT") continue;
    lines.push(`  --shadow-${key}: ${value};`);
  }
  if (t.shadow.DEFAULT) {
    lines.push(`  --shadow: ${t.shadow.DEFAULT};`);
  }

  // Z-index
  for (const [key, value] of Object.entries(t.zIndex)) {
    lines.push(`  --z-${key}: ${value};`);
  }

  lines.push("}");
  lines.push("");
  lines.push("/* Base typography */");
  lines.push("body {");
  lines.push(`  font-family: var(--font-family-sans);`);
  lines.push(`  font-size: var(--font-size-base);`);
  lines.push(`  color: var(--color-text-primary);`);
  lines.push(`  background-color: var(--color-surface-gray-50);`);
  lines.push("}");

  return lines.join("\n");
}

// ─── Antd 5 theme config ────────────────────────────────────────────────────

function buildAntdTheme(t: TokensJson): string {
  const c = t.color;
  const theme = {
    token: {
      colorPrimary: c.primary.DEFAULT ?? c.primary["800"],
      colorInfo: c.accent.DEFAULT,
      colorSuccess: c.success.DEFAULT,
      colorWarning: c.warning.DEFAULT,
      colorError: c.danger.DEFAULT,
      colorTextBase: c.text.primary,
      colorBgBase: c.surface.white,
      colorBorder: c.border.DEFAULT,
      colorBorderSecondary: c.border.strong,
      borderRadius: 6,
      borderRadiusSM: 4,
      borderRadiusLG: 8,
      fontSize: 14,
      fontSizeSM: 12,
      fontSizeLG: 16,
      fontSizeXL: 20,
      fontFamily: t.fontFamily.sans,
      lineHeight: 1.5,
      controlHeight: 32,
      controlHeightSM: 24,
      controlHeightLG: 40,
      paddingContentVertical: 12,
      paddingContentHorizontal: 16,
      paddingContentVerticalSM: 8,
      paddingContentHorizontalSM: 12,
      motionDurationSlow: "0.2s",
      motionDurationMid: "0.15s",
      motionDurationFast: "0.1s",
      wireframe: false,
    },
    components: {
      Table: {
        headerBg: c.surface["gray-50"],
        headerColor: c.text.secondary,
        headerSortActiveBg: c.surface["gray-100"],
        rowHoverBg: c.surface["gray-50"],
        borderColor: c.border.DEFAULT,
        headerBorderRadius: 0,
        cellPaddingBlock: 8,
        cellPaddingInline: 12,
      },
      Card: {
        paddingLG: 16,
        headerBg: "transparent",
      },
      Layout: {
        siderBg: c.surface.white,
        headerBg: c.surface.white,
        bodyBg: c.surface["gray-50"],
        triggerBg: c.primary["600"],
        triggerColor: c.surface.white,
      },
      Menu: {
        // Light sidebar — white bg, green active states
        itemBg: "transparent",
        itemColor: c.text.secondary,
        itemHoverColor: c.primary["700"],
        itemHoverBg: c.primary["50"],
        itemSelectedColor: c.primary["700"],
        itemSelectedBg: c.primary["100"],
        groupTitleColor: c.text.tertiary,
        // Dark sidebar — charcoal bg, bright green active states
        darkItemBg: "#1A2333",
        darkItemColor: "#CBD5E1",
        darkItemHoverBg: "rgba(34, 197, 94, 0.12)",
        darkItemSelectedBg: "rgba(22, 163, 74, 0.22)",
        darkItemSelectedColor: "#4ADE80",
        darkSubMenuItemBg: "#141D2B",
      },
      Button: {
        borderRadius: 6,
      },
      Input: {
        borderRadius: 6,
      },
      Select: {
        borderRadius: 6,
      },
      DatePicker: {
        borderRadius: 6,
      },
    },
  };

  return [
    "// AUTO-GENERATED — do not edit. Re-run: npm run build:tokens",
    "// Source: src/tokens/tokens.json",
    "",
    `export const antdTheme = ${JSON.stringify(theme, null, 2)} as const;`,
    "",
    "export type AntdTheme = typeof antdTheme;",
  ].join("\n");
}

// ─── Tailwind tokens ─────────────────────────────────────────────────────────

function buildTailwindTokens(t: TokensJson): string {
  const colors: Record<string, string | Record<string, string>> = {};

  for (const [group, values] of Object.entries(t.color)) {
    const entries: Record<string, string> = {};
    for (const [key, value] of Object.entries(values)) {
      if (key === "DEFAULT") {
        entries["DEFAULT"] = value;
      } else {
        entries[key] = value;
      }
    }
    colors[group] = entries;
  }

  // Flatten spacing to unitless numbers for Tailwind (it handles px internally)
  const spacing: Record<string, string> = {};
  for (const [key, value] of Object.entries(t.spacing)) {
    spacing[key] = value;
  }

  const borderRadius: Record<string, string> = {};
  for (const [key, value] of Object.entries(t.radius)) {
    borderRadius[key === "DEFAULT" ? "DEFAULT" : key] = value;
  }

  const fontSize: Record<string, string> = {};
  for (const [key, value] of Object.entries(t.fontSize)) {
    fontSize[key] = value;
  }

  const fontFamily: Record<string, string[]> = {};
  for (const [key, value] of Object.entries(t.fontFamily)) {
    fontFamily[key] = [value];
  }

  const boxShadow: Record<string, string> = {};
  for (const [key, value] of Object.entries(t.shadow)) {
    boxShadow[key] = value;
  }

  const zIndex: Record<string, string> = {};
  for (const [key, value] of Object.entries(t.zIndex)) {
    zIndex[key] = value;
  }

  const config = {
    colors,
    spacing,
    borderRadius,
    fontSize,
    fontFamily,
    boxShadow,
    zIndex,
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

// ─── Write files ─────────────────────────────────────────────────────────────

writeFileSync(join(generatedDir, "tokens.css"), buildCss(tokens), "utf-8");
console.log("✓ tokens.css");

writeFileSync(join(generatedDir, "antd-theme.ts"), buildAntdTheme(tokens), "utf-8");
console.log("✓ antd-theme.ts");

writeFileSync(
  join(generatedDir, "tailwind-tokens.ts"),
  buildTailwindTokens(tokens),
  "utf-8",
);
console.log("✓ tailwind-tokens.ts");

console.log("\n✅ Token build complete → src/tokens/generated/");
