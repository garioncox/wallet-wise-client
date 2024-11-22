import axios from "axios";
import { BudgetTransactionEventDTO } from "../../Data/DTO/BudgetTransactionEventDTO";

export const addBudgetTransactionEvent = async (
  bte: BudgetTransactionEventDTO
) => {
  await axios.post(`/api/BudgetTransactionEvent/add`, bte);
};

export const getAllBudgetTransactionEventsForCustomer = async (customerId: number) => {
  await axios.get(`/api/BudgetTransactionEvent/getAll/${customerId}`);
};
