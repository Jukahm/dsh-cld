import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import type { TooltipProps } from "recharts";
import { WidgetCard, TimeframeSelector } from "@/ui";
import { usePortfolioHistory } from "../hooks/use-portfolio-data.js";
import { usePortfolioStore } from "../store/portfolio.store.js";
import { formatCurrency, formatDate } from "@/shared";
import type { Timeframe } from "../types/index.js";

const TIMEFRAMES: Timeframe[] = ["1W", "1M", "3M", "6M", "YTD", "1Y"];

function CustomTooltip({ active, payload, label }: TooltipProps<number, string>) {
  if (!active || !payload || payload.length === 0) return null;
  const value = payload[0]?.value;

  return (
    <div
      style={{
        background: "var(--color-surface-white)",
        border: "1px solid var(--color-border)",
        borderRadius: "var(--radius-md)",
        padding: "8px 12px",
        fontSize: "var(--font-size-sm)",
        boxShadow: "var(--shadow-md)",
      }}
    >
      <p style={{ margin: 0, color: "var(--color-text-secondary)", marginBottom: 2 }}>
        {formatDate(label as string, { format: "MMM D, YYYY" })}
      </p>
      <p
        style={{
          margin: 0,
          fontWeight: "var(--font-weight-semibold)",
          fontVariantNumeric: "tabular-nums",
        }}
      >
        {value !== undefined ? formatCurrency(value) : "—"}
      </p>
    </div>
  );
}

export function AllocationChart() {
  const { data = [], isLoading, error, refetch } = usePortfolioHistory();
  const timeframe = usePortfolioStore((s) => s.timeframe);
  const setTimeframe = usePortfolioStore((s) => s.setTimeframe);

  const actions = (
    <TimeframeSelector
      value={timeframe}
      onChange={(v) => setTimeframe(v as Timeframe)}
      options={TIMEFRAMES}
    />
  );

  return (
    <WidgetCard
      title="Portfolio Value"
      actions={actions}
      loading={isLoading}
      error={error instanceof Error ? error : null}
      onRetry={() => void refetch()}
    >
      <ResponsiveContainer width="100%" height={220}>
        <AreaChart data={data} margin={{ top: 4, right: 4, left: 0, bottom: 0 }}>
          <defs>
            <linearGradient id="portfolioGradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.15} />
              <stop offset="95%" stopColor="#3b82f6" stopOpacity={0.02} />
            </linearGradient>
          </defs>

          <CartesianGrid
            strokeDasharray="3 3"
            stroke="var(--color-border)"
            vertical={false}
          />

          <XAxis
            dataKey="date"
            tick={{ fontSize: 11, fill: "var(--color-text-tertiary)" }}
            tickLine={false}
            axisLine={false}
            tickFormatter={(v: string) => formatDate(v, { format: "MMM D" })}
            interval="preserveStartEnd"
          />

          <YAxis
            tick={{ fontSize: 11, fill: "var(--color-text-tertiary)" }}
            tickLine={false}
            axisLine={false}
            tickFormatter={(v: number) => formatCurrency(v, { compact: true })}
            width={70}
          />

          <Tooltip content={<CustomTooltip />} />

          <Area
            type="monotone"
            dataKey="value"
            stroke="#3b82f6"
            strokeWidth={2}
            fill="url(#portfolioGradient)"
            dot={false}
            activeDot={{ r: 4, strokeWidth: 0, fill: "#3b82f6" }}
          />
        </AreaChart>
      </ResponsiveContainer>
    </WidgetCard>
  );
}
