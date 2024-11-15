import { useQuery } from "@tanstack/react-query";
import { getAllCustomers, getCustomerByEmail } from "../Axios/CustomerHttp";
import toast from "react-hot-toast";

export const useAllCustomers = () => {
  return useQuery({
    queryKey: ["customers"],
    queryFn: async () => {
      const toastId = toast.loading("Getting customer data...");
      const customers = await getAllCustomers();
      setTimeout(() => {
        toast.dismiss(toastId);
        toast.success("Success!");
      }, 500);

      return customers;
    },
  });
};

export const useCustomerByEmail = (email: string) => {
  return useQuery({
    queryKey: ["budgets"],
    queryFn: () => getCustomerByEmail(email),
  });
};
