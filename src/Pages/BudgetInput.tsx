import { useGTextInput } from "../Components/Generics/Controls/gTextInputControl";
import GTextInput from "../Components/Generics/gTextInput";
import { Cardify } from "../Components/Layout/Cardify";
import { Spinner } from "../Components/Layout/Spinnex";
import { BudgetDTO } from "../Data/DTO/BudgetDTO";
import {
  useAddBudgetMutation,
  useAllBudgets,
} from "../Functions/TanStack/BudgetQueries";
import { useCurrentCustomer } from "../Functions/TanStack/CustomerQueries";

export const BudgetInput = () => {
  const { isLoading } = useAllBudgets();
  const { data: customer, isLoading: isCustomerLoading } = useCurrentCustomer();
  const addBudgetMutation = useAddBudgetMutation();
  const nameControl = useGTextInput("", (s: string) =>
    s === "" ? "Field is required" : ""
  );

  const submit = () => {
    const dto: BudgetDTO = {
      budgetName: nameControl.value,
      customerId: customer.id,
    };

    addBudgetMutation.mutate(dto);
  };

  if (isLoading || isCustomerLoading) {
    return (
      <Cardify>
        <Spinner />
      </Cardify>
    );
  }

  return (
    <Cardify>
      <div className="flex flex-col grow">
        <GTextInput control={nameControl} label="Budget Name" />
        <button
          onClick={submit}
          className="bg-christi-500 p-2 mt-5 rounded-lg text-stone-100 font-bold hover:bg-christi-600"
        >
          Submit
        </button>
      </div>
    </Cardify>
  );
};

export default BudgetInput;
