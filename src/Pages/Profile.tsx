import { Cardify } from "../Components/Layout/Cardify";
import { Spinner } from "../Components/Layout/Spinner";
import { useAllCustomerBudgets } from "../Functions/TanStack/BudgetQueries";
import { useCustomer } from "../Functions/TanStack/CustomerQueries";
import { useAllCustomerTE } from "../Functions/TanStack/TEQueries";

export const Profile = () => {
  const { data: user, isLoading } = useCustomer();
  const { data: budgets, isLoading: isBudgetsLoading } =
    useAllCustomerBudgets();
  const { data: transactions, isLoading: isTransactionsLoading } =
    useAllCustomerTE();

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
