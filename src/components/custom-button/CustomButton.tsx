import type { ReactNode } from "react";
import styles from "./CustomButton.module.css";

interface CustomButtonProps {
  children: ReactNode;
  onClick?: () => void;
  type?: "button" | "submit";
}

const CustomButton = ({
  children,
  onClick,
  type = "button",
}: CustomButtonProps) => {
  return (
    <button type={type} className={styles.button} onClick={onClick}>
      {children}
    </button>
  );
};

export default CustomButton;
