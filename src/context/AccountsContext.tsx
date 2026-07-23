import { useState, type ReactNode } from "react";
import { NORMAL_ACCOUNT_WELCOME_BONUS_CENT } from "../constants/account";
import {
  AccountType,
  type Account,
  type CreateAccountInput,
} from "../types/account";
import { AccountsContext } from "./accounts-context";
import {
  assertSufficientBalance,
  findAccount,
  isAccountExists,
  isAmountGreaterThanZero,
  isValidAccountNumberFormat,
} from "../utils/accountRules";
import { eurosToCents } from "../utils/money";

export const AccountsProvider = ({ children }: { children: ReactNode }) => {
  const [accounts, setAccounts] = useState<Account[]>([]);

  const createAccount = (input: CreateAccountInput) => {
    isValidAccountNumberFormat(input.accountNumber);

    if (findAccount(accounts, input.accountNumber)) {
      throw new Error(`Account ${input.accountNumber} already exists.`);
    }

    const account: Account =
      input.accountType === AccountType.NORMAL
        ? {
            accountType: AccountType.NORMAL,
            accountNumber: input.accountNumber,
            username: input.username,
            balance: NORMAL_ACCOUNT_WELCOME_BONUS_CENT,
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
    const amountInCents = eurosToCents(amount);

    isAmountGreaterThanZero(amountInCents);
    isAccountExists(accounts, accountNumber);

    setAccounts((prev) =>
      prev.map((account) =>
        account.accountNumber === accountNumber
          ? { ...account, balance: account.balance + amountInCents }
          : account
      )
    );
  };

  const withdraw = (accountNumber: string, amount: number) => {
    const amountInCents = eurosToCents(amount);

    isAmountGreaterThanZero(amountInCents);

    const accountToWithdraw = isAccountExists(accounts, accountNumber);

    const newBalance = accountToWithdraw.balance - amountInCents;

    assertSufficientBalance(accountToWithdraw, newBalance);

    setAccounts((prev) =>
      prev.map((account) =>
        account.accountNumber === accountToWithdraw.accountNumber
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
    const amountInCents = eurosToCents(amount);

    isAmountGreaterThanZero(amountInCents);

    if (accountNumberFrom === accountNumberTo) {
      throw new Error("From and to account cannot be the same.");
    }

    const accountFrom = isAccountExists(accounts, accountNumberFrom);
    isAccountExists(accounts, accountNumberTo);

    assertSufficientBalance(accountFrom, accountFrom.balance - amountInCents);

    setAccounts((prev) =>
      prev.map((a) =>
        a.accountNumber === accountNumberFrom
          ? { ...a, balance: a.balance - amountInCents }
          : a.accountNumber === accountNumberTo
          ? { ...a, balance: a.balance + amountInCents }
          : a
      )
    );
  };

  return (
    <AccountsContext.Provider
      value={{ accounts, createAccount, deposit, withdraw, transfer }}
    >
      {children}
    </AccountsContext.Provider>
  );
};
