import {
  GTextInputController,
  useGTextInput,
} from "../../Components/Generics/Controls/gTextInputControl";
import { Budget } from "../../Data/Budget";
import toast from "react-hot-toast";
import { useAddTEMutation } from "../../Functions/TanStack/TEQueries";
import { TransactionEventDTO } from "../../Data/DTO/TransactionEventDTO";
import {
  GMoneyInputControl,
  useGMoneyInput,
} from "../../Components/Generics/Controls/gMoneyInputControl";
import {
  GDateInputController,
  useGDateInput,
} from "../../Components/Generics/Controls/gDateInputControl";
import { useAllCustomerBudgets } from "../../Functions/TanStack/BudgetQueries";
import { useGSelectInput } from "../../Components/Generics/Controls/gSelectInputControl";
import { useCustomer } from "../../Functions/TanStack/CustomerQueries";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export interface TransactionInputController {
  nameControl: GTextInputController;
  dateControl: GDateInputController;
  amountControl: GMoneyInputControl;
  budgets: Budget[];
  setBudgets: (b: Budget[]) => void;
  submit: () => void;
}

export const useTransactionInput = () => {
  const navigate = useNavigate();
  const { data: allBudgets, isLoading } = useAllCustomerBudgets();
  const { data: user } = useCustomer();
  const addTransactionMutation = useAddTEMutation();

  const defaultFieldFunction = (s: string) =>
    s === "" ? "Field is required" : "";

  const nameControl = useGTextInput("", defaultFieldFunction);
  const dateControl = useGDateInput("", defaultFieldFunction);
  const amountControl = useGMoneyInput(1, (n: number) =>
    n <= 0 ? "Amount must be greater than zero" : ""
  );

  const selectControl = useGSelectInput([], () => "");

  useEffect(() => {
    if (!isLoading && allBudgets) {
      const budgetNames = allBudgets.map((b: Budget) => b.budgetName);
      selectControl.setPossibleValues(budgetNames);
    }
  }, [allBudgets, isLoading]);

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

    navigate("/");
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
