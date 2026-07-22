import { useState, type ReactNode } from "react";
import { NORMAL_ACCOUNT_WELCOME_BONUS } from "../constants/account";
import {
  AccountType,
  type Account,
  type CreateAccountInput,
} from "../types/account";
import { AccountsContext } from "./accounts-context";

export const AccountsProvider = ({ children }: { children: ReactNode }) => {
  const [accounts, setAccounts] = useState<Account[]>([]);

  const createAccount = (input: CreateAccountInput) => {
    if (
      accounts.some((account) => account.accountNumber === input.accountNumber)
    ) {
      throw new Error(`Account ${input.accountNumber} already exists.`);
    }

    const account: Account =
      input.accountType === AccountType.NORMAL
        ? {
            accountType: AccountType.NORMAL,
            accountNumber: input.accountNumber,
            username: input.username,
            balance: NORMAL_ACCOUNT_WELCOME_BONUS,
          }
        : {
            accountType: AccountType.SAVINGS,
            accountNumber: input.accountNumber,
            username: input.username,
            balance: 0,
            interestRate: input.interestRate,
          };

    setAccounts((prev) => [...prev, account]);
  };

  return (
    <AccountsContext.Provider value={{ accounts, createAccount }}>
      {children}
    </AccountsContext.Provider>
  );
};
