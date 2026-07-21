import type { AccountType } from "../../types/account";
import styles from "./CustomDropdown.module.css";

interface CustomDropdownProps {
  label: string;
  values: AccountType[];
  value: AccountType;
  onChange: (value: AccountType) => void;
}

const CustomDropdown = ({
  values,
  label,
  value,
  onChange,
}: CustomDropdownProps) => {
  return (
    <div className={styles.container}>
      <label>{label}</label>
      <select
        className={styles.select}
        value={value}
        onChange={(event) => onChange(event.target.value as AccountType)}
      >
        {values.map((value) => (
          <option key={value} value={value}>
            {value}
          </option>
        ))}
      </select>
    </div>
  );
};

export default CustomDropdown;
