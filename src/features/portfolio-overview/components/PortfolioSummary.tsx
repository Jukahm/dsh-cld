import { StatGroup, MetricCard, WidgetCard } from "@/ui";
import { formatCurrency, formatPercentage, formatChange } from "@/shared";
import { usePortfolioSummary } from "../hooks/use-portfolio-data.js";

function trendOf(val: number): "up" | "down" | "flat" {
  return val > 0 ? "up" : val < 0 ? "down" : "flat";
}

export function PortfolioSummary() {
  const { data, isLoading, error, refetch } = usePortfolioSummary();

  return (
    <WidgetCard
      loading={isLoading}
      error={error instanceof Error ? error : null}
      onRetry={() => void refetch()}
      bodyStyle={{ padding: "12px 16px" }}
    >
      <StatGroup cols={4}>
        <MetricCard
          label="Portfolio Value"
          value={data ? formatCurrency(data.totalValue) : "—"}
          size="lg"
          {...(data && {
            trend: trendOf(data.dayPnl),
            trendValue: formatCurrency(data.dayPnl, { compact: true }),
            trendLabel: "today",
          })}
        />

        <MetricCard
          label="Day P&L"
          value={data ? formatChange(data.dayPnl, true) : "—"}
          {...(data && {
            trend: trendOf(data.dayPnl),
            trendValue: formatPercentage(data.dayPnlPct, { showSign: true }),
          })}
        />

        <MetricCard
          label="Total Return"
          value={data ? formatCurrency(data.totalReturn, { compact: true }) : "—"}
          {...(data && {
            trend: trendOf(data.totalReturn),
            trendValue: formatPercentage(data.totalReturnPct, { showSign: true }),
            trendLabel: "all time",
          })}
        />

        <MetricCard
          label="Cash"
          value={data ? formatCurrency(data.cashBalance) : "—"}
          trend="flat"
        />
      </StatGroup>
    </WidgetCard>
  );
}
