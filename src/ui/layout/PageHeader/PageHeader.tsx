import type { ReactNode } from "react";
import { Typography, Space } from "antd";

const { Title } = Typography;

interface BreadcrumbItem {
  label: string;
  href?: string;
}

interface PageHeaderProps {
  title: string;
  subtitle?: string;
  breadcrumbs?: BreadcrumbItem[];
  actions?: ReactNode;
}

export function PageHeader({ title, subtitle, breadcrumbs, actions }: PageHeaderProps) {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "flex-start",
        justifyContent: "space-between",
        marginBottom: 20,
        gap: 16,
      }}
    >
      <div>
        {breadcrumbs && breadcrumbs.length > 0 && (
          <div
            style={{
              fontSize: "var(--font-size-xs)",
              color: "var(--color-text-tertiary)",
              marginBottom: 4,
              display: "flex",
              gap: 6,
              alignItems: "center",
            }}
          >
            {breadcrumbs.map((item, i) => (
              <span key={item.label}>
                {i > 0 && <span style={{ marginRight: 6 }}>/</span>}
                {item.href ? (
                  <a
                    href={item.href}
                    style={{ color: "var(--color-text-tertiary)", textDecoration: "none" }}
                  >
                    {item.label}
                  </a>
                ) : (
                  item.label
                )}
              </span>
            ))}
          </div>
        )}
        <Title
          level={4}
          style={{ margin: 0, fontSize: "var(--font-size-xl)", lineHeight: 1.3 }}
        >
          {title}
        </Title>
        {subtitle && (
          <p
            style={{
              margin: "4px 0 0",
              fontSize: "var(--font-size-sm)",
              color: "var(--color-text-secondary)",
            }}
          >
            {subtitle}
          </p>
        )}
      </div>
      {actions && <Space>{actions}</Space>}
    </div>
  );
}
