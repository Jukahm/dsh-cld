import { useState, useEffect } from "react";
import { Checkbox } from "antd";
import type { IHeaderParams } from "ag-grid-community";

export type CheckboxHeaderParams = {
  /** Field in row data that holds this column's boolean checked state. */
  membershipField: string;
  /** Called when the header checkbox is toggled — parent handles the transaction. */
  onToggleAll: (field: string, nextChecked: boolean) => void;
};

type Props = IHeaderParams & CheckboxHeaderParams;

export function CheckboxColHeader({ api, displayName, membershipField, onToggleAll }: Props) {
  const [checked, setChecked] = useState(false);
  const [indeterminate, setIndeterminate] = useState(false);

  useEffect(() => {
    function sync() {
      let total = 0;
      let checkedCount = 0;
      api.forEachNodeAfterFilter((node) => {
        total++;
        if (node.data?.[membershipField]) checkedCount++;
      });
      setChecked(total > 0 && checkedCount === total);
      setIndeterminate(checkedCount > 0 && checkedCount < total);
    }

    // Re-sync whenever any cell value changes, row data refreshes, or filter changes
    api.addEventListener("cellValueChanged", sync);
    api.addEventListener("rowDataUpdated", sync);
    api.addEventListener("filterChanged", sync);
    sync();
    return () => {
      api.removeEventListener("cellValueChanged", sync);
      api.removeEventListener("rowDataUpdated", sync);
      api.removeEventListener("filterChanged", sync);
    };
  }, [api, membershipField]);

  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        gap: 6,
        height: "100%",
        overflow: "hidden",
        paddingLeft: 2,
      }}
    >
      <Checkbox
        checked={checked}
        indeterminate={indeterminate}
        onChange={(e) => onToggleAll(membershipField, e.target.checked)}
        onClick={(e) => e.stopPropagation()}
      />
      <span
        style={{
          fontSize: 12,
          fontWeight: 600,
          color: "var(--color-text-secondary)",
          overflow: "hidden",
          textOverflow: "ellipsis",
          whiteSpace: "nowrap",
        }}
      >
        {displayName}
      </span>
    </div>
  );
}
