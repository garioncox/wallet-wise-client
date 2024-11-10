import axios from "axios";

export const getAllCustomers = async () => {
  const response = await axios.get(`/api/Customer/getAll`);
  return response.data;
};
