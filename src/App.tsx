import { MainLayout } from "./Components/Layout/MainLayout";
import { Budget } from "./Data/Budget";
import { TransactionEvent } from "./Data/TransactionEvent";
import { useAllBudgets } from "./Functions/TanStack/BudgetQueries";
import { useAllCustomers } from "./Functions/TanStack/CustomerQueries";
import { useAllTransactionEvents } from "./Functions/TanStack/TransactionQueries";
import { Landing } from "./Pages/Landing";

function App() {
  const {
    data: customers,
    isError: isCustomersError,
    isPending: isCustomersPending,
  } = useAllCustomers();

  const {
    data: budgets,
    isError: isBudgetsError,
    isPending: isBudgetsPending,
  } = useAllBudgets();

  const {
    data: transactions,
    isError: isTransactionsError,
    isPending: isTransactionsPending,
  } = useAllTransactionEvents();

  if (isCustomersPending || isBudgetsPending || isTransactionsPending) {
    <div>Loading...</div>;
  }

  if (isCustomersError || isBudgetsError || isTransactionsError) {
    return <div>Sorry, something went wrong.</div>;
  }

  return (
    <MainLayout>
      <Landing />
      {/* <div className="bg-christi-500 p-4">
        <p>Hello World!</p>

        {customers && customers[0] && <p>{customers[0].surname}</p>}

        <hr />
        <p>Budgets:</p>
        {budgets &&
          budgets.map((b: Budget) => {
            return <p key={b.id}>{b.budgetName}</p>;
          })}

        <hr />
        <p>Transactions:</p>
        {transactions &&
          transactions.map((t: TransactionEvent) => {
            return <p key={t.id}>{t.transactionName}</p>;
          })}
      </div> */}
    </MainLayout>
  );
}

export default App;
