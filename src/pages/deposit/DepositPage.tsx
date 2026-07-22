import { useState } from "react";
import CustomButton from "../../components/custom-button/CustomButton";
import CustomDropdown from "../../components/custom-dropdown/CustomDropdown";
import CustomInput from "../../components/custom-input/CustomInput";
import { useAccounts } from "../../hooks/useAccounts";
import styles from "./DepositPage.module.css";

const DepositPage = () => {
  const { accounts } = useAccounts();
  const [accountNumber, setAccountNumber] = useState<string>("");
  const [amount, setAmount] = useState<string | number>("");

  const handleClick = () => {
    console.log("accountNumber", accountNumber);
    console.log("amount", amount);
  };
  return (
    <section className={styles.container}>
      <h2>Deposit</h2>
      <CustomDropdown<string>
        label="Account"
        placeholder="Select account..."
        options={accounts.map((account) => ({
          value: account.accountNumber,
          label: `${account.accountNumber} — ${account.username} (€${account.balance})`,
        }))}
        value={accountNumber}
        onChange={setAccountNumber}
      />
      <CustomInput
        type="number"
        label="Amount (EUR)"
        placeholder="0.00"
        value={amount}
        onChange={setAmount}
      />
      <CustomButton onClick={handleClick}>Deposit</CustomButton>
    </section>
  );
};

export default DepositPage;
