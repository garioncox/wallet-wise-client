import { useQuery } from "@tanstack/react-query";
import { getAllCustomers } from "../Axios/CustomerHttp";

export const useAllCustomers = () => {
  return useQuery({
    queryKey: ["customers"],
    queryFn: getAllCustomers,
  });
};
