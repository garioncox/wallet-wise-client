import { useMutation, useQuery } from "@tanstack/react-query";
import { addCustomer, getCustomerByEmail } from "../Axios/CustomerHttp";
import toast from "react-hot-toast";
import { queryClient } from "./QueryClient";
import { queryKeys } from "./KeyFactory";
import { CustomerDTO } from "../../Data/DTO/CustomerDTO";
import { useAuth0 } from "@auth0/auth0-react";

export const useCustomer = () => {
  const { user, isAuthenticated, isLoading } = useAuth0();

  return useQuery({
    queryKey: queryKeys.currentUser,
    queryFn: async () => {
      try {
        return await getCustomerByEmail(user?.email ?? "");
      } catch {
        const dto: CustomerDTO = {
          name: `${user!.given_name} ${user!.family_name}`,
          email: user!.email!,
        };

        await addCustomer(dto);
        return await getCustomerByEmail(user!.email!);
      }
    },
    enabled: !!(user && !isLoading && isAuthenticated),
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
