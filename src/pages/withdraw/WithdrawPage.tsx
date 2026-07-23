import { useState } from "react";
import CustomDropdown from "../../components/custom-dropdown/CustomDropdown";
import { useAccounts } from "../../hooks/useAccounts";
import styles from "./WithdrawPage.module.css";
import CustomInput from "../../components/custom-input/CustomInput";
import CustomButton from "../../components/custom-button/CustomButton";
import CustomBanner from "../../components/custom-banner/CustomBanner";
import { useBankOperation } from "../../hooks/useBankOperation";

const WithdrawPage = () => {
  const { accounts, withdraw } = useAccounts();
  const [accountNumber, setAccountNumber] = useState<string>("");
  const [amount, setAmount] = useState<string | number>("");
  const { message, run, clearMessage } = useBankOperation();

  const handleClick = () => {
    const success = run(() => {
      if (!accountNumber || !amount) {
        throw new Error("Please fill all fields.");
      }

      withdraw(accountNumber, Number(amount));

      return `Withdrew €${amount} from ${accountNumber}`;
    });

    if (success) {
      setAccountNumber("");
      setAmount("");
    }
  };

  return (
    <section className={styles.container}>
      <h2>Withdraw</h2>
      <CustomDropdown<string>
        label="Account"
        placeholder="Select account..."
        options={accounts.map((account) => ({
          value: account.accountNumber,
          label: `${account.accountNumber} — ${account.username} (€${account.balance})`,
        }))}
        value={accountNumber}
        onChange={(value) => {
          setAccountNumber(value);
          clearMessage();
        }}
      />
      <CustomInput
        type="number"
        label="Amount (EUR)"
        placeholder="0.00"
        value={amount}
        onChange={(value) => {
          setAmount(value);
          clearMessage();
        }}
      />
      <CustomButton onClick={handleClick}>Withdraw</CustomButton>
      {message && <CustomBanner message={message} />}
    </section>
  );
};

export default WithdrawPage;
