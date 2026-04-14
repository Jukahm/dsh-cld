import { createRoute } from "@tanstack/react-router";
import { Route as rootRoute } from "../__root.js";
import { PortfolioOverview } from "../../features/portfolio-overview/index.js";

export const Route = createRoute({
  getParentRoute: () => rootRoute,
  path: "/portfolio",
  component: PortfolioOverview,
});
