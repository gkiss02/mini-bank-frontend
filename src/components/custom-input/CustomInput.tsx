import { useId, type ChangeEvent } from "react";
import styles from "./CustomInput.module.css";

interface CustomInputProps {
  variant: "text" | "decimal";
  label: string;
  placeholder: string;
  value: string;
  onChange: (value: string) => void;
}

const DECIMAL_PATTERN = /^(\d+\.?\d{0,2})?$/;

const CustomInput = ({
  variant,
  label,
  placeholder,
  value,
  onChange,
}: CustomInputProps) => {
  const id = useId();

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const newValue = event.target.value;

    if (variant === "decimal" && !DECIMAL_PATTERN.test(newValue)) {
      return;
    }

    onChange(newValue);
  };

  return (
    <div className={styles.container}>
      <label htmlFor={id}>{label}</label>
      <input
        id={id}
        type="text"
        inputMode={variant === "decimal" ? "decimal" : undefined}
        placeholder={placeholder}
        value={value}
        onChange={handleChange}
        className={styles.input}
      />
    </div>
  );
};

export default CustomInput;
