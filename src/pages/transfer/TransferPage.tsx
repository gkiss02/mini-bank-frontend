import { useState } from "react";
import CustomBanner from "../../components/custom-banner/CustomBanner";
import CustomButton from "../../components/custom-button/CustomButton";
import CustomDropdown from "../../components/custom-dropdown/CustomDropdown";
import CustomInput from "../../components/custom-input/CustomInput";
import { useAccounts } from "../../hooks/useAccounts";
import { useBankOperation } from "../../hooks/useBankOperation";
import { getAccountOptionLabel } from "../../utils/account";

const TransferPage = () => {
  const { accounts, transfer } = useAccounts();
  const [accountNumberFrom, setAccountNumberFrom] = useState<string>("");
  const [accountNumberTo, setAccountNumberTo] = useState<string>("");
  const [amount, setAmount] = useState<string | number>("");
  const { message, run, clearMessage } = useBankOperation();

  const handleClick = () => {
    const success = run(() => {
      if (!accountNumberFrom || !accountNumberTo || !amount) {
        throw new Error("Please fill all fields.");
      }

      transfer(accountNumberFrom, accountNumberTo, Number(amount));

      return `Transferred €${Number(amount).toFixed(
        2
      )} from ${accountNumberFrom} to ${accountNumberTo}.`;
    });

    if (success) {
      setAccountNumberFrom("");
      setAccountNumberTo("");
      setAmount("");
    }
  };

  return (
    <section>
      <h2>Transfer</h2>
      <form
        onSubmit={(event) => {
          event.preventDefault();
          handleClick();
        }}
      >
        <CustomDropdown<string>
          label="From account"
          placeholder="Select account..."
          options={accounts.map((account) => ({
            value: account.accountNumber,
            label: getAccountOptionLabel(account),
          }))}
          value={accountNumberFrom}
          onChange={(value) => {
            setAccountNumberFrom(value);
            clearMessage();
          }}
        />
        <CustomDropdown<string>
          label="To account"
          placeholder="Select account..."
          options={accounts.map((account) => ({
            value: account.accountNumber,
            label: getAccountOptionLabel(account),
          }))}
          value={accountNumberTo}
          onChange={(value) => {
            setAccountNumberTo(value);
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
        <CustomButton type="submit">Transfer</CustomButton>
      </form>
      {message && <CustomBanner message={message} />}
    </section>
  );
};

export default TransferPage;
