import { useNavigate } from "react-router-dom";
import { Error } from "../Components/Error";
import { Cardify } from "../Components/Layout/Cardify";
import { ProgressCircle } from "../Components/Layout/ProgressCircle";
import { Spinner } from "../Components/Layout/Spinner";
import { Budget } from "../Data/Budget";
import { BudgetTransactionEvent } from "../Data/BudgetTransactionEvent";
import { TransactionEvent } from "../Data/TransactionEvent";
import { useAllCustomerBudgets } from "../Functions/TanStack/BudgetQueries";
import { useAllCustomerBTE } from "../Functions/TanStack/BTEQueries";
import { useAllCustomerTE } from "../Functions/TanStack/TEQueries";

export const Dashboard = () => {
  const navigate = useNavigate();

  const {
    data: allBTE,
    isLoading: isBTELoading,
    isError: isBTEError,
  } = useAllCustomerBTE();
  const {
    data: allTransactionEvents,
    isLoading: isTransactionsLoading,
    isError: isTransactionsError,
  } = useAllCustomerTE();
  const {
    data: allBudgets,
    isLoading: isBudgetsLoading,
    isError: isBudgetsError,
  } = useAllCustomerBudgets();

  const getTotalExpensesForBudget = (b: Budget) => {
    const relevantBTEs = allBTE.filter(
      (bte: BudgetTransactionEvent) => bte.budgetId === Number(b.id)
    );

    const totalExpenses = relevantBTEs
      .map((bte: BudgetTransactionEvent) => {
        const transactionEvent = allTransactionEvents.find(
          (t: TransactionEvent) => t.id === bte.transactionEventId
        );

        return transactionEvent ? transactionEvent.amt : 0;
      })
      .reduce((sum: number, price: number) => sum + price, 0);

    return totalExpenses;
  };

  const getTotalExpenses = () => {
    return allTransactionEvents.reduce((total: number, t: TransactionEvent) => {
      return total + t.amt;
    }, 0);
  };

  const getPercentageExpenseString = (b: Budget) => {
    return ((getTotalExpensesForBudget(b) / getTotalExpenses()) * 100).toFixed(
      2
    );
  };

  if (isBTELoading || isTransactionsLoading || isBudgetsLoading) {
    return <Spinner />;
  }

  if (isBTEError || isTransactionsError || isBudgetsError) {
    return <Error />;
  }

  if (!allBudgets || allBudgets.length === 0) {
    return <>No Data</>;
  }

  return (
    <>
      <div className="flex flex-wrap justify-center">
        {allBudgets.map((b: Budget) => {
          return (
            <Cardify
              key={b.id}
              clickable={true}
              onClick={() => navigate(`/budget/stats/${b.id}`)}
            >
              <div className="font-semibold text-2xl mb-2 pb-2 border-b border-stone-400">
                {b.budgetName}
              </div>
              <div className="mb-5">
                <span className="font-semibold border-b border-blue-600">
                  ${getTotalExpensesForBudget(b)}
                </span>{" "}
                / ${getTotalExpenses()}
              </div>
              <ProgressCircle
                usePercentage={true}
                progress={Number(getPercentageExpenseString(b))}
              />
            </Cardify>
          );
        })}
      </div>
    </>
  );
};
