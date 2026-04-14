import { Input } from "antd";
import { SearchOutlined } from "@ant-design/icons";
import { useDebounce } from "@/shared";
import { useEffect, useState } from "react";

interface SearchInputProps {
  value?: string;
  onChange?: (value: string) => void;
  placeholder?: string;
  debounceMs?: number;
  loading?: boolean;
  style?: React.CSSProperties;
}

export function SearchInput({
  value: externalValue = "",
  onChange,
  placeholder = "Search…",
  debounceMs = 300,
  loading = false,
  style,
}: SearchInputProps) {
  const [localValue, setLocalValue] = useState(externalValue);
  const debouncedValue = useDebounce(localValue, debounceMs);

  useEffect(() => {
    if (debouncedValue !== externalValue) {
      onChange?.(debouncedValue);
    }
  }, [debouncedValue, externalValue, onChange]);

  useEffect(() => {
    setLocalValue(externalValue);
  }, [externalValue]);

  return (
    <Input
      prefix={<SearchOutlined style={{ color: "var(--color-text-tertiary)" }} />}
      value={localValue}
      onChange={(e) => setLocalValue(e.target.value)}
      placeholder={placeholder}
      allowClear
      style={{ width: 200, ...style }}
      suffix={loading ? <span className="anticon anticon-loading" /> : null}
    />
  );
}
