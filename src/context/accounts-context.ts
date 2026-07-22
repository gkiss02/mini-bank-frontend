import { createContext } from "react";
import type { Account, CreateAccountInput } from "../types/account";

export interface AccountsContextValue {
  accounts: Account[];
  createAccount: (input: CreateAccountInput) => void;
  deposit: (accountNumber: string, amount: number) => void;
  withdraw: (accountNumber: string, amount: number) => void;
  transfer: (
    accountNumberFrom: string,
    accountNumberTo: string,
    amount: number
  ) => void;
}

export const AccountsContext = createContext<AccountsContextValue | undefined>(
  undefined
);
