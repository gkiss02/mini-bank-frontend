import type { Account } from "../types/account";
import { formatMoney } from "./money";

export const getAccountOptionLabel = (account: Account): string =>
  `${account.accountNumber} — ${account.username} (€${formatMoney(
    account.balance
  )})`;
