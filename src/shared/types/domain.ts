export interface BaseEntity {
  id: string;
  createdAt: string;
  updatedAt: string;
}

export interface Money {
  amount: string; // string to avoid floating point — use with Decimal.js
  currency: string; // ISO 4217 e.g. "USD"
}

export interface DateRange {
  from: string; // ISO date string
  to: string;
}

export type TimeframeOption = "1D" | "1W" | "1M" | "3M" | "6M" | "YTD" | "1Y" | "ALL";

export interface SelectOption<T = string> {
  label: string;
  value: T;
  disabled?: boolean;
}

export interface FilterConfig {
  key: string;
  label: string;
  options: SelectOption[];
  placeholder?: string;
}
