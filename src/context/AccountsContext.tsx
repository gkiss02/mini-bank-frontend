import { useState, type ReactNode } from "react";
import { NORMAL_ACCOUNT_WELCOME_BONUS } from "../constants/account";
import {
  AccountType,
  type Account,
  type CreateAccountInput,
} from "../types/account";
import { AccountsContext } from "./accounts-context";
import { assertSufficientBalance } from "../utils/accountRules";

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

  const deposit = (accountNumber: string, amount: number) => {
    if (amount <= 0) {
      throw new Error("Enter an amount greater than 0.");
    }

    setAccounts((prev) =>
      prev.map((account) =>
        account.accountNumber === accountNumber
          ? { ...account, balance: account.balance + amount }
          : account
      )
    );
  };

  const withdraw = (accountNumber: string, amount: number) => {
    if (amount <= 0) {
      throw new Error("Enter an amount greater than 0.");
    }

    const accountToWithdraw = accounts.find(
      (account) => account.accountNumber === accountNumber
    );

    if (!accountToWithdraw) {
      throw new Error("Account not found");
    }

    const newBalance = accountToWithdraw.balance - amount;

    assertSufficientBalance(accountToWithdraw, newBalance);

    setAccounts((prev) =>
      prev.map((account) =>
        account === accountToWithdraw
          ? { ...account, balance: newBalance }
          : account
      )
    );
  };

  const transfer = (
    accountNumberFrom: string,
    accountNumberTo: string,
    amount: number
  ) => {
    if (accountNumberFrom === accountNumberTo) {
      throw new Error("From and to account cannot be the same.");
    }

    withdraw(accountNumberFrom, amount);
    deposit(accountNumberTo, amount);
  };

  return (
    <AccountsContext.Provider
      value={{ accounts, createAccount, deposit, withdraw, transfer }}
    >
      {children}
    </AccountsContext.Provider>
  );
};
