import { useState } from "react";
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

export interface TransactionInputController {
  nameControl: GTextInputController;
  dateControl: GDateInputController;
  amountControl: GMoneyInputControl;
  budgets: Budget[];
  setBudgets: (b: Budget[]) => void;
  submit: () => void;
}

export const useTransactionInput = () => {
  const defaultFieldFunction = (s: string) =>
    s === "" ? "Field is required" : "";

  const nameControl = useGTextInput("", defaultFieldFunction);
  const dateControl = useGDateInput("", defaultFieldFunction);
  const amountControl = useGMoneyInput(1, (n: number) =>
    n <= 0 ? "Amount must be greater than zero" : ""
  );
  const [budgets, setBudgets] = useState<Budget[]>([]);
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
      customerId: 1,
    };

    addTransactionMutation.mutate({
      transaction: transaction,
      budgets: budgets,
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
      budgets.length == 0
    );
  };

  return {
    nameControl,
    dateControl,
    amountControl,
    budgets,
    setBudgets,
    submit,
  };
};
