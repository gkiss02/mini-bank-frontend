import { useState } from "react";
import CustomBanner from "../../components/custom-banner/CustomBanner";
import CustomButton from "../../components/custom-button/CustomButton";
import CustomDropdown from "../../components/custom-dropdown/CustomDropdown";
import CustomInput from "../../components/custom-input/CustomInput";
import { useAccounts } from "../../hooks/useAccounts";
import type { BannerMessage } from "../../types/banner";
import styles from "./TransferPage.module.css";

const TransferPage = () => {
  const { accounts } = useAccounts();
  const [accountNumberFrom, setAccountNumberFrom] = useState<string>("");
  const [accountNumberTo, setAccountNumberTo] = useState<string>("");
  const [amount, setAmount] = useState<string | number>("");
  const [message, setMessage] = useState<BannerMessage | null>(null);

  const handleClick = () => {
    try {
      if (!accountNumberFrom || !accountNumberTo || !amount) {
        throw new Error("Please fill all fields.");
      }

      if (accountNumberFrom === accountNumberTo) {
        throw new Error("From and to account cannot be the same.");
      }

      setMessage({
        variant: "success",
        text: `Transferred ${amount} from ${accountNumberFrom} to ${accountNumberTo}.`,
      });
    } catch (error) {
      setMessage({
        variant: "error",
        text: error instanceof Error ? error.message : "Something went wrong.",
      });
    }
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
        onChange={(value) => {
          setAccountNumberFrom(value);
          setMessage(null);
        }}
      />
      <CustomDropdown<string>
        label="To account"
        placeholder="Select account..."
        options={accounts.map((account) => ({
          value: account.accountNumber,
          label: `${account.accountNumber} — ${account.username} (€${account.balance})`,
        }))}
        value={accountNumberTo}
        onChange={(value) => {
          setAccountNumberTo(value);
          setMessage(null);
        }}
      />
      <CustomInput
        type="number"
        label="Amount (EUR)"
        placeholder="0.00"
        value={amount}
        onChange={setAmount}
      />
      <CustomButton onClick={handleClick}>Transfer</CustomButton>
      {message && <CustomBanner message={message} />}
    </section>
  );
};

export default TransferPage;
