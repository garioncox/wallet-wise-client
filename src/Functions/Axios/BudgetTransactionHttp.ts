import axios from "axios";
import { BudgetTransactionEventDTO } from "../../Data/DTO/BudgetTransactionEventDTO";

export const addBTE = async (bte: BudgetTransactionEventDTO) => {
  await axios.post(`/api/BudgetTransactionEvent/add`, bte);
};

export const getAllCustomerBTE = async (customerId: number) => {
  const response = await axios.get(
    `/api/BudgetTransactionEvent/get/${customerId}`
  );
  return response.data;
};
