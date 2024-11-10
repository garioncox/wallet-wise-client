import { useQuery } from "@tanstack/react-query";
import { getAllBudgets } from "../Axios/BudgetHttp";

export const useAllBudgets = () => {
  return useQuery({
    queryKey: ["budgets"],
    queryFn: getAllBudgets,
  });
};
