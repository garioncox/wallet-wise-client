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
import { TransactionEvent } from "../../Data/TransactionEvent";
import { BudgetTransactionEvent } from "../../Data/BudgetTransactionEvent";

export const useAllCustomerTE = () => {
  const { data: user, isLoading } = useCustomer();

  return useQuery({
    queryKey: queryKeys.tes,
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
      await Promise.all(
        budgets.map(async (b) => {
          const bte: BudgetTransactionEventDTO = {
            transactionEventId: eventId,
            budgetId: b.id,
          };
          await addBTE(bte);
        })
      );
      return { eventId, budgets };
    },

    onMutate: async ({
      transaction,
      budgets,
    }: {
      transaction: TransactionEventDTO;
      budgets: Budget[];
    }) => {
      // Capture the previous state before mutation
      const previousTEs = queryClient.getQueryData([queryKeys.tes]) || [];
      const previousBTEs =
        (queryClient.getQueryData([queryKeys.btes]) as
          | BudgetTransactionEvent[]
          | undefined) || [];

      const optimisticTransactionId: number = Date.now();

      // Optimistically update the transaction event
      const optimisticTE: TransactionEvent = {
        id: optimisticTransactionId,
        transactionName: transaction.transactionName,
        amt: transaction.amt,
        transactionDate: transaction.transactionDate,
        customerId: transaction.customerId,
      };
      queryClient.setQueryData(
        queryKeys.tes,
        (old: TransactionEvent[] | undefined) => [...(old || []), optimisticTE]
      );

      // Optimistically update the budget transaction events without clearing the cache
      queryClient.setQueryData([queryKeys.btes], () => {
        const newBTEs = budgets.map((budget) => ({
          id: null,
          transactionEventId: optimisticTransactionId,
          budgetId: budget.id,
        }));

        return [...previousBTEs, ...newBTEs];
      });

      // Return the previous state so we can revert in case of error
      return { previousTEs, previousBTEs, optimisticTransactionId, budgets };
    },

    onError: (context?: {
      previousTEs: TransactionEvent[] | undefined;
      previousBTEs: BudgetTransactionEvent[] | undefined;
    }) => {
      if (context) {
        queryClient.setQueryData(queryKeys.tes, context.previousTEs);
        queryClient.setQueryData(queryKeys.btes, context.previousBTEs);
      }
      toast.error("Error adding transaction");
    },

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.tes });
      queryClient.invalidateQueries({ queryKey: [queryKeys.btes] });
      toast.success(`Successfully added transaction`);
    },
  });
};
