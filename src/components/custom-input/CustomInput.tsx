import { useId } from "react";
import styles from "./CustomInput.module.css";

interface CustomInputProps {
  type: "text" | "number";
  label: string;
  placeholder: string;
  value: string | number;
  onChange: (value: string | number) => void;
}

const CustomInput = ({
  type,
  label,
  placeholder,
  value,
  onChange,
}: CustomInputProps) => {
  const id = useId();

  return (
    <div className={styles.container}>
      <label htmlFor={id}>{label}</label>
      <input
        id={id}
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={(event) => onChange(event.target.value)}
        className={styles.input}
      />
    </div>
  );
};

export default CustomInput;
