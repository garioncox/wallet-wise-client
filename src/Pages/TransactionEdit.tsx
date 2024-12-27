import { XMarkIcon } from "@heroicons/react/20/solid";
import { useParams } from "react-router-dom";
import GDateInput from "../Components/Generics/gDateInput";
import GSelectInput from "../Components/Generics/gSelectInput";
import GTextInput from "../Components/Generics/gTextInput";
import { Cardify } from "../Components/Layout/Cardify";
import { Spinner } from "../Components/Layout/Spinner";
import { useAllCustomerBudgets } from "../Functions/TanStack/BudgetQueries";
import GMoneyInput from "../Components/Generics/gMoneyInput";
import { useTransactionInput } from "./Control/TransactionInputControl";
import { Budget } from "../Data/Budget";
import { useAllCustomerTE } from "../Functions/TanStack/TEQueries";
import { TransactionEvent } from "../Data/TransactionEvent";
import { useEffect } from "react";
import { useAllCustomerBTE } from "../Functions/TanStack/BTEQueries";
import { BudgetTransactionEvent } from "../Data/BudgetTransactionEvent";

export const TransactionEdit = () => {
  const { transactionId } = useParams();
  const control = useTransactionInput();

  const { data: transactions, isLoading: isTransactionsLoading } =
    useAllCustomerTE();
  const transactionFromParam: TransactionEvent | undefined = transactions
    ? transactions.find((t: TransactionEvent) => t.id === Number(transactionId))
    : undefined;

  const { data: budgets, isLoading: isBudgetsLoading } =
    useAllCustomerBudgets();

  const { data: btes, isLoading: isBtesLoading } = useAllCustomerBTE();

  useEffect(() => {
    if (transactionFromParam) {
      control.amountControl.setValue(transactionFromParam.amt);
      control.dateControl.setValue(transactionFromParam.transactionDate);
      control.nameControl.setValue(transactionFromParam.transactionName);
    }
  }, [transactionFromParam]);

  useEffect(() => {
    if (btes && budgets) {
      const budgetIds = btes
        .filter(
          (bte: BudgetTransactionEvent) =>
            bte.transactionEventId === Number(transactionId)
        )
        .map((bte: BudgetTransactionEvent) => {
          return bte.budgetId;
        });

      const b = budgets.filter((b: Budget) => {
        budgetIds.includes(b.id);
      });
    }
  }, [btes, transactionId, budgets]);
  // TODO: Not getting all the budgets correctly for a transaction.
  // Consider getting it from TransactionHistory?

  if (isBtesLoading || isTransactionsLoading || isBudgetsLoading) {
    return <Spinner />;
  }

  return (
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
          Update Transaction
        </button>
      </div>
    </Cardify>
  );
};
