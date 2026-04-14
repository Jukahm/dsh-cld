import Decimal from "decimal.js";
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc.js";
import timezone from "dayjs/plugin/timezone.js";
import relativeTime from "dayjs/plugin/relativeTime.js";

dayjs.extend(utc);
dayjs.extend(timezone);
dayjs.extend(relativeTime);

export type CurrencyInput = Decimal | number | string;

export interface FormatCurrencyOptions {
  currency?: string;
  locale?: string;
  minimumFractionDigits?: number;
  maximumFractionDigits?: number;
  compact?: boolean;
}

/**
 * Format a monetary value with locale-aware currency symbols.
 * Always uses Decimal internally to avoid floating-point errors.
 */
export function formatCurrency(
  value: CurrencyInput,
  options: FormatCurrencyOptions = {},
): string {
  const {
    currency = "USD",
    locale = "en-US",
    minimumFractionDigits = 2,
    maximumFractionDigits = 2,
    compact = false,
  } = options;

  const num = new Decimal(value).toNumber();

  return new Intl.NumberFormat(locale, {
    style: "currency",
    currency,
    minimumFractionDigits,
    maximumFractionDigits,
    notation: compact ? "compact" : "standard",
  }).format(num);
}

export interface FormatDateOptions {
  format?: string;
  tz?: string;
  relative?: boolean;
}

/**
 * Format a date value with dayjs. Timezone-aware.
 */
export function formatDate(
  value: string | number | Date | dayjs.Dayjs,
  options: FormatDateOptions = {},
): string {
  const { format = "MMM D, YYYY", tz, relative = false } = options;

  let d = dayjs(value);
  if (tz) d = d.tz(tz);

  if (relative) return d.fromNow();
  return d.format(format);
}

export interface FormatPercentageOptions {
  locale?: string;
  minimumFractionDigits?: number;
  maximumFractionDigits?: number;
  showSign?: boolean;
}

/**
 * Format a decimal (0.18 → "18.00%") or percentage value (18 → "18.00%").
 * Pass `isDecimal: true` if value is already 0–1 range.
 */
export function formatPercentage(
  value: CurrencyInput,
  options: FormatPercentageOptions & { isDecimal?: boolean } = {},
): string {
  const {
    locale = "en-US",
    minimumFractionDigits = 2,
    maximumFractionDigits = 2,
    showSign = false,
    isDecimal = false,
  } = options;

  const num = new Decimal(value).toNumber();
  const pct = isDecimal ? num : num / 100;

  const formatted = new Intl.NumberFormat(locale, {
    style: "percent",
    minimumFractionDigits,
    maximumFractionDigits,
  }).format(Math.abs(pct));

  if (!showSign) return formatted;
  const sign = num > 0 ? "+" : num < 0 ? "-" : "";
  return `${sign}${formatted}`;
}

export interface FormatNumberOptions {
  locale?: string;
  minimumFractionDigits?: number;
  maximumFractionDigits?: number;
  compact?: boolean;
}

export function formatNumber(value: CurrencyInput, options: FormatNumberOptions = {}): string {
  const {
    locale = "en-US",
    minimumFractionDigits = 0,
    maximumFractionDigits = 2,
    compact = false,
  } = options;

  const num = new Decimal(value).toNumber();
  return new Intl.NumberFormat(locale, {
    minimumFractionDigits,
    maximumFractionDigits,
    notation: compact ? "compact" : "standard",
  }).format(num);
}

/** Return "+1.23%" or "-1.23%" style change strings */
export function formatChange(value: CurrencyInput, asCurrency = false): string {
  const num = new Decimal(value).toNumber();
  const sign = num >= 0 ? "+" : "";
  if (asCurrency) {
    return `${sign}${formatCurrency(value)}`;
  }
  return `${sign}${formatPercentage(value)}`;
}
