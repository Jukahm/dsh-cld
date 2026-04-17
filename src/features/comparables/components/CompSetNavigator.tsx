import { useState } from "react";
import { Button, Input, Modal, Tooltip } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import type { CompSetSummary } from "../types/index.js";

type Props = {
  compSets: CompSetSummary[];
  activeSetId: string | null;
  onSelectSet: (id: string) => void;
  onCreateNew: (name: string) => void;
};

export function CompSetNavigator({ compSets, activeSetId, onSelectSet, onCreateNew }: Props) {
  const [modalOpen, setModalOpen] = useState(false);
  const [newName, setNewName] = useState("");

  function handleCreate() {
    if (newName.trim()) {
      onCreateNew(newName.trim());
      setNewName("");
      setModalOpen(false);
    }
  }

  return (
    <div style={{ display: "flex", flexDirection: "column", height: "100%" }}>
      {/* Header */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "12px 14px 10px",
          borderBottom: "1px solid var(--color-border)",
          position: "sticky",
          top: 0,
          background: "var(--color-surface-white)",
          zIndex: 1,
        }}
      >
        <span
          style={{
            fontSize: "var(--font-size-xs)",
            fontWeight: 600,
            letterSpacing: "0.07em",
            textTransform: "uppercase",
            color: "var(--color-text-secondary)",
          }}
        >
          Comp Sets
        </span>
        <Button
          size="small"
          type="primary"
          icon={<PlusOutlined />}
          onClick={() => setModalOpen(true)}
        >
          New
        </Button>
      </div>

      {/* List */}
      <div style={{ flex: 1, overflowY: "auto" }}>
        {compSets.length === 0 && (
          <div
            style={{
              padding: "24px 14px",
              textAlign: "center",
              color: "var(--color-text-tertiary)",
              fontSize: "var(--font-size-xs)",
            }}
          >
            No comp sets yet
          </div>
        )}
        {compSets.map((cs) => {
          const isActive = cs.id === activeSetId;
          return (
            <Tooltip key={cs.id} title={cs.name} placement="right" mouseEnterDelay={0.6}>
              <div
                role="listitem"
                aria-current={isActive ? "true" : undefined}
                onClick={() => onSelectSet(cs.id)}
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  padding: "9px 14px 9px 12px",
                  borderLeft: isActive
                    ? "3px solid var(--color-accent)"
                    : "3px solid transparent",
                  background: isActive ? "var(--color-surface-gray-50)" : "transparent",
                  cursor: "pointer",
                  transition: "background 150ms",
                  gap: 8,
                }}
                onMouseEnter={(e) => {
                  if (!isActive) (e.currentTarget as HTMLDivElement).style.background = "var(--color-surface-gray-50)";
                }}
                onMouseLeave={(e) => {
                  if (!isActive) (e.currentTarget as HTMLDivElement).style.background = "transparent";
                }}
              >
                <span
                  style={{
                    fontSize: "var(--font-size-sm)",
                    fontWeight: isActive ? 600 : 400,
                    color: isActive ? "var(--color-text-primary)" : "var(--color-text-secondary)",
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                    whiteSpace: "nowrap",
                    flex: 1,
                  }}
                >
                  {cs.name}
                </span>
                <span
                  style={{
                    fontSize: "var(--font-size-xs)",
                    color: isActive ? "var(--color-accent)" : "var(--color-text-tertiary)",
                    fontVariantNumeric: "tabular-nums",
                    fontWeight: isActive ? 600 : 400,
                    flexShrink: 0,
                  }}
                >
                  {cs.instrumentCount}
                </span>
              </div>
            </Tooltip>
          );
        })}
      </div>

      {/* Create modal */}
      <Modal
        title="New Comp Set"
        open={modalOpen}
        onOk={handleCreate}
        onCancel={() => { setModalOpen(false); setNewName(""); }}
        okText="Create"
        okButtonProps={{ disabled: !newName.trim() }}
        width={360}
      >
        <Input
          placeholder="Set name"
          value={newName}
          onChange={(e) => setNewName(e.target.value)}
          onPressEnter={handleCreate}
          autoFocus
          style={{ marginTop: 8 }}
        />
      </Modal>
    </div>
  );
}
