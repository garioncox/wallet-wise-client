import { useNavigate, useParams } from "react-router-dom";
import { useAllBudgetTransactionsForCurrentCustomer } from "../Functions/TanStack/BudgetTransactionQueries";
import { useAllTransactionEventsForCurrentCustomer } from "../Functions/TanStack/TransactionQueries";
import { Spinner } from "../Components/Layout/Spinner";
import { Error } from "./Error";
import { Cardify } from "../Components/Layout/Cardify";
import { BudgetTransactionEvent } from "../Data/BudgetTransactionEvent";
import { TransactionEvent } from "../Data/TransactionEvent";
import { Tablefy } from "../Components/Layout/Tablefy";
import { useAllBudgetForCurrentCustomer } from "../Functions/TanStack/BudgetQueries";
import { Budget } from "../Data/Budget";
import { useDateUtils } from "../Functions/DateUtils";
import { PencilSquareIcon } from "@heroicons/react/20/solid";

export const BudgetStats = () => {
  const { budgetId } = useParams();
  const dateUtils = useDateUtils();
  const navigate = useNavigate();

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

  const budgetFromParam: Budget | undefined = allBudgets
    ? allBudgets.find((b: Budget) => b.id === Number(budgetId))
    : undefined;

  if (isBTELoading || isTransactionsLoading || isBudgetsLoading) {
    return <Spinner />;
  }

  if (isBTEError || isTransactionsError || isBudgetsError) {
    return <Error />;
  }

  if (!allBTE || !allTransactionEvents) {
    return (
      <div>
        <div>AllBTE: {allBTE ? "some" : "undefined"}</div>
        <div>Transactions: {allTransactionEvents ? "some" : "undefined"}</div>
      </div>
    );
  }

  return (
    <Cardify>
      <PencilSquareIcon
        className="h-10 w-10 text-stone-700 hover:text-stone-600 cursor-pointer"
        onClick={() => navigate(`/budget/edit/${budgetId}`)}
      />
      <Tablefy header={`${budgetFromParam?.budgetName ?? ""}`}>
        {allBTE
          .filter(
            (bte: BudgetTransactionEvent) => bte.budgetId === Number(budgetId)
          )
          .map((bte: BudgetTransactionEvent) => {
            const transactionEvent = allTransactionEvents.find(
              (t: TransactionEvent) => t.id === bte.transactionEventId
            );

            return transactionEvent ? (
              <div
                key={bte.id}
                onClick={() =>
                  navigate(`/transaction/edit/${transactionEvent.id}`)
                }
              >
                <div
                  className="grid grid-cols-3 hover:bg-stone-300 cursor-pointer"
                  key={transactionEvent.id}
                >
                  <p className="p-3">${transactionEvent.amt}</p>
                  <p className="p-3">{transactionEvent.transactionName}</p>
                  <p className="p-3">
                    {dateUtils.convertToStandardString(
                      new Date(transactionEvent.transactionDate)
                    )}
                  </p>
                </div>
              </div>
            ) : null;
          })}
      </Tablefy>
      <p className="mt-5 font-semibold text-2xl">
        Total:{" $"}
        {allBTE
          .filter(
            (bte: BudgetTransactionEvent) => bte.budgetId === Number(budgetId)
          )
          .map((bte: BudgetTransactionEvent) => {
            const transactionEvent = allTransactionEvents.find(
              (t: TransactionEvent) => t.id === bte.transactionEventId
            );

            return transactionEvent ? transactionEvent.amt : 0;
          })
          .reduce((sum: number, price: number) => sum + price, 0)}
      </p>
    </Cardify>
  );
};
