import { useId, type ChangeEvent } from "react";
import styles from "./CustomInput.module.css";

interface CustomInputProps {
  type: "text" | "number";
  label: string;
  placeholder: string;
  value: string | number;
  onChange: (value: string | number) => void;
}

const MAX_DECIMAL_PLACES = /^\d*\.?\d{0,2}$/;

const CustomInput = ({
  type,
  label,
  placeholder,
  value,
  onChange,
}: CustomInputProps) => {
  const id = useId();

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const newValue = event.target.value;

    if (type === "number" && !MAX_DECIMAL_PLACES.test(newValue)) {
      return;
    }

    onChange(newValue);
  };

  return (
    <div className={styles.container}>
      <label htmlFor={id}>{label}</label>
      <input
        id={id}
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={handleChange}
        className={styles.input}
      />
    </div>
  );
};

export default CustomInput;
