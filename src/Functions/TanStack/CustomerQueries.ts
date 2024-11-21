import { useMutation, useQuery } from "@tanstack/react-query";
import {
  addCustomer,
  getAllCustomers,
  getCustomerByEmail,
} from "../Axios/CustomerHttp";
import toast from "react-hot-toast";
import { queryClient } from "./QueryClient";
import { queryKeys } from "./KeyFactory";
import { CustomerDTO } from "../../Data/DTO/CustomerDTO";

export const useAllCustomers = () => {
  return useQuery({
    queryKey: ["customers"],
    queryFn: getAllCustomers,
  });
};

export const useCustomerByEmail = (email: string) => {
  return useQuery({
    queryKey: ["budgets"],
    queryFn: async () => await getCustomerByEmail(email),
  });
};

export const useAddCustomerMutation = () => {
  return useMutation({
    mutationFn: (customer: CustomerDTO) => addCustomer(customer),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.customers });
    },
    onError: () => {
      toast.error("Error adding customer to database");
    },
  });
};
