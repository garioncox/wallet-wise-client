import { useQuery } from "@tanstack/react-query";
import {
  getAllBudgets,
  getAllBudgetsAuth,
  getBudgetByCustomerId,
} from "../Axios/BudgetHttp";
import { useAuth } from "react-oidc-context";

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
