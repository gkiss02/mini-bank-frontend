import { useNavigate } from "react-router-dom";
import styles from "./ErrorPage.module.css";
import CustomButton from "../../components/custom-button/CustomButton";

const ErrorPage = () => {
  const navigate = useNavigate();

  return (
    <section className={styles.container}>
      <h2 className={styles.title}>{"Page not found"}</h2>
      <p className={styles.message}>
        The page you're looking for doesn't exist or has moved.
      </p>
      <CustomButton onClick={() => navigate("/")}>Back to home</CustomButton>
    </section>
  );
};

export default ErrorPage;
