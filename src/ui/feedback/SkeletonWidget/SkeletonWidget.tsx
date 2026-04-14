import { Skeleton } from "antd";

interface SkeletonWidgetProps {
  rows?: number;
  showTitle?: boolean;
}

export function SkeletonWidget({ rows = 4, showTitle = false }: SkeletonWidgetProps) {
  return (
    <div style={{ padding: "4px 0" }}>
      <Skeleton active title={showTitle} paragraph={{ rows }} />
    </div>
  );
}
