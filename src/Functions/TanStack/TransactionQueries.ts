import { useMutation, useQuery } from "@tanstack/react-query";
import { addTransactionEvent, getAllTransactionEvents } from "../Axios/TransactionHttp";
import { queryKeys } from "./KeyFactory";
import { TransactionEvent } from "../../Data/TransactionEvent";
import { Budget } from "../../Data/Budget";
import { BudgetTransactionEvent } from "../../Data/BudgetTransactionEvent";
import { addBudgetTransactionEvent } from "../Axios/BudgetTransactionHttp";
import { queryClient } from "./QueryClient";
import toast from "react-hot-toast";

export const useAllTransactionEvents = () => {
  return useQuery({
    queryKey: queryKeys.transactions,
    queryFn: getAllTransactionEvents,
  });
};

export const useAddTransactionMutation = () => {
  return useMutation({
    mutationFn: async ({
      transaction,
      budgets,
    }: {
      transaction: TransactionEvent;
      budgets: Budget[];
    }) => {
      const eventId = await addTransactionEvent(transaction);
      budgets.forEach(async (b) => {
        const bte: BudgetTransactionEvent = {
          id: null,
          TransactionEventId: eventId,
          BudgetId: b.id,
        };
        await addBudgetTransactionEvent(bte);
      });

      queryClient.invalidateQueries({queryKey: queryKeys.transactions})
      queryClient.invalidateQueries({queryKey: queryKeys.budgetTransactions})

      toast.success("Successfully added transaction");
    },
    onError: () => toast.error("Error adding transaction")
  });
};
