import {
  ACCOUNT_NUMBER_FORMAT,
  NORMAL_ACCOUNT_MIN_BALANCE_CENT,
  SAVINGS_ACCOUNT_MIN_BALANCE_CENT,
} from "../constants/account";
import { AccountType, type Account } from "../types/account";

export const getMinimumBalance = (accountType: AccountType): number => {
  switch (accountType) {
    case AccountType.NORMAL:
      return NORMAL_ACCOUNT_MIN_BALANCE_CENT;
    case AccountType.SAVINGS:
      return SAVINGS_ACCOUNT_MIN_BALANCE_CENT;
  }
};

export const assertSufficientBalance = (
  account: Account,
  newBalance: number
): void => {
  const minimumBalance = getMinimumBalance(account.accountType);

  if (newBalance < minimumBalance) {
    throw new Error(
      account.accountType === AccountType.SAVINGS
        ? `Insufficient balance: savings account ${account.accountNumber} cannot go below €0.00.`
        : `Insufficient balance: normal account ${
            account.accountNumber
          } cannot overdraw past €${minimumBalance.toFixed(2)}.`
    );
  }
};

export const isAmountGreaterThanZero = (amount: number): void => {
  if (amount <= 0) {
    throw new Error("Enter an amount greater than 0.");
  }
};

export const findAccount = (
  accounts: Account[],
  accountNumber: string
): Account | undefined =>
  accounts.find((account) => account.accountNumber === accountNumber);

export const isAccountExists = (
  accounts: Account[],
  accountNumber: string
): Account => {
  const account = findAccount(accounts, accountNumber);

  if (!account) {
    throw new Error(`Account ${accountNumber} not found.`);
  }

  return account;
};

export const isValidAccountNumberFormat = (accountNumber: string): void => {
  if (!ACCOUNT_NUMBER_FORMAT.test(accountNumber)) {
    throw new Error(
      `Account number ${accountNumber} is invalid. Expected format: xxx-xxxxxxx-xx.`
    );
  }
};
