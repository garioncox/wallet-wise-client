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
import { useAuth } from "react-oidc-context";

export const useAllCustomers = () => {
  return useQuery({
    queryKey: queryKeys.customers,
    queryFn: getAllCustomers,
  });
};

export const useCustomerByEmail = (email: string) => {
  return useQuery({
    queryKey: [queryKeys.customers, email],
    queryFn: async () => await getCustomerByEmail(email),
  });
};

export const useCurrentCustomer = () => {
  const { user, isLoading } = useAuth();

  return useQuery({
    queryKey: queryKeys.currentUser,
    queryFn: async () => {
      try {
        return await getCustomerByEmail(user!.profile.email!);
      } catch {
        const dto: CustomerDTO = {
          name: user?.profile.name ?? "",
          email: user!.profile!.email!,
        };

        return await addCustomer(dto);
      }
    },
    enabled: !!(user && !isLoading),
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
