import { Cardify } from "../Components/Layout/Cardify";
import { Spinner } from "../Components/Layout/Spinner";
import { useAllBudgetForCurrentCustomer } from "../Functions/TanStack/BudgetQueries";
import { useCurrentCustomer } from "../Functions/TanStack/CustomerQueries";
import { useAllTransactionEventsForCurrentCustomer } from "../Functions/TanStack/TransactionQueries";

export const Profile = () => {
  const { data: user, isLoading } = useCurrentCustomer();
  const { data: budgets, isLoading: isBudgetsLoading } =
    useAllBudgetForCurrentCustomer();
  const { data: transactions, isLoading: isTransactionsLoading } =
    useAllTransactionEventsForCurrentCustomer();

  if (isLoading || isBudgetsLoading || isTransactionsLoading) {
    return <Spinner />;
  }

  return (
    <Cardify>
      <div>
        <div className="text-center  border-b-2 border-stone-500 pb-3 mb-3">
          <div className="font-semibold text-xl">{user.surname}</div>
          <div>{user.email}</div>
        </div>
        <div>{budgets.length} budgets</div>
        <div>{transactions.length} transactions</div>
      </div>
    </Cardify>
  );
};
