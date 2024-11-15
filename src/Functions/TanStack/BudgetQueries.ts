import { useQuery } from "@tanstack/react-query";
import { getAllBudgets, getBudgetByCustomerId } from "../Axios/BudgetHttp";

export const useAllBudgets = () => {
  return useQuery({
    queryKey: ["budgets"],
    queryFn: getAllBudgets,
  });
};

export const useAllBudgetsForCustomer = (customerId: number) => {
  return useQuery({
    queryKey: ["budgets"],
    queryFn: () => getBudgetByCustomerId(customerId),
  });
};
