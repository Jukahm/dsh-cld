import { setupWorker } from "msw/browser";
import { portfolioHandlers } from "../features/portfolio-overview/mocks/handlers.js";

export const worker = setupWorker(...portfolioHandlers);
