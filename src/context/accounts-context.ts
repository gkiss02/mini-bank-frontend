import { createContext } from "react";
import type { Account, CreateAccountInput } from "../types/account";

export interface AccountsContextValue {
  accounts: Account[];
  createAccount: (input: CreateAccountInput) => void;
}

export const AccountsContext = createContext<AccountsContextValue | undefined>(
  undefined
);