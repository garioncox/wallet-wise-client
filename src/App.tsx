import { Route, Routes } from "react-router-dom";
import { useAllCustomers } from "./Functions/TanStack/CustomerQueries";
import { Landing } from "./Pages/Landing";
import { TransactionInput } from "./Pages/TransactionInput";

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
    </Routes>
  );
}

export default App;
