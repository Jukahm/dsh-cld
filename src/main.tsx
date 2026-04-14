import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { RouterProvider } from "@tanstack/react-router";
import { ThemeProvider } from "@/ui";
import { router } from "./router.js";
import "./styles/global.css";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 2,
      staleTime: 30_000,
      refetchOnWindowFocus: false,
    },
    mutations: {
      retry: 0,
    },
  },
});

async function bootstrap() {
  // Start MSW in development before rendering
  if (import.meta.env.DEV) {
    const { worker } = await import("./mocks/browser.js");
    await worker.start({
      onUnhandledRequest: "bypass",
      serviceWorker: {
        url: "/mockServiceWorker.js",
      },
    });
  }

  const rootEl = document.getElementById("root");
  if (!rootEl) throw new Error("Root element not found");

  createRoot(rootEl).render(
    <StrictMode>
      <QueryClientProvider client={queryClient}>
        <ThemeProvider>
          <RouterProvider router={router} />
        </ThemeProvider>
      </QueryClientProvider>
    </StrictMode>,
  );
}

void bootstrap();
