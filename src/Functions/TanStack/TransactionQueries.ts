import { useQuery } from "@tanstack/react-query";
import { getAllTransactionEvents } from "../Axios/TransactionHttp";
import { queryKeys } from "./KeyFactory";

export const useAllTransactionEvents = () => {
  return useQuery({
    queryKey: queryKeys.transactions,
    queryFn: getAllTransactionEvents,
  });
};
