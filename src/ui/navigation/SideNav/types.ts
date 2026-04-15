import type { ReactNode } from "react";

export interface NavItem {
  key: string;
  label: string;
  icon?: ReactNode;
  href?: string;
  disabled?: boolean;
  children?: NavItem[];
}

export interface NavSection {
  key: string;
  label?: string;
  items: NavItem[];
  bottom?: boolean;
}

export interface UserProfile {
  name: string;
  email: string;
  initials: string;
}
