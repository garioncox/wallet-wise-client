import { Cardify } from "../Components/Layout/Cardify";
import { Spinner } from "../Components/Layout/Spinnex";
import { TransactionEvent } from "../Data/TransactionEvent";
import { useDateUtils } from "../Functions/DateUtils";
import { useAllTransactionEventsForCurrentUser } from "../Functions/TanStack/TransactionQueries";

export const TransactionView = () => {
  const { data, isLoading } = useAllTransactionEventsForCurrentUser();
  const dateUtils = useDateUtils();

  if (isLoading) {
    return <Spinner />;
  }

  if (!data || data.length == 0) {
    return <>No Transactions</>;
  }

  return (
    <Cardify>
      <div className="flex flex-col grow justify-items-stretch divide-y divide-slate-400">
        <p className="mb-3 text-center font-bold text-xl">
          Transactions for "Name"
        </p>
        {data.map((t: TransactionEvent) => {
          return (
            <div className="grid grid-cols-8" key={t.id}>
              <p className="p-3 col-span-2">${t.amt}</p>
              <p className="p-3 col-span-4">{t.transactionName}</p>
              <p className="p-3 col-span-2">
                {dateUtils.convertToStandardString(new Date(t.transactionDate))}
              </p>
              <hr />
            </div>
          );
        })}
      </div>
    </Cardify>
  );
};
