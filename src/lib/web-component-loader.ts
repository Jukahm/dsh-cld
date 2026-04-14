/**
 * Lazy-loads an external web component script and waits for the custom element
 * to be registered before resolving. Idempotent — safe to call multiple times
 * with the same tagName.
 *
 * Usage:
 *   await loadWebComponent("https://cdn.example.com/chart-widget.js", "chart-widget");
 *   // Now <chart-widget> is usable in JSX
 */
export async function loadWebComponent(src: string, tagName: string): Promise<void> {
  // Already registered — nothing to do
  if (customElements.get(tagName) !== undefined) {
    return;
  }

  await new Promise<void>((resolve, reject) => {
    const script = document.createElement("script");
    script.type = "module";
    script.src = src;
    script.onload = () => {
      // Wait for the element to be defined (the script may define it async)
      customElements
        .whenDefined(tagName)
        .then(() => resolve())
        .catch(reject);
    };
    script.onerror = () => reject(new Error(`Failed to load web component: ${src}`));
    document.head.appendChild(script);
  });
}
