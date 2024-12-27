import axios from "axios";
import { TransactionEventDTO } from "../../Data/DTO/TransactionEventDTO";

export const getAllTEByEmail = async (email: string) => {
  const response = await axios.get(`/api/TransactionEvent/get/${email}`);
  return response.data;
};

export const addTE = async (event: TransactionEventDTO) => {
  const response = await axios.post(`/api/TransactionEvent/add`, event);
  return response.data;
};
