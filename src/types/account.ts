export enum AccountType {
  NORMAL = "NORMAL",
  SAVINGS = "SAVINGS",
}

export const getAccountTypeLabel = (accountType: AccountType): string => {
  switch (accountType) {
    case AccountType.NORMAL:
      return "Normal";
    case AccountType.SAVINGS:
      return "Savings";
  }
};

interface BaseAccount {
  readonly accountNumber: string;
  readonly username: string;
  readonly balance: number;
}

export interface NormalAccount extends BaseAccount {
  readonly accountType: AccountType.NORMAL;
}

export interface SavingsAccount extends BaseAccount {
  readonly accountType: AccountType.SAVINGS;
  readonly interestRate: number;
}

export type Account = NormalAccount | SavingsAccount;

export type CreateAccountInput =
  | {
      accountType: AccountType.NORMAL;
      accountNumber: string;
      username: string;
    }
  | {
      accountType: AccountType.SAVINGS;
      accountNumber: string;
      username: string;
      interestRate: number;
    };
