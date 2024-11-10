import axios from "axios";

export const getAllTransactionEvents = async () => {
  const response = await axios.get(`/api/TransactionEvent/getAll`);
  return response.data;
};
