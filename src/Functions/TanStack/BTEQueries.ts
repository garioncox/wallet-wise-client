import { useQuery } from "@tanstack/react-query";
import { getAllCustomerBTE } from "../Axios/BudgetTransactionHttp";
import { useCustomer } from "./CustomerQueries";
import { queryKeys } from "./KeyFactory";

export const useAllCustomerBTE = () => {
  const { data: customer, isLoading } = useCustomer();

  return useQuery({
    queryKey: [queryKeys.budgetTransactions],
    queryFn: async () => {
      return await getAllCustomerBTE(customer.id);
    },
    enabled: !!(customer && !isLoading),
  });
};
