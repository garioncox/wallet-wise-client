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

    onMutate: async ({ transaction, budgets }) => {
      await queryClient.cancelQueries({ queryKey: queryKeys.tes });
      await queryClient.cancelQueries({ queryKey: queryKeys.btes });

      // Capture the previous state
      const previousTEs = queryClient.getQueryData(queryKeys.tes);
      const previousBTEs = queryClient.getQueryData(queryKeys.btes);

      const optimisticTransactionId = `optimistic-${Date.now()}`;

      // Optimistically update the transaction event and associated budgets
      queryClient.setQueryData(
        queryKeys.tes,
        (old: TransactionEvent[] | undefined) => [
          ...(old || []),
          {
            ...transaction,
            id: optimisticTransactionId,
          },
        ]
      );

      // Optimistically update the budget transaction events in parallel
      budgets.forEach((budget) => {
        queryClient.setQueryData(
          queryKeys.btes,
          (old: BudgetTransactionEventDTO[] | undefined) => [
            ...(old || []),
            {
              transactionEventId: optimisticTransactionId,
              budgetId: budget.id,
            },
          ]
        );
      });

      return { previousTEs, previousBTEs, optimisticTransactionId, budgets };
    },

    onError: (context?: {
      previousTEs: TransactionEventDTO[] | undefined;
      previousBTEs: BudgetTransactionEventDTO[] | undefined;
    }) => {
      if (context) {
        queryClient.setQueryData(queryKeys.tes, context.previousTEs);
        queryClient.setQueryData(queryKeys.btes, context.previousBTEs);
      }
      toast.error("Error adding transaction");
    },

    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.tes });
      queryClient.invalidateQueries({ queryKey: queryKeys.btes });
    },

    onSuccess: () => {
      toast.success(`Successfully added transaction`);
    },
  });
};
