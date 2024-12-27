import { useNavigate, Link } from "react-router-dom";
import { Cardify } from "../Components/Layout/Cardify";
import { Spinner } from "../Components/Layout/Spinner";
import { Tablefy } from "../Components/Layout/Tablefy";
import { Budget } from "../Data/Budget";
import { BudgetTransactionEvent } from "../Data/BudgetTransactionEvent";
import { TransactionEvent } from "../Data/TransactionEvent";
import { useDateUtils } from "../Functions/DateUtils";
import { useAllCustomerBudgets } from "../Functions/TanStack/BudgetQueries";
import { useAllCustomerBTE } from "../Functions/TanStack/BTEQueries";
import { useCustomer } from "../Functions/TanStack/CustomerQueries";
import { useAllCustomerTE } from "../Functions/TanStack/TEQueries";
import { XMarkIcon } from "@heroicons/react/20/solid";
import GDateInput from "../Components/Generics/gDateInput";
import GMoneyInput from "../Components/Generics/gMoneyInput";
import GSelectInput from "../Components/Generics/gSelectInput";
import GTextInput from "../Components/Generics/gTextInput";
import { useTransactionInput } from "./Control/TransactionInputControl";

export const Test = () => {
  const {
    data: transactionEvents,
    isLoading: isTransactionsLoading,
    isError: isTransactionsError,
  } = useAllCustomerTE();
  const {
    data: budgetTransactionEvents,
    isLoading: isBudgetTransactionsLoading,
  } = useAllCustomerBTE();
  const {
    data: budgets,
    isLoading: isBudgetsLoading,
    isError: isBudgetsError,
  } = useAllCustomerBudgets();
  const dateUtils = useDateUtils();
  const navigate = useNavigate();
  const {
    data: user,
    isLoading: isCustomerLoading,
    isError: isCustomerError,
  } = useCustomer();
  const control = useTransactionInput();

  if (
    isTransactionsLoading ||
    isBudgetsLoading ||
    isBudgetTransactionsLoading ||
    isCustomerLoading
  ) {
    return <Spinner />;
  }

  if (isTransactionsError || isBudgetsError || isCustomerError) {
    return <>Error</>;
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
    <div>
      <Cardify>
        <div className="flex flex-col">
          <div className="flex flex-row space-x-5">
            <GMoneyInput
              label="Amount"
              control={control.amountControl}
              minimum={1}
              maximum={1000000}
            />
            <GTextInput label="Name" control={control.nameControl} />
          </div>

          <div className="flex grow flex-row space-x-5 items-center">
            <GDateInput label="Date" control={control.dateControl} />
            <GSelectInput
              control={control.selectControl}
              label={"Budget Types"}
            />
          </div>
          <div className="flex grow pt-3">
            {control.selectControl.selectedValues.map((s: string) => (
              <div
                key={s}
                className="px-3 mx-1 bg-stone-50 items-center hover:bg-stone-200 cursor-pointer border rounded-full border-stone-500 flex flex-row flex-wrap align-middle justify-center"
                onClick={() =>
                  control.selectControl.setSelectedValues([
                    ...control.selectControl.selectedValues.filter(
                      (sv: string) => s != sv
                    ),
                  ])
                }
              >
                {s}
                <XMarkIcon className="h-4 w-auto" />
              </div>
            ))}
          </div>
          <button
            onClick={control.submit}
            className="bg-christi-500 p-2 mt-5 rounded-lg text-stone-100 font-bold hover:bg-christi-600"
          >
            Submit
          </button>
        </div>
      </Cardify>

      <Cardify>
        <Tablefy
          header={`Transactions for ${
            user.given_name ? user.given_name : user.email
          }`}
        >
          {transactionEvents.map((t: TransactionEvent) => {
            return (
              <div
                className="grid grid-cols-4 hover:bg-stone-300 cursor-pointer"
                key={t.id}
                onClick={() => navigate(`/transaction/edit/${t.id}`)}
              >
                <p className="p-3">${t.amt}</p>
                <p className="p-3 order-2 lg:order-1">{t.transactionName}</p>
                <p className="p-3 order-1 lg:order-2">
                  {dateUtils.convertToStandardString(
                    new Date(t.transactionDate)
                  )}
                </p>

                <div className="overflow-x-auto flex flex-row order-3">
                  {budgetTransactionEvents
                    .filter(
                      (bte: BudgetTransactionEvent) =>
                        bte.transactionEventId === t.id
                    )
                    .map((bte: BudgetTransactionEvent) => {
                      return (
                        <div
                          key={bte.id}
                          className="m-3 px-2 mx-1 bg-stone-50 items-center border rounded-full border-stone-500 flex flex-row text-nowrap align-middle justify-center cursor-pointer hover:bg-stone-200 hover:border-2 hover:border-blue-500"
                          onClick={(e) => {
                            e.stopPropagation();
                            navigate(`/budget/stats/${bte.budgetId}`);
                          }}
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
        </Tablefy>
      </Cardify>
    </div>
  );
};
