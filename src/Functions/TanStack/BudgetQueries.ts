import { useMutation, useQuery } from "@tanstack/react-query";
import {
  addBudget,
  getAllBudgets,
  getAllBudgetsAuth,
  getBudgetByCustomerId,
} from "../Axios/BudgetHttp";
import { useAuth } from "react-oidc-context";
import toast from "react-hot-toast";
import { queryKeys } from "./KeyFactory";
import { queryClient } from "./QueryClient";
import { BudgetDTO } from "../../Data/DTO/BudgetDTO";

export const useAllBudgets = () => {
  return useQuery({
    queryKey: ["budgets"],
    queryFn: getAllBudgets,
  });
};

export const useAllBudgetsAuth = () => {
  const auth = useAuth();

  return useQuery({
    queryKey: ["budgets"],
    queryFn: () => getAllBudgetsAuth(auth.user?.id_token ?? ""),
    enabled: !!auth.user!.id_token,
  });
};

export const useAllBudgetsForCustomer = (customerId: number) => {
  return useQuery({
    queryKey: ["budgets"],
    queryFn: () => getBudgetByCustomerId(customerId),
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
    onError: () => toast.error("Error adding transaction"),
  });
};
