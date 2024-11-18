import axios from "axios"
import { BudgetTransactionEvent } from "../../Data/BudgetTransactionEvent"

export const addBudgetTransactionEvent = async (bte: BudgetTransactionEvent) => {
    await axios.post(`/api/BudgetTransactionEvent/add`, bte)
}