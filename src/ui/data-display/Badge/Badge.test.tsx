import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import { Badge } from "./Badge.js";

describe("Badge", () => {
  it("renders children", () => {
    render(<Badge variant="positive">+2.5%</Badge>);
    expect(screen.getByText("+2.5%")).toBeTruthy();
  });

  it("applies positive styling", () => {
    const { container } = render(<Badge variant="positive">profit</Badge>);
    const el = container.firstChild as HTMLElement;
    expect(el.style.background).toContain("var(--color-success-bg)");
  });

  it("applies negative styling", () => {
    const { container } = render(<Badge variant="negative">loss</Badge>);
    const el = container.firstChild as HTMLElement;
    expect(el.style.background).toContain("var(--color-danger-bg)");
  });
});
