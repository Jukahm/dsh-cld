import { setupServer } from "msw/node";
import { portfolioHandlers } from "../features/portfolio-overview/mocks/handlers.js";

export const server = setupServer(...portfolioHandlers);
