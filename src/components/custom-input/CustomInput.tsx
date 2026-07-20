import styles from "./CustomInput.module.css";

interface CustomInputProps {
  type: "text" | "number";
  label: string;
  placeholder: string;
  value: string;
  onChange: (value: string | number) => void;
}

const CustomInput = ({
  type,
  label,
  placeholder,
  value,
  onChange,
}: CustomInputProps) => {
  return (
    <div className={styles.container}>
      <label>{label}</label>
      <input
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
