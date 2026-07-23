import { useAccounts } from "../../hooks/useAccounts";
import { AccountType, getAccountTypeLabel } from "../../types/account";
import styles from "./AccountsTable.module.css";

const AccountsTable = () => {
  const { accounts } = useAccounts();
  return (
    <table className={styles["accounts-table"]}>
      <thead>
        <tr>
          <th>Account number</th>
          <th>Type</th>
          <th>User</th>
          <th>Balance</th>
          <th>Interest</th>
        </tr>
      </thead>
      <tbody>
        {accounts.map((account) => (
          <tr key={account.accountNumber}>
            <td>{account.accountNumber}</td>
            <td>{getAccountTypeLabel(account.accountType)}</td>
            <td>{account.username}</td>
            <td>€{account.balance}</td>
            <td>
              {account.accountType === AccountType.SAVINGS
                ? `${account.interestRate}%`
                : "-"}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default AccountsTable;
