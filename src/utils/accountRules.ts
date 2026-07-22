import {
  NORMAL_ACCOUNT_MIN_BALANCE,
  SAVINGS_ACCOUNT_MIN_BALANCE,
} from "../constants/account";
import { AccountType, type Account } from "../types/account";

export const getMinimumBalance = (accountType: AccountType): number => {
  switch (accountType) {
    case AccountType.NORMAL:
      return NORMAL_ACCOUNT_MIN_BALANCE;
    case AccountType.SAVINGS:
      return SAVINGS_ACCOUNT_MIN_BALANCE;
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
        : `Insufficient balance: normal account ${account.accountNumber} cannot overdraw past €${minimumBalance.toFixed(2)}.`
    );
  }
};
