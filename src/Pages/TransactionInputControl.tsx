import { useState } from "react";
import {
  GTextInputController,
  useGTextInput,
} from "../Components/Generics/Controls/gTextInputControl";
import { Budget } from "../Data/Budget";
import toast from "react-hot-toast";

export interface TransactionInputController {
  nameControl: GTextInputController;
  dateControl: GTextInputController;
  amountControl: GTextInputController;
  budgets: Budget[];
  setBudgets: (b: Budget[]) => void;
  submit: () => void;
}

export const useTransactionInput = () => {
  const defaultFieldFunction = (s: string) =>
    s === "" ? "Field is required" : "";

  const nameControl = useGTextInput("", defaultFieldFunction);
  const dateControl = useGTextInput("", defaultFieldFunction);
  const amountControl = useGTextInput("", defaultFieldFunction);
  const [budgets, setBudgets] = useState<Budget[]>([]);

  const submit = () => {
    if (!validateFields()) {
      toast.error("Please fill out all fields");
      return;
    }

    budgets.forEach((b) => {
      console.log(b);
    });

    toast.success("Success!");
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
