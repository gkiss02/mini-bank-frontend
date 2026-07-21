export enum AccountType {
  NORMAL = "NORMAL",
  SAVINGS = "SAVINGS",
}

interface BaseAccount {
  readonly accountNumber: string;
  readonly userName: string;
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
      userName: string;
    }
  | {
      accountType: AccountType.SAVINGS;
      accountNumber: string;
      userName: string;
      interestRate: number;
    };
