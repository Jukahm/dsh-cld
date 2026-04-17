import { useState, useEffect } from "react";
import { Button, Tag, Popover, Checkbox } from "antd";
import { CloseOutlined, CheckOutlined } from "@ant-design/icons";
import type { Instrument, CompSetSummary } from "../types/index.js";

type Props = {
  selectedInstruments: Instrument[];
  availableCompSets: CompSetSummary[];
  activeSetId: string | null;
  onAdd: (isins: string[], setIds: string[]) => void;
  onClearSelection: () => void;
};

export function InstrumentSelectionTray({
  selectedInstruments,
  availableCompSets,
  activeSetId,
  onAdd,
  onClearSelection,
}: Props) {
  const [targetSetIds, setTargetSetIds] = useState<string[]>([]);
  const [popoverOpen, setPopoverOpen] = useState(false);
  const [justAdded, setJustAdded] = useState(false);

  // Pre-fill active set when selection changes
  useEffect(() => {
    setTargetSetIds(activeSetId ? [activeSetId] : []);
  }, [activeSetId, selectedInstruments.length]);

  const isVisible = selectedInstruments.length > 0;

  function handleAdd() {
    onAdd(selectedInstruments.map((i) => i.isin), targetSetIds);
    setJustAdded(true);
    setTimeout(() => {
      setJustAdded(false);
      onClearSelection();
    }, 1200);
  }

  function toggleSet(id: string) {
    setTargetSetIds((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id],
    );
  }

  const setPickerContent = (
    <div style={{ width: 200 }}>
      {availableCompSets.map((cs) => (
        <div
          key={cs.id}
          onClick={() => toggleSet(cs.id)}
          style={{
            display: "flex",
            alignItems: "center",
            gap: 8,
            padding: "6px 8px",
            cursor: "pointer",
            borderRadius: "var(--radius-sm)",
          }}
          onMouseEnter={(e) => { (e.currentTarget as HTMLDivElement).style.background = "var(--color-surface-gray-50)"; }}
          onMouseLeave={(e) => { (e.currentTarget as HTMLDivElement).style.background = "transparent"; }}
        >
          <Checkbox checked={targetSetIds.includes(cs.id)} onChange={() => toggleSet(cs.id)} />
          <span style={{ fontSize: "var(--font-size-xs)", flex: 1 }}>{cs.name}</span>
          <span style={{ fontSize: "var(--font-size-xs)", color: "var(--color-text-tertiary)" }}>{cs.instrumentCount}</span>
        </div>
      ))}
    </div>
  );

  return (
    <div
      aria-live="polite"
      role="status"
      style={{
        position: "sticky",
        bottom: 0,
        zIndex: 20,
        background: "var(--color-surface-white)",
        borderTop: "1px solid var(--color-border)",
        padding: "10px 16px",
        display: "flex",
        alignItems: "center",
        gap: 12,
        flexShrink: 0,
        transform: isVisible ? "translateY(0)" : "translateY(100%)",
        transition: "transform 150ms ease-out",
        boxShadow: isVisible ? "0 -2px 8px rgba(0,0,0,0.06)" : "none",
        visibility: isVisible ? "visible" : "hidden",
      }}
    >
      {/* Count + clear */}
      <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
        <span style={{ fontSize: "var(--font-size-xs)", color: "var(--color-success)", fontWeight: 600 }}>
          ✓ {selectedInstruments.length} selected
        </span>
        <Button
          type="text"
          size="small"
          icon={<CloseOutlined />}
          onClick={onClearSelection}
          aria-label="Clear selection"
          style={{ color: "var(--color-text-tertiary)", padding: "0 4px" }}
        />
      </div>

      <div style={{ width: 1, height: 16, background: "var(--color-border)" }} />

      {/* Target sets */}
      <div style={{ display: "flex", alignItems: "center", gap: 6, flex: 1, flexWrap: "wrap" }}>
        <span style={{ fontSize: "var(--font-size-xs)", color: "var(--color-text-secondary)", whiteSpace: "nowrap" }}>
          Add to:
        </span>
        {targetSetIds.map((id) => {
          const cs = availableCompSets.find((s) => s.id === id);
          return cs ? (
            <Tag
              key={id}
              closable
              onClose={() => toggleSet(id)}
              style={{ fontSize: 11, margin: 0 }}
            >
              {cs.name}
            </Tag>
          ) : null;
        })}
        <Popover
          content={setPickerContent}
          trigger="click"
          open={popoverOpen}
          onOpenChange={setPopoverOpen}
          placement="topLeft"
          title="Select comp sets"
        >
          <Button size="small" type="dashed" style={{ fontSize: 11, height: 22, padding: "0 7px" }}>
            + Select set
          </Button>
        </Popover>
      </div>

      {/* Add button */}
      <Button
        type="primary"
        size="small"
        disabled={targetSetIds.length === 0 || justAdded}
        onClick={handleAdd}
        icon={justAdded ? <CheckOutlined /> : undefined}
        style={{ flexShrink: 0 }}
      >
        {justAdded ? "Added" : "Add to Sets"}
      </Button>
    </div>
  );
}
