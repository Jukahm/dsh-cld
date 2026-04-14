import { http, HttpResponse, delay } from "msw";
import {
  mockHoldings,
  mockPortfolioSummary,
  mockPortfolioHistory,
} from "./data.js";

export const portfolioHandlers = [
  http.get("/api/portfolio/summary", async () => {
    await delay(400);
    return HttpResponse.json({ data: mockPortfolioSummary });
  }),

  http.get("/api/portfolio/holdings", async () => {
    await delay(600);
    return HttpResponse.json({
      data: mockHoldings,
      pagination: {
        page: 1,
        pageSize: 50,
        total: mockHoldings.length,
        totalPages: 1,
      },
    });
  }),

  http.get("/api/portfolio/history", async ({ request }) => {
    await delay(500);
    const url = new URL(request.url);
    const timeframe = url.searchParams.get("timeframe") ?? "3M";

    const dayMap: Record<string, number> = {
      "1W": 7,
      "1M": 30,
      "3M": 90,
      "6M": 180,
      "YTD": 90, // simplified
      "1Y": 365,
    };

    const days = dayMap[timeframe] ?? 90;
    const sliced = mockPortfolioHistory.slice(-Math.min(days, mockPortfolioHistory.length));

    return HttpResponse.json({ data: sliced });
  }),
];
