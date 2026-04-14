# Token Contract

Design tokens for the financial dashboard platform. Other teams embedding components
into the dashboard **must** style their components using these CSS custom properties.
The dashboard host page sets all values in `:root` via `tokens.css`. Components that
use these variables will automatically match the dashboard palette.

## How to consume

Import `tokens.css` from the `@dash/tokens` npm package (or copy it from the build
artifacts). Use the variables below in your component styles.

```css
/* In your component stylesheet */
.my-widget {
  background: var(--color-surface);
  color: var(--color-text-primary);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-md);
  padding: var(--spacing-4) var(--spacing-6);
}
```

## Required variables

These are the variables every embedded component must reference. Do not hardcode
equivalent color values — that is what caused the visual fragmentation we're fixing.

### Colors

| Variable | Value | Usage |
|---|---|---|
| `--color-primary` | `#1a2332` | Primary brand / nav chrome |
| `--color-primary-600` | `#152638` | Hover / active states on primary |
| `--color-accent` | `#3b82f6` | Interactive elements, links, highlights |
| `--color-success` | `#10b981` | Profit, positive values, success states |
| `--color-danger` | `#ef4444` | Loss, negative values, error states |
| `--color-surface` | `#ffffff` | Card / widget backgrounds |
| `--color-surface-secondary` | `#f9fafb` | Subtle inset areas, striped rows |
| `--color-border` | `#e5e7eb` | Borders, dividers |
| `--color-text-primary` | `#111827` | Main body text |
| `--color-text-secondary` | `#6b7280` | Labels, supporting text |
| `--color-text-tertiary` | `#9ca3af` | Placeholders, disabled text |

### Typography

| Variable | Value | Usage |
|---|---|---|
| `--font-size-xs` | `12px` | Badges, footnotes |
| `--font-size-sm` | `13px` | Table cells, dense data |
| `--font-size-base` | `14px` | Default body text |
| `--font-size-lg` | `16px` | Section headings |
| `--font-size-xl` | `20px` | Widget titles |

### Spacing

| Variable | Value |
|---|---|
| `--spacing-1` | `4px` |
| `--spacing-2` | `8px` |
| `--spacing-3` | `12px` |
| `--spacing-4` | `16px` |
| `--spacing-5` | `20px` |
| `--spacing-6` | `24px` |
| `--spacing-8` | `32px` |

### Shape & Elevation

| Variable | Value | Usage |
|---|---|---|
| `--radius-sm` | `4px` | Badges, tags |
| `--radius-md` | `6px` | Cards, widgets, inputs |
| `--radius-lg` | `8px` | Modals, large containers |

## Packaging your component as a Web Component

The dashboard consumes components via Custom Elements. Wrap your component so it
can be used as `<your-tag-name>` in any framework:

```js
// my-widget.js — self-contained bundle (no React/Vue imports from the host)
class MyWidget extends HTMLElement {
  connectedCallback() {
    // render your framework component into this.attachShadow({ mode: "open" })
    // or into this directly (light DOM, recommended for token inheritance)
  }
}
customElements.define("my-widget", MyWidget);
```

**Use light DOM (not shadow DOM)** so CSS custom properties from the host page
cascade into your component automatically. Shadow DOM blocks token inheritance
unless you explicitly forward every variable.

## Delivery

Publish your bundled JS file to the internal CDN or npm registry. The dashboard
team will add it to `apps/dashboard/src/lib/web-component-loader.ts` and declare
the element type in `apps/dashboard/src/types/custom-elements.d.ts`.

Contact the dashboard team (Slack: `#dashboard`) to coordinate the integration.
