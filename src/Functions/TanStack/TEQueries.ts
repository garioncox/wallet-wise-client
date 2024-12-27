import { useMutation, useQuery } from "@tanstack/react-query";
import { addTE, getAllTEByEmail } from "../Axios/TransactionHttp";
import { queryKeys } from "./KeyFactory";
import { Budget } from "../../Data/Budget";
import { addBTE } from "../Axios/BudgetTransactionHttp";
import { queryClient } from "./QueryClient";
import toast from "react-hot-toast";
import { TransactionEventDTO } from "../../Data/DTO/TransactionEventDTO";
import { BudgetTransactionEventDTO } from "../../Data/DTO/BudgetTransactionEventDTO";
import { useCustomer } from "./CustomerQueries";

export const useAllCustomerTE = () => {
  const { data: user, isLoading } = useCustomer();

  return useQuery({
    queryKey: queryKeys.transactions,
    queryFn: () => {
      return getAllTEByEmail(user!.email);
    },
    enabled: !!(user && !isLoading),
  });
};

export const useAddTEMutation = () => {
  return useMutation({
    mutationFn: async ({
      transaction,
      budgets,
    }: {
      transaction: TransactionEventDTO;
      budgets: Budget[];
    }) => {
      const eventId = await addTE(transaction);
      budgets.forEach(async (b) => {
        const bte: BudgetTransactionEventDTO = {
          transactionEventId: eventId,
          budgetId: b.id,
        };
        await addBTE(bte);
      });
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.transactions });
      queryClient.invalidateQueries({ queryKey: queryKeys.budgetTransactions });
    },
    onSuccess: () => {
      toast.success("Successfully added transaction");
    },
    onError: () => toast.error("Error adding transaction"),
  });
};
