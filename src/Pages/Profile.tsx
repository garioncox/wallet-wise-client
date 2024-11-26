import { useAuth } from "react-oidc-context";
import { Cardify } from "../Components/Layout/Cardify";
import { Spinner } from "../Components/Layout/Spinner";

export const Profile = () => {
  const { user, isLoading } = useAuth();

  if (isLoading) {
    return <Spinner />;
  }

  return (
    <Cardify>
      <div>{user?.profile.email}</div>
    </Cardify>
  );
};
