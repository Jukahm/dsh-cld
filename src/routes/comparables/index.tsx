import { createRoute } from "@tanstack/react-router";
import { Route as rootRoute } from "../__root.js";
import { ComparablesManager } from "../../features/comparables/index.js";

export const Route = createRoute({
  getParentRoute: () => rootRoute,
  path: "/comparables",
  component: ComparablesManager,
});
