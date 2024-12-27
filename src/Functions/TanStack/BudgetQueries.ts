import { useMutation, useQuery } from "@tanstack/react-query";
import {
  addBudget,
  editBudget,
  getAllBudgets,
  getAllBudgetsAuth,
  getBudgetByCustomerId,
} from "../Axios/BudgetHttp";
import { useAuth } from "react-oidc-context";
import toast from "react-hot-toast";
import { queryKeys } from "./KeyFactory";
import { queryClient } from "./QueryClient";
import { BudgetDTO } from "../../Data/DTO/BudgetDTO";
import { useCustomer } from "./CustomerQueries";

export const useAllBudgets = () => {
  return useQuery({
    queryKey: [queryKeys.budgets],
    queryFn: getAllBudgets,
  });
};

export const useAllBudgetsAuth = () => {
  const auth = useAuth();

  return useQuery({
    queryKey: [queryKeys.budgets],
    queryFn: () => getAllBudgetsAuth(auth.user?.id_token ?? ""),
    enabled: !!auth.user!.id_token,
  });
};

export const useAllCustomerBudgets = () => {
  const { data: customer, isLoading } = useCustomer();

  return useQuery({
    queryKey: [queryKeys.budgets],
    queryFn: async () => await getBudgetByCustomerId(customer.id),
    enabled: !!(customer && !isLoading),
  });
};

export const useAddBudgetMutation = () => {
  return useMutation({
    mutationFn: async (budget: BudgetDTO) => {
      await addBudget(budget);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.budgets });
      toast.success("Successfully added Budget");
    },
    onError: () => toast.error("Error adding budget"),
    mutationKey: queryKeys.addBudget,
  });
};

export const useEditBudgetMutation = () => {
  return useMutation({
    mutationFn: async (budget: BudgetDTO) => {
      await editBudget(budget);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.budgets });
      toast.success("Successfully edited Budget");
    },
    onError: () => toast.error("Error editing budget"),
  });
};
