// Theme
export { ThemeProvider, useTheme } from "./theme/index.js";

// Layout
export { AppShell } from "./layout/AppShell/index.js";
export { PageHeader } from "./layout/PageHeader/index.js";
export { HeaderProvider, HeaderActions, HeaderContext } from "./layout/TopBar/index.js";
export type { AppNotification } from "./layout/TopBar/index.js";
export { WidgetGrid, WidgetGridItem } from "./layout/WidgetGrid/index.js";
export { WidgetCard } from "./layout/WidgetCard/index.js";

// Data Display
export { DataTable } from "./data-display/DataTable/index.js";
export type { TableColumnsType } from "./data-display/DataTable/index.js";
export { MetricCard } from "./data-display/MetricCard/index.js";
export { StatGroup } from "./data-display/StatGroup/index.js";
export { Badge } from "./data-display/Badge/index.js";

// Data Input
export { FilterBar } from "./data-input/FilterBar/index.js";
export { SearchInput } from "./data-input/SearchInput/index.js";
export { CurrencyInput } from "./data-input/CurrencyInput/index.js";
export { TimeframeSelector } from "./data-input/TimeframeSelector/index.js";

// Feedback
export { EmptyState } from "./feedback/EmptyState/index.js";
export { ErrorState } from "./feedback/ErrorState/index.js";
export { SkeletonWidget } from "./feedback/SkeletonWidget/index.js";

// Navigation
export { SideNav } from "./navigation/SideNav/index.js";
export type { NavItem, NavSection, UserProfile } from "./navigation/SideNav/index.js";
export { BreadcrumbNav } from "./navigation/BreadcrumbNav/index.js";

// Icons — re-exported so app code never imports @ant-design/icons directly
export {
  BankOutlined,
  BulbOutlined,
  MoonFilled,
  UserOutlined,
  LogoutOutlined,
  CheckOutlined,
  DashboardOutlined,
  FileAddOutlined,
  LineChartOutlined,
  QuestionCircleOutlined,
  FundOutlined,
  PieChartOutlined,
  BarChartOutlined,
  SettingOutlined,
  BellOutlined,
  WarningOutlined,
  SearchOutlined,
  FilterOutlined,
  ArrowUpOutlined,
  ArrowDownOutlined,
  MinusOutlined,
  DownOutlined,
  UpOutlined,
} from "@ant-design/icons";
