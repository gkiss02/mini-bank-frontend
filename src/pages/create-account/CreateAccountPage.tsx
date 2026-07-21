import { useState } from "react";
import CustomButton from "../../components/custom-button/CustomButton";
import { AccountType } from "../../types/account";
import CustomInput from "../../components/custom-input/CustomInput";
import { useAccounts } from "../../hooks/useAccounts";
import styles from "./CreateAccountPage.module.css";
import CustomDropdown from "../../components/custom-dropdown/CustomDropdown";

const CreateAccountPage = () => {
  const { createAccount } = useAccounts();
  const [accountType, setAccountType] = useState<AccountType>(
    AccountType.NORMAL
  );
  const [accountNumber, setAccountNumber] = useState<string>("");
  const [username, setUsername] = useState<string>("");
  const [interestRate, setInterestRate] = useState<string | number>("");

  const handleClick = () => {
    if (accountType === AccountType.SAVINGS) {
      createAccount({
        accountType: AccountType.SAVINGS,
        accountNumber,
        userName: username,
        interestRate: Number(interestRate),
      });
    } else {
      createAccount({
        accountType: AccountType.NORMAL,
        accountNumber,
        userName: username,
      });
    }

    setAccountNumber("");
    setUsername("");
    setInterestRate("");
  };

  return (
    <section className={styles.container}>
      <h2>Create account page</h2>
      <CustomDropdown<AccountType>
        label="Account type"
        values={Object.values(AccountType)}
        value={accountType}
        onChange={setAccountType}
      />
      <CustomInput
        type="text"
        label="Account number"
        placeholder="e.g 555-1111111-58"
        value={accountNumber}
        onChange={(value) => setAccountNumber(String(value))}
      />
      <CustomInput
        type="text"
        label="User name"
        placeholder="e.g Mr. Big Buck"
        value={username}
        onChange={(value) => setUsername(String(value))}
      />
      {accountType === AccountType.SAVINGS && (
        <CustomInput
          type="number"
          label="Interest rate (%)"
          placeholder="e.g 2.5%"
          value={interestRate}
          onChange={setInterestRate}
        />
      )}
      <p className={styles.hint}>
        {accountType === AccountType.NORMAL
          ? "Normal accounts get a €10.00 welcome bonus and can overdraw to €-500.00."
          : "Savings accounts cannot go below €0.00."}
      </p>
      <CustomButton onClick={handleClick}>Create account</CustomButton>
    </section>
  );
};

export default CreateAccountPage;
