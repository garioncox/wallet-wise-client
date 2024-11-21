import axios from "axios";
import { CustomerDTO } from "../../Data/DTO/CustomerDTO";

export const getAllCustomers = async () => {
  const response = await axios.get(`/api/Customer/getAll`);
  return response.data;
};

export const getCustomerByEmail = async (email: string) => {
  const response = await axios.get(`/api/Customer/get/${email}`);
  return response.data;
};

export const addCustomer = async (customer: CustomerDTO) => {
  await axios.post(`/api/Customer/add/`, customer);
};
