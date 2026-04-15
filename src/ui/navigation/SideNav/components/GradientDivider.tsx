/** Horizontal rule that fades to transparent at both edges. */
export function GradientDivider({ color }: { color: string }) {
  return (
    <div
      style={{
        height:     1,
        flexShrink: 0,
        background: `linear-gradient(to right, transparent, ${color} 20%, ${color} 80%, transparent)`,
      }}
    />
  );
}
