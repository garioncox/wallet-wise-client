export interface TransactionEvent {
  id: number | null;
  transactionName: string;
  amt: number;
  transactionDate: string;
  customerId: number;
}
