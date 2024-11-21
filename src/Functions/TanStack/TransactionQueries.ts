import { useMutation, useQuery } from "@tanstack/react-query";
import {
  addTransactionEvent,
  getAllTransactionEvents,
  getAllTransactionEventsByEmail,
} from "../Axios/TransactionHttp";
import { queryKeys } from "./KeyFactory";
import { Budget } from "../../Data/Budget";
import { addBudgetTransactionEvent } from "../Axios/BudgetTransactionHttp";
import { queryClient } from "./QueryClient";
import toast from "react-hot-toast";
import { TransactionEventDTO } from "../../Data/DTO/TransactionEventDTO";
import { BudgetTransactionEventDTO } from "../../Data/DTO/BudgetTransactionEventDTO";
import { useCurrentCustomer } from "./CustomerQueries";

export const useAllTransactionEvents = () => {
  return useQuery({
    queryKey: queryKeys.transactions,
    queryFn: getAllTransactionEvents,
  });
};

export const useAllTransactionEventsForCurrentCustomer = () => {
  const { data: user, isLoading } = useCurrentCustomer();

  return useQuery({
    queryKey: queryKeys.transactions,
    queryFn: () => {
      return getAllTransactionEventsByEmail(user!.email);
    },
    enabled: !!(user && !isLoading),
  });
};

export const useAddTransactionMutation = () => {
  return useMutation({
    mutationFn: async ({
      transaction,
      budgets,
    }: {
      transaction: TransactionEventDTO;
      budgets: Budget[];
    }) => {
      const eventId = await addTransactionEvent(transaction);
      budgets.forEach(async (b) => {
        const bte: BudgetTransactionEventDTO = {
          transactionEventId: eventId,
          budgetId: b.id,
        };
        await addBudgetTransactionEvent(bte);
      });

      queryClient.invalidateQueries({ queryKey: queryKeys.transactions });
      queryClient.invalidateQueries({ queryKey: queryKeys.budgetTransactions });

      toast.success("Successfully added transaction");
    },
    onError: () => toast.error("Error adding transaction"),
  });
};
