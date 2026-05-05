import { PageHeader } from "@/ui";
import { InstrumentMatrix } from "./components/InstrumentMatrix.js";

export function InstrumentMatrixPage() {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        height: "calc(100vh - 56px)",
        padding: "0 24px",
      }}
    >
      <PageHeader
        title="Instrument Matrix"
        subtitle="All instruments across comp sets with fair value"
        breadcrumbs={[{ label: "Dashboard" }, { label: "Comparables" }, { label: "Matrix" }]}
      />
      <div style={{ flex: 1, minHeight: 0, paddingBottom: 20 }}>
        <InstrumentMatrix />
      </div>
    </div>
  );
}
