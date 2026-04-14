import { Radio } from "antd";
import type { RadioChangeEvent } from "antd";

interface TimeframeSelectorProps {
  value: string;
  onChange: (value: string) => void;
  options: string[];
}

export function TimeframeSelector({ value, onChange, options }: TimeframeSelectorProps) {
  const handleChange = (e: RadioChangeEvent) => onChange(e.target.value as string);

  return (
    <Radio.Group size="small" value={value} onChange={handleChange} optionType="button">
      {options.map((opt) => (
        <Radio.Button key={opt} value={opt} style={{ fontSize: "var(--font-size-xs)" }}>
          {opt}
        </Radio.Button>
      ))}
    </Radio.Group>
  );
}
