import { useState, type ReactNode } from "react";
import { AccountType, type Account, type CreateAccountInput } from "../types/account";
import { AccountsContext } from "./accounts-context";

const NORMAL_ACCOUNT_WELCOME_BONUS = 10;

export const AccountsProvider = ({ children }: { children: ReactNode }) => {
  const [accounts, setAccounts] = useState<Account[]>([]);

  const createAccount = (input: CreateAccountInput) => {
    const account: Account =
      input.accountType === AccountType.NORMAL
        ? {
            accountType: AccountType.NORMAL,
            accountNumber: input.accountNumber,
            userName: input.userName,
            balance: NORMAL_ACCOUNT_WELCOME_BONUS,
          }
        : {
            accountType: AccountType.SAVINGS,
            accountNumber: input.accountNumber,
            userName: input.userName,
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