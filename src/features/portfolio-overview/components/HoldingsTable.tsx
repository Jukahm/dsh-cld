import { DataTable, WidgetCard, Badge, FilterBar } from "@/ui";
import type { TableColumnsType } from "@/ui";
import { formatCurrency, formatPercentage } from "@/shared";
import { useHoldings } from "../hooks/use-portfolio-data.js";
import { usePortfolioStore } from "../store/portfolio.store.js";
import type { Holding } from "../types/index.js";
import type { FilterConfig } from "@/shared";

const sectorOptions = [
  { label: "Technology", value: "Technology" },
  { label: "Financials", value: "Financials" },
  { label: "Healthcare", value: "Healthcare" },
  { label: "Consumer", value: "Consumer" },
  { label: "Energy", value: "Energy" },
];

const filters: FilterConfig[] = [
  {
    key: "sector",
    label: "Sector",
    options: sectorOptions,
    placeholder: "All sectors",
  },
];

const columns: TableColumnsType<Holding> = [
  {
    title: "Ticker",
    dataIndex: "ticker",
    key: "ticker",
    fixed: "left",
    width: 80,
    render: (ticker: string) => (
      <span style={{ fontWeight: "var(--font-weight-semibold)", fontVariantNumeric: "tabular-nums" }}>
        {ticker}
      </span>
    ),
  },
  {
    title: "Name",
    dataIndex: "name",
    key: "name",
    ellipsis: true,
    width: 160,
  },
  {
    title: "Sector",
    dataIndex: "sector",
    key: "sector",
    width: 110,
    render: (sector: string) => (
      <Badge variant="neutral">{sector}</Badge>
    ),
  },
  {
    title: "Shares",
    dataIndex: "shares",
    key: "shares",
    align: "right",
    width: 80,
    sorter: (a, b) => a.shares - b.shares,
    render: (shares: number) => (
      <span style={{ fontVariantNumeric: "tabular-nums" }}>
        {shares.toLocaleString()}
      </span>
    ),
  },
  {
    title: "Avg Cost",
    dataIndex: "avgCost",
    key: "avgCost",
    align: "right",
    width: 100,
    render: (v: number) => (
      <span style={{ fontVariantNumeric: "tabular-nums" }}>
        {formatCurrency(v)}
      </span>
    ),
  },
  {
    title: "Price",
    dataIndex: "currentPrice",
    key: "currentPrice",
    align: "right",
    width: 100,
    sorter: (a, b) => a.currentPrice - b.currentPrice,
    render: (v: number) => (
      <span style={{ fontVariantNumeric: "tabular-nums" }}>
        {formatCurrency(v)}
      </span>
    ),
  },
  {
    title: "Market Value",
    dataIndex: "marketValue",
    key: "marketValue",
    align: "right",
    width: 120,
    sorter: (a, b) => a.marketValue - b.marketValue,
    defaultSortOrder: "descend",
    render: (v: number) => (
      <span style={{ fontWeight: "var(--font-weight-medium)", fontVariantNumeric: "tabular-nums" }}>
        {formatCurrency(v)}
      </span>
    ),
  },
  {
    title: "Day Chg",
    dataIndex: "dayChangePct",
    key: "dayChangePct",
    align: "right",
    width: 100,
    sorter: (a, b) => a.dayChangePct - b.dayChangePct,
    render: (_: number, record: Holding) => (
      <Badge variant={record.dayChangePct > 0 ? "positive" : record.dayChangePct < 0 ? "negative" : "neutral"}>
        {formatPercentage(record.dayChangePct, { showSign: true })}
      </Badge>
    ),
  },
  {
    title: "Total Return",
    dataIndex: "totalReturnPct",
    key: "totalReturnPct",
    align: "right",
    width: 110,
    sorter: (a, b) => a.totalReturnPct - b.totalReturnPct,
    render: (_: number, record: Holding) => (
      <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-end", gap: 2 }}>
        <Badge
          variant={record.totalReturnPct > 0 ? "positive" : "negative"}
        >
          {formatPercentage(record.totalReturnPct, { showSign: true })}
        </Badge>
        <span style={{ fontSize: "var(--font-size-xs)", color: "var(--color-text-tertiary)", fontVariantNumeric: "tabular-nums" }}>
          {formatCurrency(record.totalReturn, { compact: true })}
        </span>
      </div>
    ),
  },
  {
    title: "Weight",
    dataIndex: "weight",
    key: "weight",
    align: "right",
    width: 80,
    sorter: (a, b) => a.weight - b.weight,
    render: (v: number) => (
      <span style={{ fontVariantNumeric: "tabular-nums", color: "var(--color-text-secondary)" }}>
        {formatPercentage(v)}
      </span>
    ),
  },
];

export function HoldingsTable() {
  const { data = [], isLoading, error, refetch } = useHoldings();
  const filters_vals = usePortfolioStore((s) => s.filters);
  const setFilter = usePortfolioStore((s) => s.setFilter);

  const filtered = data.filter((h) => {
    if (filters_vals.search && !h.ticker.toLowerCase().includes(filters_vals.search.toLowerCase()) &&
        !h.name.toLowerCase().includes(filters_vals.search.toLowerCase())) {
      return false;
    }
    if (filters_vals.sector && h.sector !== filters_vals.sector) {
      return false;
    }
    return true;
  });

  return (
    <WidgetCard
      title="Holdings"
      loading={false}
      error={error instanceof Error ? error : null}
      onRetry={() => void refetch()}
      bodyStyle={{ padding: 0 }}
    >
      <div style={{ padding: "0 16px" }}>
        <FilterBar
          filters={filters}
          filterValues={{ sector: filters_vals.sector }}
          onFilterChange={(key, value) => {
            if (key === "sector") setFilter("sector", value);
          }}
          searchValue={filters_vals.search}
          onSearch={(v) => setFilter("search", v)}
          searchPlaceholder="Search ticker or name…"
        />
      </div>
      <DataTable<Holding>
        columns={columns}
        data={filtered}
        rowKey="id"
        loading={isLoading}
        sticky
        scroll={{ y: 400 }}
        emptyMessage="No holdings match your filters"
        pagination={
          filtered.length > 20
            ? { pageSize: 20, showSizeChanger: false, size: "small" }
            : false
        }
      />
    </WidgetCard>
  );
}
