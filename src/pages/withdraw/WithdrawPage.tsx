import { useState } from "react";
import CustomDropdown from "../../components/custom-dropdown/CustomDropdown";
import { useAccounts } from "../../hooks/useAccounts";
import styles from "./WithdrawPage.module.css";
import CustomInput from "../../components/custom-input/CustomInput";
import CustomButton from "../../components/custom-button/CustomButton";

const WithdrawPage = () => {
  const { accounts } = useAccounts();
  const [accountNumber, setAccountNumber] = useState<string>("");
  const [amount, setAmount] = useState<string | number>("");

  const handleClick = () => {
    console.log("accountNumber", accountNumber);
    console.log("amount", amount);
  };

  return (
    <section className={styles.container}>
      <h2>Withdraw</h2>
      <CustomDropdown<string>
        label="Account"
        placeholder="Select account..."
        values={accounts.map(
          (account) =>
            `${account.accountNumber} — ${account.username} (€${account.balance})`
        )}
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
      <CustomButton onClick={handleClick}>Withdraw</CustomButton>
    </section>
  );
};

export default WithdrawPage;
