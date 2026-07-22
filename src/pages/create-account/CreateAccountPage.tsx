import { useState } from "react";
import CustomButton from "../../components/custom-button/CustomButton";
import { NORMAL_ACCOUNT_WELCOME_BONUS } from "../../constants/account";
import { AccountType, getAccountTypeLabel } from "../../types/account";
import CustomInput from "../../components/custom-input/CustomInput";
import { useAccounts } from "../../hooks/useAccounts";
import type { BannerMessage } from "../../types/banner";
import styles from "./CreateAccountPage.module.css";
import CustomDropdown from "../../components/custom-dropdown/CustomDropdown";
import CustomBanner from "../../components/custom-banner/CustomBanner";

const CreateAccountPage = () => {
  const { accounts, createAccount } = useAccounts();
  const [accountType, setAccountType] = useState<AccountType>(
    AccountType.NORMAL
  );
  const [accountNumber, setAccountNumber] = useState<string>("");
  const [username, setUsername] = useState<string>("");
  const [interestRate, setInterestRate] = useState<string | number>("");
  const [message, setMessage] = useState<BannerMessage | null>(null);

  const handleClick = () => {
    if (
      !accountNumber ||
      !username ||
      (accountType === AccountType.SAVINGS && !interestRate)
    ) {
      setMessage({ variant: "error", text: "Please fill all fields." });
      return;
    }

    if (accounts.some((account) => account.accountNumber === accountNumber)) {
      setMessage({
        variant: "error",
        text: `Account ${accountNumber} already exists. `,
      });
      return;
    }

    const isSavings = accountType === AccountType.SAVINGS;

    if (isSavings) {
      createAccount({
        accountType: AccountType.SAVINGS,
        accountNumber,
        username,
        interestRate: Number(interestRate),
      });
    } else {
      createAccount({
        accountType: AccountType.NORMAL,
        accountNumber,
        username,
      });
    }

    setMessage({
      variant: "success",
      text: isSavings
        ? `Savings account ${accountNumber} created for ${username}`
        : `Account ${accountNumber} created for ${username} with a €${NORMAL_ACCOUNT_WELCOME_BONUS.toFixed(
            2
          )} welcome bonus.`,
    });

    setAccountNumber("");
    setUsername("");
    setInterestRate("");
  };

  return (
    <section className={styles.container}>
      <h2>Create account page</h2>
      <CustomDropdown<AccountType>
        label="Account type"
        options={Object.values(AccountType).map((type) => ({
          value: type,
          label: getAccountTypeLabel(type),
        }))}
        value={accountType}
        onChange={(value) => {
          setAccountType(value);
          setMessage(null);
        }}
      />
      <CustomInput
        type="text"
        label="Account number"
        placeholder="e.g 555-1111111-58"
        value={accountNumber}
        onChange={(value) => {
          setAccountNumber(String(value));
          setMessage(null);
        }}
      />
      <CustomInput
        type="text"
        label="User name"
        placeholder="e.g Mr. Big Buck"
        value={username}
        onChange={(value) => {
          setUsername(String(value));
          setMessage(null);
        }}
      />
      {accountType === AccountType.SAVINGS && (
        <CustomInput
          type="number"
          label="Interest rate (%)"
          placeholder="e.g 2.5%"
          value={interestRate}
          onChange={(value) => {
            setInterestRate(value);
            setMessage(null);
          }}
        />
      )}
      <p className={styles.hint}>
        {accountType === AccountType.NORMAL
          ? `Normal accounts get a €${NORMAL_ACCOUNT_WELCOME_BONUS.toFixed(
              2
            )} welcome bonus and can overdraw to €-500.00.`
          : "Savings accounts cannot go below €0.00."}
      </p>
      <CustomButton onClick={handleClick}>Create account</CustomButton>
      {message && <CustomBanner message={message} />}
    </section>
  );
};

export default CreateAccountPage;
