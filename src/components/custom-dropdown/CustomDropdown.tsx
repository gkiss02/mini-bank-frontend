import { useId } from "react";
import styles from "./CustomDropdown.module.css";

export interface CustomDropdownOption<T extends string> {
  value: T;
  label: string;
}

interface CustomDropdownProps<T extends string> {
  label: string;
  placeholder?: string;
  options: CustomDropdownOption<T>[];
  value: T;
  onChange: (value: T) => void;
}

const CustomDropdown = <T extends string>({
  options,
  label,
  placeholder,
  value,
  onChange,
}: CustomDropdownProps<T>) => {
  const id = useId();

  return (
    <div className={styles.container}>
      <label htmlFor={id}>{label}</label>
      <select
        id={id}
        className={styles.select}
        value={value}
        onChange={(event) => onChange(event.target.value as T)}
      >
        {placeholder && (
          <option value="" disabled>
            {placeholder}
          </option>
        )}
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );
};

export default CustomDropdown;
