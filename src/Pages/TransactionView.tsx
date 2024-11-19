import { TransactionEvent } from "../Data/TransactionEvent";
import { useAllTransactionEvents } from "../Functions/TanStack/TransactionQueries";

export const TransactionView = () => {
  const { data: allTransactions, isLoading } = useAllTransactionEvents();

  if (isLoading) {
    return <>Loading...</>;
  }

  if (allTransactions.length == 0) {
    return <>No Transactions</>;
  }

  return (
    <div className="flex flex-col grow items-center">
      {allTransactions.map((t: TransactionEvent) => {
        return (
          <div className="flex flex-row grow" key={t.id}>
            <p className="px-3">{t.id}x</p>
            <p className="px-3">{t.transactionDate}</p>
            <p className="px-3">{t.transactionName}</p>
            <p className="px-3">{t.amt}</p>
            <hr />
          </div>
        );
      })}
    </div>
  );
};
