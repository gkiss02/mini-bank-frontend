import { useState } from "react";
import CustomButton from "../../components/custom-button/CustomButton";
import CustomDropdown from "../../components/custom-dropdown/CustomDropdown";
import CustomInput from "../../components/custom-input/CustomInput";
import { useAccounts } from "../../hooks/useAccounts";
import styles from "./TransferPage.module.css";

const TransferPage = () => {
  const { accounts } = useAccounts();
  const [accountNumberFrom, setAccountNumberFrom] = useState<string>("");
  const [accountNumberTo, setAccountNumberTo] = useState<string>("");
  const [amount, setAmount] = useState<string | number>("");

  const handleClick = () => {
    console.log("accountNumberFrom", accountNumberFrom);
    console.log("accountNumberTo", accountNumberTo);
    console.log("amount", amount);
  };

  return (
    <section className={styles.container}>
      <h2>Transfer</h2>
      <CustomDropdown<string>
        label="From account"
        placeholder="Select account..."
        options={accounts.map((account) => ({
          value: account.accountNumber,
          label: `${account.accountNumber} — ${account.username} (€${account.balance})`,
        }))}
        value={accountNumberFrom}
        onChange={setAccountNumberFrom}
      />
      <CustomDropdown<string>
        label="To account"
        placeholder="Select account..."
        options={accounts.map((account) => ({
          value: account.accountNumber,
          label: `${account.accountNumber} — ${account.username} (€${account.balance})`,
        }))}
        value={accountNumberTo}
        onChange={setAccountNumberTo}
      />
      <CustomInput
        type="number"
        label="Amount (EUR)"
        placeholder="0.00"
        value={amount}
        onChange={setAmount}
      />
      <CustomButton onClick={handleClick}>Transfer</CustomButton>
    </section>
  );
};

export default TransferPage;
