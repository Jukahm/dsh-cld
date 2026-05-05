// Route tree — manually maintained until TanStack Router CLI is configured.
// Run `npx tsr generate` in apps/dashboard to switch to auto-generation.
import { Route as rootRoute } from "./routes/__root.js";
import { Route as indexRoute } from "./routes/index.js";
import { Route as portfolioRoute } from "./routes/portfolio/index.js";
import { Route as comparablesRoute } from "./routes/comparables/index.js";
import { Route as comparablesMatrixRoute } from "./routes/comparables/matrix.js";

export const routeTree = rootRoute.addChildren([
  indexRoute,
  portfolioRoute,
  comparablesRoute,
  comparablesMatrixRoute,
]);
