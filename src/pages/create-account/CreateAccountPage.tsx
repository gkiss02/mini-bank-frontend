import { useState } from "react";
import CustomButton from "../../components/custom-button/CustomButton";
import {
  NORMAL_ACCOUNT_MIN_BALANCE_CENT,
  NORMAL_ACCOUNT_WELCOME_BONUS_CENT,
  SAVINGS_ACCOUNT_MIN_BALANCE_CENT,
} from "../../constants/account";
import { AccountType, getAccountTypeLabel } from "../../types/account";
import CustomInput from "../../components/custom-input/CustomInput";
import { useAccounts } from "../../hooks/useAccounts";
import styles from "./CreateAccountPage.module.css";
import CustomDropdown from "../../components/custom-dropdown/CustomDropdown";
import CustomBanner from "../../components/custom-banner/CustomBanner";
import { useBankOperation } from "../../hooks/useBankOperation";
import { formatMoney } from "../../utils/money";

const CreateAccountPage = () => {
  const { createAccount } = useAccounts();
  const [accountType, setAccountType] = useState<AccountType>(
    AccountType.NORMAL
  );
  const [accountNumber, setAccountNumber] = useState<string>("");
  const [username, setUsername] = useState<string>("");
  const [interestRate, setInterestRate] = useState<string>("");
  const { message, run, clearMessage } = useBankOperation();

  const handleClick = () => {
    const success = run(() => {
      if (
        !accountNumber ||
        !username ||
        (accountType === AccountType.SAVINGS && !interestRate)
      ) {
        throw new Error("Please fill all fields.");
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

      return isSavings
        ? `Savings account ${accountNumber} created for ${username}`
        : `Account ${accountNumber} created for ${username} with a €${formatMoney(
            NORMAL_ACCOUNT_WELCOME_BONUS_CENT
          )} welcome bonus.`;
    });

    if (success) {
      setAccountNumber("");
      setUsername("");
      setInterestRate("");
    }
  };

  return (
    <section>
      <h2>Create account page</h2>
      <form
        onSubmit={(event) => {
          event.preventDefault();
          handleClick();
        }}
      >
        <CustomDropdown<AccountType>
          label="Account type"
          options={Object.values(AccountType).map((type) => ({
            value: type,
            label: getAccountTypeLabel(type),
          }))}
          value={accountType}
          onChange={(value) => {
            setAccountType(value);
            clearMessage();
          }}
        />
        <CustomInput
          variant="text"
          label="Account number"
          placeholder="e.g 555-1111111-58"
          value={accountNumber}
          onChange={(value) => {
            setAccountNumber(String(value));
            clearMessage();
          }}
        />
        <CustomInput
          variant="text"
          label="User name"
          placeholder="e.g Mr. Big Buck"
          value={username}
          onChange={(value) => {
            setUsername(String(value));
            clearMessage();
          }}
        />
        {accountType === AccountType.SAVINGS && (
          <CustomInput
            variant="decimal"
            label="Interest rate (%)"
            placeholder="e.g 2.5%"
            value={interestRate}
            onChange={(value) => {
              setInterestRate(value);
              clearMessage();
            }}
          />
        )}
        <p className={styles.hint}>
          {accountType === AccountType.NORMAL
            ? `Normal accounts get a €${formatMoney(
                NORMAL_ACCOUNT_WELCOME_BONUS_CENT
              )} welcome bonus and can overdraw to €${formatMoney(
                NORMAL_ACCOUNT_MIN_BALANCE_CENT
              )}.`
            : `Savings accounts cannot go below €${formatMoney(
                SAVINGS_ACCOUNT_MIN_BALANCE_CENT
              )}.`}
        </p>
        <CustomButton type="submit">Create account</CustomButton>
      </form>
      {message && <CustomBanner message={message} />}
    </section>
  );
};

export default CreateAccountPage;
