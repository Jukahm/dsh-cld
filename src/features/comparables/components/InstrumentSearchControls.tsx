import { useState, useRef } from "react";
import { Button, Input, Modal, Tag } from "antd";
import { SearchOutlined } from "@ant-design/icons";

type Props = {
  searchQuery: string;
  onSearch: (value: string) => void;
  activeSetName: string | null;
  onOpenDrawer: () => void;
};

export function InstrumentSearchControls({ searchQuery, onSearch, activeSetName, onOpenDrawer }: Props) {
  const [isinModalOpen, setIsinModalOpen] = useState(false);
  const [isinText, setIsinText] = useState("");
  const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  function handleIssuerChange(value: string) {
    if (debounceRef.current) clearTimeout(debounceRef.current);
    debounceRef.current = setTimeout(() => onSearch(value), 300);
  }

  function handleIsinSearch() {
    const isins = isinText
      .split(/[\n,\s]+/)
      .map((s) => s.trim())
      .filter(Boolean);
    if (isins.length > 0) onSearch(isins[0] ?? "");
    setIsinModalOpen(false);
    setIsinText("");
  }

  return (
    <div
      style={{
        padding: "12px 16px",
        background: "var(--color-surface-white)",
        borderBottom: "1px solid var(--color-border)",
        flexShrink: 0,
        position: "sticky",
        top: 0,
        zIndex: 10,
      }}
    >
      {/* Search row */}
      <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
        <span style={{ fontSize: "var(--font-size-xs)", color: "var(--color-text-secondary)", whiteSpace: "nowrap" }}>
          Search by:
        </span>
        <Input
          placeholder="Issuer (e.g. EIB, KFW, IBRD)"
          prefix={<SearchOutlined style={{ color: "var(--color-text-tertiary)" }} />}
          defaultValue={searchQuery}
          onChange={(e) => handleIssuerChange(e.target.value)}
          allowClear
          onClear={() => onSearch("")}
          size="small"
          style={{ flex: 1 }}
        />
        <Button size="small" onClick={() => setIsinModalOpen(true)}>
          Paste ISINs
        </Button>
      </div>

      {/* Context indicator */}
      {activeSetName && (
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 6,
            marginTop: 8,
          }}
        >
          <span style={{ fontSize: "var(--font-size-xs)", color: "var(--color-text-tertiary)" }}>
            Active set:
          </span>
          <Tag
            color="blue"
            onClick={onOpenDrawer}
            style={{ cursor: "pointer", fontSize: 11, lineHeight: "18px", margin: 0 }}
          >
            {activeSetName} ↗
          </Tag>
        </div>
      )}

      {/* Paste ISINs modal */}
      <Modal
        title="Search by ISINs"
        open={isinModalOpen}
        onOk={handleIsinSearch}
        onCancel={() => { setIsinModalOpen(false); setIsinText(""); }}
        okText="Search"
        okButtonProps={{ disabled: !isinText.trim() }}
        width={440}
      >
        <p style={{ fontSize: "var(--font-size-xs)", color: "var(--color-text-secondary)", marginBottom: 8 }}>
          Paste ISINs separated by newlines, commas, or spaces.
        </p>
        <Input.TextArea
          rows={6}
          placeholder={"CH0025896942\nDE000A0E83A8\nXS0107247725"}
          value={isinText}
          onChange={(e) => setIsinText(e.target.value)}
          autoFocus
          style={{ fontFamily: "monospace", fontSize: "var(--font-size-xs)" }}
        />
        {isinText.trim() && (
          <p style={{ fontSize: "var(--font-size-xs)", color: "var(--color-text-tertiary)", marginTop: 6 }}>
            {isinText.split(/[\n,\s]+/).filter(Boolean).length} ISINs detected
          </p>
        )}
      </Modal>
    </div>
  );
}
