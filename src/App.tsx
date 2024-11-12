import { MainLayout } from "./Components/Layout/MainLayout";
import { useAllCustomers } from "./Functions/TanStack/CustomerQueries";
import { Landing } from "./Pages/Landing";

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
    <MainLayout>
      <Landing />
    </MainLayout>
  );
}

export default App;
