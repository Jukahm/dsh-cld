import { Table, Tag } from "antd";
import type { TableColumnsType } from "antd";
import { SearchOutlined } from "@ant-design/icons";
import { SkeletonWidget } from "@/ui";
import type { Instrument } from "../types/index.js";

type Props = {
  rows: Instrument[];
  isLoading: boolean;
  searchQuery: string;
  onSelectionChange: (rows: Instrument[]) => void;
  selectedIsins: string[];
};

const CURRENCY_COLORS: Record<string, string> = {
  CHF: "#dc2626",
  EUR: "#2563eb",
  USD: "#059669",
  GBP: "#7c3aed",
};

const columns: TableColumnsType<Instrument> = [
  {
    title: "Currency",
    dataIndex: "currency",
    key: "currency",
    width: 80,
    filters: [
      { text: "CHF", value: "CHF" },
      { text: "EUR", value: "EUR" },
      { text: "USD", value: "USD" },
      { text: "GBP", value: "GBP" },
    ],
    onFilter: (value, record) => record.currency === value,
    render: (cur: string) => (
      <span style={{ color: CURRENCY_COLORS[cur] ?? "var(--color-text-secondary)", fontWeight: 600, fontSize: "var(--font-size-xs)" }}>
        {cur}
      </span>
    ),
  },
  {
    title: "ISIN",
    dataIndex: "isin",
    key: "isin",
    width: 140,
    render: (v: string) => (
      <span style={{ fontFamily: "monospace", fontSize: "var(--font-size-xs)", color: "var(--color-text-secondary)" }}>{v}</span>
    ),
  },
  {
    title: "Security Name",
    dataIndex: "securityName",
    key: "securityName",
    ellipsis: true,
    render: (v: string) => (
      <span style={{ fontSize: "var(--font-size-sm)" }}>{v}</span>
    ),
  },
  {
    title: "Bond Type",
    dataIndex: "bondType",
    key: "bondType",
    width: 90,
    filters: [
      { text: "Global", value: "Global" },
      { text: "Reg S", value: "Reg S" },
    ],
    onFilter: (value, record) => record.bondType === value,
    render: (v: string) => (
      <Tag color={v === "Global" ? "blue" : "default"} style={{ fontSize: 10, padding: "0 5px", lineHeight: "18px" }}>{v}</Tag>
    ),
  },
  {
    title: "Issuer",
    dataIndex: "issuer",
    key: "issuer",
    width: 70,
    render: (v: string) => (
      <span style={{ fontSize: "var(--font-size-xs)", color: "var(--color-text-tertiary)" }}>{v}</span>
    ),
  },
];

export function InstrumentSearchGrid({ rows, isLoading, searchQuery, onSelectionChange, selectedIsins }: Props) {
  if (isLoading) return <div style={{ padding: 16 }}><SkeletonWidget rows={8} /></div>;

  if (!searchQuery.trim()) {
    return (
      <div
        style={{
          flex: 1,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          color: "var(--color-text-tertiary)",
          gap: 8,
          padding: 32,
        }}
      >
        <SearchOutlined style={{ fontSize: 32, opacity: 0.3 }} />
        <span style={{ fontSize: "var(--font-size-sm)" }}>Search for instruments to display data</span>
        <span style={{ fontSize: "var(--font-size-xs)" }}>Try searching for EIB, KFW, or IBRD</span>
      </div>
    );
  }

  return (
    <div style={{ flex: 1, overflow: "auto" }}>
      <Table<Instrument>
        size="small"
        columns={columns}
        dataSource={rows}
        rowKey="isin"
        pagination={false}
        sticky
        scroll={{ x: "max-content" }}
        rowSelection={{
          selectedRowKeys: selectedIsins,
          onChange: (_, selectedRows) => onSelectionChange(selectedRows),
        }}
        locale={{ emptyText: "No instruments found for this criteria" }}
        style={{ "--ant-table-header-bg": "var(--color-surface-gray-50)" } as React.CSSProperties}
      />
    </div>
  );
}

