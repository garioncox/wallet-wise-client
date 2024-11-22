import axios from "axios";
import { BudgetDTO } from "../../Data/DTO/BudgetDTO";

export const getAllBudgets = async () => {
  const response = await axios.get(`/api/Budget/getAll`);
  return response.data;
};

export const getAllBudgetsAuth = async (id_token: string) => {
  const response = await axios.get(`/api/Budget/getAllAuth`, {
    headers: {
      Authorization: `Bearer ${id_token}`,
    },
  });

  return response.data;
};

export const getBudgetByCustomerId = async (id: number) => {
  const response = await axios.get(`/api/Budget/get/${id}`);
  return response.data;
};

export const addBudget = async (dto: BudgetDTO) => {
  await axios.post(`/api/Budget/add`, dto);
};
