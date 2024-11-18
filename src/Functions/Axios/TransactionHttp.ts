import axios from "axios";
import { TransactionEvent } from "../../Data/TransactionEvent";

export const getAllTransactionEvents = async () => {
  const response = await axios.get(`/api/TransactionEvent/getAll`);
  return response.data;
};

export const addTransactionEvent = async (event: TransactionEvent) => {
  const response = await axios.post(`/api/TransactionEvent/add`, event);
  return response.data;
} 
