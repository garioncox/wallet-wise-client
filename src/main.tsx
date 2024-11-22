import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { AuthProvider, AuthProviderProps } from "react-oidc-context";
import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "./Functions/TanStack/QueryClient.ts";
import { MainLayout } from "./Components/Layout/MainLayout.tsx";
import { ErrorBoundary } from "react-error-boundary";
import { Error } from "./Pages/Error.tsx";
import { BrowserRouter } from "react-router-dom";

const oidcConfig: AuthProviderProps = {
  authority: "https://auth.snowse.duckdns.org/realms/advanced-frontend/",
  client_id: "garion-final",
  redirect_uri:
    process.env.NODE_ENV === "production"
      ? "https://garion-final.duckdns.org/"
      : "http://localhost:5173",
  onSigninCallback: () => {
    window.history.replaceState({}, document.title, window.location.pathname);
  },
  automaticSilentRenew: true,
};

createRoot(document.getElementById("root")!).render(
  <BrowserRouter>
    <AuthProvider {...oidcConfig}>
      <StrictMode>
        <QueryClientProvider client={queryClient}>
          <MainLayout>
            <ErrorBoundary fallback={<Error />}>
              <App />
            </ErrorBoundary>
          </MainLayout>
        </QueryClientProvider>
      </StrictMode>
    </AuthProvider>
  </BrowserRouter>
);
