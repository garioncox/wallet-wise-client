import axios from "axios";

export const getAllCustomers = async () => {
  const response = await axios.get(`/api/Customer/getAll`);
  return response.data;
};

export const getCustomerByEmail = async (email: string) => {
  const response = await axios.get(`/api/Customer/get/${email}`);
  return response.data;
};
