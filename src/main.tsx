import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "./Functions/TanStack/QueryClient.ts";
import { MainLayout } from "./Components/Layout/MainLayout.tsx";
import { ErrorBoundary } from "react-error-boundary";
import { Error } from "./Pages/Error.tsx";
import { BrowserRouter } from "react-router-dom";
import { Auth0Provider } from "@auth0/auth0-react";

createRoot(document.getElementById("root")!).render(
  <BrowserRouter>
    <Auth0Provider
      domain="dev-k4gmg3x4vel0mi7q.us.auth0.com"
      clientId="ZFOZiL0TBMfGvjZU3t8k8dgl84jolRR8"
      authorizationParams={{
        redirect_uri: window.location.origin,
      }}
    >
      <StrictMode>
        <QueryClientProvider client={queryClient}>
          <MainLayout>
            <ErrorBoundary fallback={<Error />}>
              <App />
            </ErrorBoundary>
          </MainLayout>
        </QueryClientProvider>
      </StrictMode>
    </Auth0Provider>
  </BrowserRouter>
);
