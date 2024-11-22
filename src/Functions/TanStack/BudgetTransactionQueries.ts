import { useQuery } from "@tanstack/react-query";
import { getAllBudgetTransactionEventsForCustomer } from "../Axios/BudgetTransactionHttp";
import { useCurrentCustomer } from "./CustomerQueries";
import { queryKeys } from "./KeyFactory";

export const useAllBudgetTransactionsForCurrentCustomer = () => {
  const { data: customer, isLoading } = useCurrentCustomer();

  return useQuery({
    queryKey: [queryKeys.budgetTransactions],
    queryFn: async () => {
      return await getAllBudgetTransactionEventsForCustomer(customer.id);
    },
    enabled: !!(customer && !isLoading),
  });
};
