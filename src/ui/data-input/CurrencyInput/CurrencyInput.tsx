import { InputNumber } from "antd";
import type { InputNumberProps } from "antd";

interface CurrencyInputProps
  extends Omit<InputNumberProps<number>, "formatter" | "parser" | "prefix"> {
  currency?: string;
  locale?: string;
}

export function CurrencyInput({
  currency = "USD",
  locale = "en-US",
  precision = 2,
  ...props
}: CurrencyInputProps) {
  const symbol = new Intl.NumberFormat(locale, {
    style: "currency",
    currency,
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  })
    .format(0)
    .replace(/[\d,.\s]/g, "")
    .trim();

  return (
    <InputNumber<number>
      {...props}
      prefix={symbol}
      precision={precision}
      formatter={(value) => {
        if (value === undefined || value === null) return "";
        return new Intl.NumberFormat(locale, {
          minimumFractionDigits: 0,
          maximumFractionDigits: precision as number,
        }).format(value);
      }}
      parser={(value) => {
        if (!value) return 0;
        return parseFloat(value.replace(/[^\d.-]/g, "")) || 0;
      }}
      style={{ width: "100%", ...props.style }}
    />
  );
}
