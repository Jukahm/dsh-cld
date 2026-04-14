import { describe, it, expect } from "vitest";
import { formatCurrency, formatPercentage, formatDate, formatChange } from "./format.js";

describe("formatCurrency", () => {
  it("formats USD by default", () => {
    expect(formatCurrency(1234.56)).toBe("$1,234.56");
  });

  it("handles string input", () => {
    expect(formatCurrency("9999.99")).toBe("$9,999.99");
  });

  it("formats large numbers compactly", () => {
    const result = formatCurrency(750000, { compact: true });
    expect(result).toMatch(/\$750K|\$750k/);
  });

  it("formats EUR", () => {
    const result = formatCurrency(100, { currency: "EUR", locale: "de-DE" });
    expect(result).toContain("€");
  });
});

describe("formatPercentage", () => {
  it("formats 18 as 18.00%", () => {
    expect(formatPercentage(18)).toBe("18.00%");
  });

  it("formats 0.18 as 18.00% with isDecimal", () => {
    expect(formatPercentage(0.18, { isDecimal: true })).toBe("18.00%");
  });

  it("adds sign when showSign is true", () => {
    expect(formatPercentage(5.5, { showSign: true })).toBe("+5.50%");
    expect(formatPercentage(-3.2, { showSign: true })).toBe("-3.20%");
  });
});

describe("formatDate", () => {
  it("formats a date string", () => {
    const result = formatDate("2024-01-15");
    expect(result).toBe("Jan 15, 2024");
  });

  it("accepts custom format", () => {
    const result = formatDate("2024-01-15", { format: "YYYY-MM-DD" });
    expect(result).toBe("2024-01-15");
  });
});

describe("formatChange", () => {
  it("adds + prefix for positive", () => {
    expect(formatChange(2.5)).toBe("+2.50%");
  });

  it("keeps - prefix for negative", () => {
    expect(formatChange(-1.3)).toBe("-1.30%");
  });
});
