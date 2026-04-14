import { Breadcrumb } from "antd";
import type { BreadcrumbProps } from "antd";

interface BreadcrumbItem {
  label: string;
  href?: string;
}

interface BreadcrumbNavProps {
  items: BreadcrumbItem[];
  separator?: BreadcrumbProps["separator"];
}

export function BreadcrumbNav({ items, separator }: BreadcrumbNavProps) {
  return (
    <Breadcrumb
      separator={separator}
      style={{ fontSize: "var(--font-size-xs)" }}
      items={items.map((item) => ({
        title: item.href ? (
          <a href={item.href} style={{ color: "var(--color-text-secondary)" }}>
            {item.label}
          </a>
        ) : (
          <span style={{ color: "var(--color-text-tertiary)" }}>{item.label}</span>
        ),
      }))}
    />
  );
}
