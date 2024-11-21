import { Route, Routes } from "react-router-dom";
import { Landing } from "./Pages/Landing";
import { TransactionInput } from "./Pages/TransactionInput";
import { TransactionView } from "./Pages/TransactionView";
import { Test } from "./Pages/Test";
import { useEffect } from "react";
import { useAuth } from "react-oidc-context";
import { callAuthApiEndpoint } from "./Functions/apiService";

function App() {
  const { user, isAuthenticated } = useAuth();

  useEffect(() => {
    const call = async () => {
      console.log(`calling with... ${user?.id_token ?? ""}`);
      await callAuthApiEndpoint(user?.id_token ?? "");
    };
    if (isAuthenticated) {
      call();
    }
  }, [user, isAuthenticated]);

  return (
    <Routes>
      <Route path="/" element={<Landing />} />
      <Route path="/transaction/input" element={<TransactionInput />} />
      <Route path="/transaction/view" element={<TransactionView />} />
      <Route path="/test" element={<Test />} />
    </Routes>
  );
}

export default App;
