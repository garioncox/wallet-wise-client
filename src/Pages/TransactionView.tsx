import { Link } from "react-router-dom";
import { Cardify } from "../Components/Layout/Cardify";
import { Spinner } from "../Components/Layout/Spinnex";
import { TransactionEvent } from "../Data/TransactionEvent";
import { useDateUtils } from "../Functions/DateUtils";
import { useAllTransactionEventsForCurrentCustomer } from "../Functions/TanStack/TransactionQueries";
import { useAllBudgetForCurrentCustomer } from "../Functions/TanStack/BudgetQueries";
import { useAllBudgetTransactionsForCurrentCustomer } from "../Functions/TanStack/BudgetTransactionQueries";
import { BudgetTransactionEvent } from "../Data/BudgetTransactionEvent";
import { Budget } from "../Data/Budget";

export const TransactionView = () => {
  const { data: transactionEvents, isLoading: isTransactionsLoading } =
    useAllTransactionEventsForCurrentCustomer();
  const {
    data: budgetTransactionEvents,
    isLoading: isBudgetTransactionsLoading,
  } = useAllBudgetTransactionsForCurrentCustomer();
  const { data: budgets, isLoading: isBudgetsLoading } =
    useAllBudgetForCurrentCustomer();
  const dateUtils = useDateUtils();

  if (
    isTransactionsLoading ||
    isBudgetsLoading ||
    isBudgetTransactionsLoading
  ) {
    return <Spinner />;
  }

  if (!transactionEvents || transactionEvents.length == 0) {
    return (
      <Cardify>
        <p className="text-3xl text-center text-slate-600 pb-20">
          Looks like you don't have any transaction history...
        </p>
        <div className="flex content-center align-middle justify-center grow text-center">
          <p className="text-xl lg:text-2xl flex self-center">
            Log some entries!
          </p>
          <Link
            to={"/transaction/input"}
            className="bg-christi-500 hover:bg-christi-600 text-stone-100 rounded-lg text-center text-md lg:text-xl lg:font-bold font-bold mx-5 p-3 lg:ms-20 lg:p-4 lg:px-10"
          >
            Show me
          </Link>
        </div>
      </Cardify>
    );
  }

  return (
    <Cardify>
      <div className="flex flex-col grow justify-items-stretch divide-y divide-slate-400">
        <p className="mb-3 text-center font-bold text-xl">
          Transactions for "Name"
        </p>
        {transactionEvents.map((t: TransactionEvent) => {
          return (
            <div className="grid grid-cols-4" key={t.id}>
              <p className="p-3">${t.amt}</p>
              <p className="p-3">{t.transactionName}</p>
              <p className="p-3">
                {dateUtils.convertToStandardString(new Date(t.transactionDate))}
              </p>

              <div className="overflow-x-auto flex flex-row">
                {budgetTransactionEvents
                  .filter(
                    (bte: BudgetTransactionEvent) =>
                      bte.transactionEventId === t.id
                  )
                  .map((bte: BudgetTransactionEvent) => {
                    return (
                      <div
                        key={bte.id}
                        className="m-3 px-2 mx-1 bg-stone-50 items-center border rounded-full border-stone-500 flex flex-row text-nowrap align-middle justify-center"
                      >
                        {budgets
                          .filter(
                            (budget: Budget) => budget.id === bte.budgetId
                          )
                          .map((budget: Budget) => (
                            <span key={budget.id}>{budget.budgetName}</span>
                          ))}
                      </div>
                    );
                  })}
              </div>
            </div>
          );
        })}
      </div>
    </Cardify>
  );
};
