import type { BannerMessage } from "../../types/banner";
import styles from "./CustomBanner.module.css";

interface CustomBannerProps {
  message: BannerMessage;
}

const CustomBanner = ({ message }: CustomBannerProps) => {
  return <p className={styles[message.variant]}>{message.text}</p>;
};

export default CustomBanner;
