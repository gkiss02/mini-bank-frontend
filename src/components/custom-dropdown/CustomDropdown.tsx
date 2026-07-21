import styles from "./CustomDropdown.module.css";

interface CustomDropdownProps<T extends string> {
  label: string;
  values: T[];
  value: T;
  onChange: (value: T) => void;
}

const CustomDropdown = <T extends string>({
  values,
  label,
  value,
  onChange,
}: CustomDropdownProps<T>) => {
  return (
    <div className={styles.container}>
      <label>{label}</label>
      <select
        className={styles.select}
        value={value}
        onChange={(event) => onChange(event.target.value as T)}
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
