import { useState } from "react";
import CustomDropdown from "../../components/custom-dropdown/CustomDropdown";
import { useAccounts } from "../../hooks/useAccounts";
import CustomInput from "../../components/custom-input/CustomInput";
import CustomButton from "../../components/custom-button/CustomButton";
import CustomBanner from "../../components/custom-banner/CustomBanner";
import { useBankOperation } from "../../hooks/useBankOperation";
import { getAccountOptionLabel } from "../../utils/account";

const WithdrawPage = () => {
  const { accounts, withdraw } = useAccounts();
  const [accountNumber, setAccountNumber] = useState<string>("");
  const [amount, setAmount] = useState<string>("");
  const { message, run, clearMessage } = useBankOperation();

  const handleClick = () => {
    const success = run(() => {
      if (!accountNumber || !amount) {
        throw new Error("Please fill all fields.");
      }

      withdraw(accountNumber, Number(amount));

      return `Withdrew €${Number(amount).toFixed(2)} from ${accountNumber}`;
    });

    if (success) {
      setAccountNumber("");
      setAmount("");
    }
  };

  return (
    <section>
      <h2>Withdraw</h2>
      <form
        onSubmit={(event) => {
          event.preventDefault();
          handleClick();
        }}
      >
        <CustomDropdown<string>
          label="Account"
          placeholder="Select account..."
          options={accounts.map((account) => ({
            value: account.accountNumber,
            label: getAccountOptionLabel(account),
          }))}
          value={accountNumber}
          onChange={(value) => {
            setAccountNumber(value);
            clearMessage();
          }}
        />
        <CustomInput
          variant="decimal"
          label="Amount (EUR)"
          placeholder="0.00"
          value={amount}
          onChange={(value) => {
            setAmount(value);
            clearMessage();
          }}
        />
        <CustomButton type="submit">Withdraw</CustomButton>
      </form>
      {message && <CustomBanner message={message} />}
    </section>
  );
};

export default WithdrawPage;
