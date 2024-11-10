import { Budget } from "./Budget";
import { TransactionEvent } from "./TransactionEvent";

export interface Customer {
  id: number;
  surname: string;
  budgets: Budget[];
  transactions: TransactionEvent[];
}
