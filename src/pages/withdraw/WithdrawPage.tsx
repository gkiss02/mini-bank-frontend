import { useState } from "react";
import CustomDropdown from "../../components/custom-dropdown/CustomDropdown";
import { useAccounts } from "../../hooks/useAccounts";
import styles from "./WithdrawPage.module.css";
import CustomInput from "../../components/custom-input/CustomInput";
import CustomButton from "../../components/custom-button/CustomButton";
import type { BannerMessage } from "../../types/banner";
import CustomBanner from "../../components/custom-banner/CustomBanner";

const WithdrawPage = () => {
  const { accounts, withdraw } = useAccounts();
  const [accountNumber, setAccountNumber] = useState<string>("");
  const [amount, setAmount] = useState<string | number>("");
  const [message, setMessage] = useState<BannerMessage | null>(null);

  const handleClick = () => {
    try {
      if (!accountNumber || !amount) {
        throw new Error("Please fill all fields.");
      }

      withdraw(accountNumber, Number(amount));

      setMessage({
        variant: "success",
        text: `Withdrew €${amount} from ${accountNumber}`,
      });

      setAccountNumber("");
      setAmount("");
    } catch (error) {
      setMessage({
        variant: "error",
        text: error instanceof Error ? error.message : "Something went wrong.",
      });
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
          setMessage(null);
        }}
      />
      <CustomInput
        type="number"
        label="Amount (EUR)"
        placeholder="0.00"
        value={amount}
        onChange={(value) => {
          setAmount(value);
          setMessage(null);
        }}
      />
      <CustomButton onClick={handleClick}>Withdraw</CustomButton>
      {message && <CustomBanner message={message} />}
    </section>
  );
};

export default WithdrawPage;
