import { useState } from "react";
import { Button, Input, Table, Tag, Popconfirm } from "antd";
import { CloseOutlined, EditOutlined, DeleteOutlined } from "@ant-design/icons";
import type { CompSet, Instrument } from "../types/index.js";

type Props = {
  detail: CompSet;
  onClose: () => void;
  onRename: (id: string, name: string) => void;
  onDelete: (id: string) => void;
  onRemoveInstruments: (setId: string, isins: string[]) => void;
};

const CURRENCY_COLORS: Record<string, string> = {
  CHF: "#dc2626",
  EUR: "#2563eb",
  USD: "#059669",
  GBP: "#7c3aed",
};

export function CompSetDetailDrawer({ detail, onClose, onRename, onDelete, onRemoveInstruments }: Props) {
  const [editingName, setEditingName] = useState(false);
  const [nameValue, setNameValue] = useState(detail.name);
  const [selectedIsins, setSelectedIsins] = useState<string[]>([]);

  function saveRename() {
    if (nameValue.trim() && nameValue.trim() !== detail.name) {
      onRename(detail.id, nameValue.trim());
    }
    setEditingName(false);
  }

  function cancelRename() {
    setNameValue(detail.name);
    setEditingName(false);
  }

  const columns = [
    {
      title: "Currency",
      dataIndex: "currency",
      key: "currency",
      width: 72,
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
      width: 130,
      render: (v: string) => (
        <span style={{ fontFamily: "monospace", fontSize: "var(--font-size-xs)" }}>{v}</span>
      ),
    },
    {
      title: "Security",
      dataIndex: "securityName",
      key: "securityName",
      ellipsis: true,
      render: (v: string) => (
        <span style={{ fontSize: "var(--font-size-xs)" }}>{v}</span>
      ),
    },
    {
      title: "Type",
      dataIndex: "bondType",
      key: "bondType",
      width: 60,
      render: (v: string) => (
        <Tag color={v === "Global" ? "blue" : "default"} style={{ fontSize: 10, padding: "0 4px", lineHeight: "16px" }}>{v}</Tag>
      ),
    },
  ];

  return (
    <div style={{ display: "flex", flexDirection: "column", height: "100%" }}>
      {/* Header */}
      <div style={{ padding: "12px 14px 10px", borderBottom: "1px solid var(--color-border)", flexShrink: 0 }}>
        <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", gap: 8 }}>
          {editingName ? (
            <Input
              value={nameValue}
              onChange={(e) => setNameValue(e.target.value)}
              onPressEnter={saveRename}
              onBlur={saveRename}
              onKeyDown={(e) => e.key === "Escape" && cancelRename()}
              autoFocus
              size="small"
              style={{ flex: 1 }}
            />
          ) : (
            <span
              onClick={() => setEditingName(true)}
              title="Click to rename"
              style={{ fontWeight: 600, fontSize: "var(--font-size-base)", color: "var(--color-text-primary)", cursor: "text", flex: 1, display: "flex", alignItems: "center", gap: 6 }}
            >
              {detail.name}
              <EditOutlined style={{ fontSize: 11, color: "var(--color-text-tertiary)", opacity: 0.6 }} />
            </span>
          )}
          <Button
            type="text"
            size="small"
            icon={<CloseOutlined />}
            onClick={onClose}
            aria-label="Close detail panel"
            style={{ flexShrink: 0, color: "var(--color-text-tertiary)" }}
          />
        </div>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginTop: 6 }}>
          <span style={{ fontSize: "var(--font-size-xs)", color: "var(--color-text-secondary)" }}>
            {detail.instruments.length} instrument{detail.instruments.length !== 1 ? "s" : ""}
          </span>
          <Popconfirm
            title="Delete this comp set?"
            description="This action cannot be undone."
            onConfirm={() => onDelete(detail.id)}
            okText="Delete"
            okButtonProps={{ danger: true }}
            placement="bottomRight"
          >
            <Button type="text" size="small" danger icon={<DeleteOutlined />} aria-label="Delete comp set">
              Delete
            </Button>
          </Popconfirm>
        </div>
      </div>

      {/* Table */}
      <div style={{ flex: 1, overflow: "auto" }}>
        <Table<Instrument>
          size="small"
          columns={columns}
          dataSource={detail.instruments}
          rowKey="isin"
          pagination={false}
          sticky
          rowSelection={{
            selectedRowKeys: selectedIsins,
            onChange: (keys) => setSelectedIsins(keys as string[]),
          }}
          locale={{ emptyText: "No instruments in this set yet." }}
          style={{ "--ant-table-header-bg": "var(--color-surface-gray-50)" } as React.CSSProperties}
        />
      </div>

      {/* Remove action bar */}
      {selectedIsins.length > 0 && (
        <div
          style={{
            padding: "10px 14px",
            borderTop: "1px solid var(--color-border)",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            flexShrink: 0,
            background: "var(--color-surface-white)",
          }}
        >
          <span style={{ fontSize: "var(--font-size-xs)", color: "var(--color-text-secondary)" }}>
            {selectedIsins.length} selected
          </span>
          <Button
            size="small"
            danger
            onClick={() => { onRemoveInstruments(detail.id, selectedIsins); setSelectedIsins([]); }}
          >
            Remove from set
          </Button>
        </div>
      )}
    </div>
  );
}
