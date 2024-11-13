import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { AuthProvider, AuthProviderProps } from "react-oidc-context";
import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "./Functions/TanStack/QueryClient.ts";

const oidcConfig: AuthProviderProps = {
  authority: "https://auth.snowse.duckdns.org/realms/advanced-frontend/",
  client_id: "garion-final",
  redirect_uri: "https://garion-final.duckdns.org/",
  onSigninCallback: (user) => {
    console.log(user);
    window.history.replaceState({}, document.title, window.location.pathname);
  },
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
