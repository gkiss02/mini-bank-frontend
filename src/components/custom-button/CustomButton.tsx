import type { ReactNode } from "react";
import styles from "./CustomButton.module.css";

interface CustomButtonProps {
  children: ReactNode;
  onClick: () => void;
}

const CustomButton = ({ children, onClick }: CustomButtonProps) => {
  return (
    <button className={styles.button} onClick={onClick}>
      {children}
    </button>
  );
};

export default CustomButton;
