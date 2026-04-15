import { LeftOutlined, RightOutlined } from "@ant-design/icons";

interface SideNavToggleProps {
  collapsed: boolean;
  onToggle: () => void;
  color: string;
  colorHover: string;
}

export function SideNavToggle({ collapsed, onToggle, color, colorHover }: SideNavToggleProps) {
  return (
    <div style={{ height: 32, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
      <button
        onClick={onToggle}
        style={{
          background: "none",
          border:     "none",
          cursor:     "pointer",
          color,
          width:      "100%",
          height:     "100%",
          display:    "flex",
          alignItems: "center",
          justifyContent: "center",
          transition: "color 0.15s",
        }}
        onMouseEnter={(e) => { (e.currentTarget as HTMLButtonElement).style.color = colorHover; }}
        onMouseLeave={(e) => { (e.currentTarget as HTMLButtonElement).style.color = color; }}
      >
        {collapsed ? <RightOutlined style={{ fontSize: 11 }} /> : <LeftOutlined style={{ fontSize: 11 }} />}
      </button>
    </div>
  );
}
