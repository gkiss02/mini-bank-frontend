import type { AccountType } from "../../types/account";
import styles from "./CustomSelect.module.css";

interface CustomSelectProps {
  label: string;
  values: AccountType[];
  value: AccountType;
  onChange: (value: AccountType) => void;
}

const CustomSelect = ({
  values,
  label,
  value,
  onChange,
}: CustomSelectProps) => {
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

export default CustomSelect;
