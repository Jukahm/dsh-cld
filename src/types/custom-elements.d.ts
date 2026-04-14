/**
 * TypeScript declarations for external Custom Elements consumed by the dashboard.
 *
 * Add an entry here for each web component registered by another team.
 * The element attributes are typed as standard HTML attributes — extend as needed
 * once the element's public API is defined.
 *
 * Example when a team delivers a new element:
 *
 *   "team-chart-widget": React.DetailedHTMLProps<
 *     React.HTMLAttributes<HTMLElement> & {
 *       "data-symbol"?: string;
 *       "data-period"?: string;
 *     },
 *     HTMLElement
 *   >;
 */
declare namespace JSX {
  interface IntrinsicElements {
    // Placeholder — replace with real elements as other teams deliver them.
    // "team-element-name": React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement>;
  }
}
