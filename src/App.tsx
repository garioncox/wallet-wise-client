import { Route, Routes } from "react-router-dom";
import { useAllCustomers } from "./Functions/TanStack/CustomerQueries";
import { Landing } from "./Pages/Landing";
import { TransactionInput } from "./Pages/TransactionInput";
import { TransactionView } from "./Pages/TransactionView";
import { Test } from "./Pages/Test";

function App() {
  const { isError: isCustomersError, isPending: isCustomersPending } =
    useAllCustomers();

  if (isCustomersPending) {
    <div>Loading...</div>;
  }

  if (isCustomersError) {
    return <div>Sorry, something went wrong.</div>;
  }

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
