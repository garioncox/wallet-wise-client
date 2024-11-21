import axios from "axios";
import { TransactionEventDTO } from "../../Data/DTO/TransactionEventDTO";

export const getAllTransactionEvents = async () => {
  const response = await axios.get(`/api/TransactionEvent/getAll`);
  return response.data;
};

export const getAllTransactionEventsByEmail = async (email: string) => {
  const response = await axios.get(`/api/TransactionEvent/get/${email}`);
  return response.data;
};

export const addTransactionEvent = async (event: TransactionEventDTO) => {
  const response = await axios.post(`/api/TransactionEvent/add`, event);
  return response.data;
};
