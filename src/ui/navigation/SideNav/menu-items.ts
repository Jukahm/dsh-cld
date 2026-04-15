import type { MenuProps } from "antd";
import type { NavSection } from "./types.js";

type AntdItem = Required<MenuProps>["items"][number];

export function toMenuItems(sections: NavSection[], collapsed: boolean): AntdItem[] {
  const items: AntdItem[] = [];
  for (const section of sections) {
    if (section.label) {
      items.push({ type: "group", label: collapsed ? null : section.label, key: `group-${section.key}` });
    }
    for (const item of section.items) {
      if (item.children && item.children.length > 0) {
        items.push({
          key: item.key, label: item.label, icon: item.icon, disabled: item.disabled,
          children: item.children.map((c) => ({ key: c.key, label: c.label, icon: c.icon, disabled: c.disabled })),
        });
      } else {
        items.push({ key: item.key, label: item.label, icon: item.icon, disabled: item.disabled });
      }
    }
  }
  return items;
}
