import GTextInput from "../Components/Generics/gTextInput";
import { XMarkIcon } from "@heroicons/react/20/solid";
import { useTransactionInput } from "./Control/TransactionInputControl";
import { Spinner } from "../Components/Layout/Spinnex";
import GNumberInput from "../Components/Generics/gMoneyInput";
import GDateInput from "../Components/Generics/gDateInput";
import { Cardify } from "../Components/Layout/Cardify";
import GSelectInput from "../Components/Generics/gSelectInput";
import { useAllBudgetForCurrentCustomer } from "../Functions/TanStack/BudgetQueries";
import { Link } from "react-router-dom";

export const TransactionInput = () => {
  const { data: budgets, isLoading } = useAllBudgetForCurrentCustomer();

  const control = useTransactionInput();

  if (isLoading) {
    return <Spinner />;
  }

  if (!budgets || budgets.length === 0) {
    return (
      <Cardify>
        <p className="text-3xl text-center text-slate-600 pb-20">
          Oops! You don't have any budgets set up yet.
        </p>
        <div className="flex items-center justify-center text-center">
          <div className="h-1/2 w-1/2 lg:inline hidden"></div>
          <Link
            to={"/budget/input"}
            className="bg-christi-500 hover:bg-christi-600 text-stone-100 rounded-lg text-center text-md lg:text-xl lg:font-bold font-bold mx-5 p-3 lg:ms-20 lg:p-4 lg:px-10"
          >
            Let's fix that!
          </Link>
        </div>
      </Cardify>
    );
  }

  return (
    <Cardify>
      <div className="flex flex-col">
        <div className="flex flex-row space-x-5">
          <GNumberInput
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
  );
};
