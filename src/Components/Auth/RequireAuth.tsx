import { ReactNode } from "react";
import { withAuthenticationRequired } from "react-oidc-context";

export const RequireAuth = ({ children }: { children: ReactNode }) => {
  const Protected = withAuthenticationRequired(() => <>{children}</>, {
    OnRedirecting: () => <div>Redirecting to the login page...</div>,
  });

  return <Protected />;
};
