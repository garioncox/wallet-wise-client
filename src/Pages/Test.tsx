import { BudgetTransactionEventDTO } from "../Data/DTO/BudgetTransactionEventDTO";
import { TransactionEventDTO } from "../Data/DTO/TransactionEventDTO";
import { addBudgetTransactionEvent } from "../Functions/Axios/BudgetTransactionHttp";
import { addTransactionEvent } from "../Functions/Axios/TransactionHttp";

export const Test = () => {
  const t: TransactionEventDTO = {
    amt: 1,
    transactionDate: new Date().toISOString(),
    transactionName: "TestTransaction",
    customerId: 1,
  };

  const transaction: BudgetTransactionEventDTO = {
    transactionEventId: 1,
    budgetId: 1,
  };

  return (
    <div>
      <button
        className="bg-christi-500 rounded-xl p-5 text-white hover:bg-christi-600 mb-5"
        onClick={() => {
          addTransactionEvent(t);
        }}
      >
        POST Transaction
      </button>
      <button
        className="bg-christi-500 rounded-xl p-5 text-white hover:bg-christi-600"
        onClick={() => {
          addBudgetTransactionEvent(transaction);
        }}
      >
        POST BudgetTransaction
      </button>
    </div>
  );
};
