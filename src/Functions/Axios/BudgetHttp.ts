import axios from "axios";

export const getAllBudgets = async () => {
  const response = await axios.get(`/api/Budget/getAll`);
  return response.data;
};
