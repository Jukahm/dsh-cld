import { createRoute } from "@tanstack/react-router";
import { Route as rootRoute } from "../__root.js";
import { InstrumentMatrixPage } from "../../features/comparables/matrix.js";

export const Route = createRoute({
  getParentRoute: () => rootRoute,
  path: "/comparables/matrix",
  component: InstrumentMatrixPage,
});
