import { Route, Routes } from "react-router-dom";
import { Landing } from "./Pages/Landing";
import { TransactionInput } from "./Pages/TransactionInput";
import { TransactionHistory } from "./Pages/TransactionHistory";
import { Profile } from "./Pages/Profile";
import { RequireAuth } from "./Components/Auth/RequireAuth";
import BudgetInput from "./Pages/BudgetInput";
import { BudgetStats } from "./Pages/BudgetStats";
import { TransactionEdit } from "./Pages/TransactionEdit";
import { Dashboard } from "./Pages/Dashboard";
import BudgetEdit from "./Pages/BudgetEdit";
import { NotFound } from "./Pages/NotFound";

function App() {
  // const { user, isAuthenticated } = useAuth();

  // useEffect(() => {
  //   const call = async () => {
  //     // console.log(`calling with... ${user?.id_token ?? ""}`);
  //     await callAuthApiEndpoint(user?.id_token ?? "");
  //   };
  //   if (isAuthenticated) {
  //     call();
  //   }
  // }, [user, isAuthenticated]);

  return (
    <Routes>
      <Route path="/" element={<Landing />} />
      <Route
        path="/transaction/input"
        element={
          <RequireAuth>
            <TransactionInput />
          </RequireAuth>
        }
      />
      <Route
        path="/transaction/view"
        element={
          <RequireAuth>
            <TransactionHistory />
          </RequireAuth>
        }
      />
      <Route
        path="/profile"
        element={
          <RequireAuth>
            <Profile />
          </RequireAuth>
        }
      />
      <Route
        path="/budget/input"
        element={
          <RequireAuth>
            <BudgetInput />
          </RequireAuth>
        }
      />
      <Route
        path="/budget/stats/:budgetId"
        element={
          <RequireAuth>
            <BudgetStats />
          </RequireAuth>
        }
      ></Route>
      <Route
        path="/budget/edit/:budgetId"
        element={
          <RequireAuth>
            <BudgetEdit />
          </RequireAuth>
        }
      ></Route>
      <Route
        path="/transaction/edit/:transactionId"
        element={
          <RequireAuth>
            <TransactionEdit />
          </RequireAuth>
        }
      ></Route>
      <Route
        path="/dashboard"
        element={
          <RequireAuth>
            <Dashboard />
          </RequireAuth>
        }
      ></Route>
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

export default App;
