import { useNavigate, useParams } from "react-router-dom";
import { useGTextInput } from "../Components/Generics/Controls/gTextInputControl";
import GTextInput from "../Components/Generics/gTextInput";
import { Cardify } from "../Components/Layout/Cardify";
import { Spinner } from "../Components/Layout/Spinner";
import { Budget } from "../Data/Budget";
import { BudgetDTO } from "../Data/DTO/BudgetDTO";
import {
  useAllCustomerBudgets,
  useEditBudgetMutation,
} from "../Functions/TanStack/BudgetQueries";
import { useCustomer } from "../Functions/TanStack/CustomerQueries";
import { useEffect } from "react";

export const BudgetEdit = () => {
  const { budgetId } = useParams();
  const navigate = useNavigate();
  const editBudgetMutation = useEditBudgetMutation();

  const { data: customer, isLoading: isCustomerLoading } = useCustomer();
  const { data: allBudgets, isLoading: isBudgetsLoading } =
    useAllCustomerBudgets();

  const budgetFromParam: Budget | undefined = allBudgets
    ? allBudgets.find((b: Budget) => b.id === Number(budgetId))
    : undefined;
  const nameControl = useGTextInput(
    budgetFromParam?.budgetName ?? "",
    (s: string) => (s === "" ? "Field is required" : "")
  );

  useEffect(() => {
    if (budgetFromParam && budgetFromParam.budgetName) {
      nameControl.setValue(budgetFromParam.budgetName);
    }
  }, [budgetFromParam]);

  const submit = () => {
    if (!budgetFromParam) {
      return;
    }

    const dto: BudgetDTO = {
      id: budgetFromParam.id,
      budgetName: nameControl.value,
      customerId: customer.id,
    };

    editBudgetMutation.mutate(dto);
    navigate("/");
  };

  if (isBudgetsLoading || isCustomerLoading) {
    return (
      <Cardify>
        <Spinner />
      </Cardify>
    );
  }

  return (
    <Cardify>
      <div className="flex flex-col grow">
        <GTextInput control={nameControl} label="Update Budget Name" />
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

export default BudgetEdit;
