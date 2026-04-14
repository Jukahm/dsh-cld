import type { ReactNode } from "react";
import { useState } from "react";
import { Space, Select, DatePicker, Button } from "antd";
import { FilterOutlined, DownOutlined, UpOutlined } from "@ant-design/icons";
import { SearchInput } from "../SearchInput/index.js";
import { useMediaQuery, breakpoints } from "@/shared";
import type { FilterConfig, DateRange } from "@/shared";

const { RangePicker } = DatePicker;

interface FilterBarProps {
  dateRange?: DateRange;
  onDateChange?: (range: DateRange | null) => void;
  filters?: FilterConfig[];
  filterValues?: Record<string, string | undefined>;
  onFilterChange?: (key: string, value: string | undefined) => void;
  searchValue?: string;
  onSearch?: (value: string) => void;
  searchPlaceholder?: string;
  extra?: ReactNode;
}

export function FilterBar({
  dateRange: _dateRange,
  onDateChange,
  filters = [],
  filterValues = {},
  onFilterChange,
  searchValue,
  onSearch,
  searchPlaceholder,
  extra,
}: FilterBarProps) {
  const isDesktop = useMediaQuery(breakpoints.md);
  const [expanded, setExpanded] = useState(false);

  const showFilters = isDesktop || expanded;

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        gap: 8,
        padding: "10px 0",
        borderBottom: "1px solid var(--color-border)",
        marginBottom: 16,
      }}
    >
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: 8,
          flexWrap: "wrap",
        }}
      >
        {onSearch && (
          <SearchInput
            value={searchValue}
            onChange={onSearch}
            placeholder={searchPlaceholder}
          />
        )}

        {!isDesktop && (filters.length > 0 || onDateChange) && (
          <Button
            size="small"
            icon={<FilterOutlined />}
            onClick={() => setExpanded((e) => !e)}
            type={expanded ? "primary" : "default"}
          >
            Filters {expanded ? <UpOutlined /> : <DownOutlined />}
          </Button>
        )}

        {extra && <div style={{ marginLeft: "auto" }}>{extra}</div>}
      </div>

      {showFilters && (
        <Space wrap size={[8, 8]}>
          {onDateChange && (
            <RangePicker
              size="small"
              onChange={(_, dateStrings) => {
                if (dateStrings[0] && dateStrings[1]) {
                  onDateChange({ from: dateStrings[0], to: dateStrings[1] });
                } else {
                  onDateChange(null);
                }
              }}
              style={{ fontSize: "var(--font-size-sm)" }}
            />
          )}

          {filters.map((filter) => (
            <Select
              key={filter.key}
              placeholder={filter.placeholder ?? filter.label}
              value={filterValues[filter.key]}
              onChange={(val) => onFilterChange?.(filter.key, val as string | undefined)}
              options={filter.options}
              allowClear
              size="small"
              style={{ minWidth: 130 }}
            />
          ))}
        </Space>
      )}
    </div>
  );
}
