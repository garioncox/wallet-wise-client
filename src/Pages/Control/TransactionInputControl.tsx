import {
  GTextInputController,
  useGTextInput,
} from "../../Components/Generics/Controls/gTextInputControl";
import { Budget } from "../../Data/Budget";
import toast from "react-hot-toast";
import { useAddTransactionMutation } from "../../Functions/TanStack/TransactionQueries";
import { TransactionEventDTO } from "../../Data/DTO/TransactionEventDTO";
import {
  GMoneyInputControl,
  useGMoneyInput,
} from "../../Components/Generics/Controls/gMoneyInputControl";
import {
  GDateInputController,
  useGDateInput,
} from "../../Components/Generics/Controls/gDateInputControl";
import { useAllBudgetForCurrentCustomer } from "../../Functions/TanStack/BudgetQueries";
import { useGSelectInput } from "../../Components/Generics/Controls/gSelectInputControl";
import { useCurrentCustomer } from "../../Functions/TanStack/CustomerQueries";

export interface TransactionInputController {
  nameControl: GTextInputController;
  dateControl: GDateInputController;
  amountControl: GMoneyInputControl;
  budgets: Budget[];
  setBudgets: (b: Budget[]) => void;
  submit: () => void;
}

export const useTransactionInput = () => {
  const { data: allBudgets } = useAllBudgetForCurrentCustomer();
  const { data: user } = useCurrentCustomer();

  const defaultFieldFunction = (s: string) =>
    s === "" ? "Field is required" : "";

  const nameControl = useGTextInput("", defaultFieldFunction);
  const dateControl = useGDateInput("", defaultFieldFunction);
  const amountControl = useGMoneyInput(1, (n: number) =>
    n <= 0 ? "Amount must be greater than zero" : ""
  );
  const selectControl = useGSelectInput(
    allBudgets ? allBudgets.map((b: Budget) => b.budgetName) : [],
    () => ""
  );
  const addTransactionMutation = useAddTransactionMutation();

  const submit = () => {
    if (!validateFields()) {
      toast.error("Please fill out all fields");
      return;
    }

    const date = new Date(dateControl.value);

    const transaction: TransactionEventDTO = {
      transactionName: nameControl.value,
      amt: Number(amountControl.value),
      transactionDate: date.toISOString().split("T")[0],
      customerId: user.id,
    };

    addTransactionMutation.mutate({
      transaction: transaction,
      budgets: allBudgets.filter((b: Budget) =>
        selectControl.selectedValues.includes(b.budgetName)
      ),
    });
  };

  const validateFields = () => {
    nameControl.setHasBeenTouched(true);
    dateControl.setHasBeenTouched(true);
    amountControl.setHasBeenTouched(true);

    return !(
      nameControl.error ||
      dateControl.error ||
      amountControl.error ||
      selectControl.selectedValues.length == 0
    );
  };

  return {
    nameControl,
    dateControl,
    amountControl,
    selectControl,
    submit,
  };
};
