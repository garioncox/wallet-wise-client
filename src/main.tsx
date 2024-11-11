import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { AuthProvider } from "react-oidc-context";
import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "./Functions/TanStack/QueryClient.ts";

const oidcConfig = {
  authority: "https://auth.snowse.duckdns.org/realms/advanced-frontend/",
  client_id: "garion-final",
  redirect_uri: "https://garion-final.duckdns.org:5173",
  automaticSilentRenew: true,
};

createRoot(document.getElementById("root")!).render(
  <AuthProvider {...oidcConfig}>
    <StrictMode>
      <QueryClientProvider client={queryClient}>
        <App />
      </QueryClientProvider>
    </StrictMode>
  </AuthProvider>
);
