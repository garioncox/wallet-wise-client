import { useQuery } from "@tanstack/react-query";
import { getAllTransactionEvents } from "../Axios/TransactionHttp";

export const useAllTransactionEvents = () => {
  return useQuery({
    queryKey: ["transactionEvents"],
    queryFn: getAllTransactionEvents,
  });
};
