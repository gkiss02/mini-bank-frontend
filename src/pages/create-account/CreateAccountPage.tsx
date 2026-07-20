import { useState } from "react";
import CustomButton from "../../components/custom-button/CustomButton";
import CustomSelect from "../../components/custom-select/CustomSelect";
import { AccountType } from "../../types/account";
import CustomInput from "../../components/custom-input/CustomInput";
import styles from "./CreateAccountPage.module.css";

const CreateAccountPage = () => {
  const [accountType, setAccountType] = useState<AccountType>(
    AccountType.NORMAL
  );
  const [accountNumber, setAccountNumber] = useState<string>("");
  const [username, setUsername] = useState<string>("");

  const handleClick = () => {
    console.log("accountType", accountType);
    console.log("accountNumber", accountNumber);
    console.log("username", username);
  };

  return (
    <section className={styles.container}>
      <h2>Create account page</h2>
      <CustomSelect
        values={Object.values(AccountType)}
        label="Account type"
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
      <p className={styles.hint}>
        Normal accounts get a €10.00 welcome bonus and can overdraw to €-500.00.
      </p>
      <CustomButton onClick={handleClick}>Create account</CustomButton>
    </section>
  );
};

export default CreateAccountPage;
