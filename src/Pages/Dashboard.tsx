import { Error } from "../Components/Error";
import { Cardify } from "../Components/Layout/Cardify";
import { ProgressCircle } from "../Components/Layout/ProgressCircle";
import { Spinner } from "../Components/Layout/Spinner";
import { Budget } from "../Data/Budget";
import { BudgetTransactionEvent } from "../Data/BudgetTransactionEvent";
import { TransactionEvent } from "../Data/TransactionEvent";
import { useAllBudgetForCurrentCustomer } from "../Functions/TanStack/BudgetQueries";
import { useAllBudgetTransactionsForCurrentCustomer } from "../Functions/TanStack/BudgetTransactionQueries";
import { useAllTransactionEventsForCurrentCustomer } from "../Functions/TanStack/TransactionQueries";

export const Dashboard = () => {
  const {
    data: allBTE,
    isLoading: isBTELoading,
    isError: isBTEError,
  } = useAllBudgetTransactionsForCurrentCustomer();
  const {
    data: allTransactionEvents,
    isLoading: isTransactionsLoading,
    isError: isTransactionsError,
  } = useAllTransactionEventsForCurrentCustomer();
  const {
    data: allBudgets,
    isLoading: isBudgetsLoading,
    isError: isBudgetsError,
  } = useAllBudgetForCurrentCustomer();

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

  return (
    <>
      {allBudgets.map((b: Budget) => {
        return (
          <Cardify key={b.id}>
            <div>{b.budgetName}</div>
            <div className="mb-5">
              Total:{" $"}
              {getTotalExpensesForBudget(b)}
            </div>
            <ProgressCircle
              usePercentage={true}
              progress={Number(getPercentageExpenseString(b))}
            />
          </Cardify>
        );
      })}
    </>
  );
};
