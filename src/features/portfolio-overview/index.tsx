import { PortfolioSummary } from "./components/PortfolioSummary.js";
import { HoldingsTable } from "./components/HoldingsTable.js";
import { AllocationChart } from "./components/AllocationChart.js";
import { WidgetGrid, WidgetGridItem, PageHeader, HeaderActions } from "@/ui";

export function PortfolioOverview() {
  return (
    <div>
      <PageHeader
        title="Portfolio Overview"
        subtitle="As of today"
        breadcrumbs={[{ label: "Dashboard" }, { label: "Portfolio" }]}
        actions={<HeaderActions />}
      />

      <WidgetGrid cols={1}>
        <PortfolioSummary />
      </WidgetGrid>

      <div style={{ marginTop: 16 }}>
        <WidgetGrid cols={3}>
          <WidgetGridItem span={2}>
            <AllocationChart />
          </WidgetGridItem>
          <WidgetGridItem span={1}>
            <SectorBreakdown />
          </WidgetGridItem>
        </WidgetGrid>
      </div>

      <div style={{ marginTop: 16 }}>
        <HoldingsTable />
      </div>
    </div>
  );
}

// Inline mini component — sector allocation donut placeholder
function SectorBreakdown() {
  const sectors: Array<{ sector: string; pct: number }> = [
    { sector: "Technology", pct: 45.8 },
    { sector: "Financials", pct: 27.2 },
    { sector: "Healthcare", pct: 16.8 },
    { sector: "Other", pct: 10.2 },
  ];

  return (
    <div
      style={{
        background: "var(--color-surface-white)",
        border: "1px solid var(--color-border)",
        borderRadius: "var(--radius-md)",
        padding: 16,
        height: "100%",
        minHeight: 268,
      }}
    >
      <p
        style={{
          margin: "0 0 12px",
          fontSize: "var(--font-size-sm)",
          fontWeight: "var(--font-weight-semibold)",
          color: "var(--color-text-primary)",
        }}
      >
        Sector Allocation
      </p>
      <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
        {sectors.map(({ sector, pct }) => (
          <div key={sector}>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                marginBottom: 3,
                fontSize: "var(--font-size-xs)",
              }}
            >
              <span style={{ color: "var(--color-text-secondary)" }}>{sector}</span>
              <span
                style={{
                  fontVariantNumeric: "tabular-nums",
                  fontWeight: "var(--font-weight-medium)",
                }}
              >
                {pct.toFixed(1)}%
              </span>
            </div>
            <div
              style={{
                height: 6,
                background: "var(--color-surface-gray-100)",
                borderRadius: "var(--radius-full)",
                overflow: "hidden",
              }}
            >
              <div
                style={{
                  height: "100%",
                  width: `${pct}%`,
                  background: "var(--color-accent)",
                  borderRadius: "var(--radius-full)",
                }}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
