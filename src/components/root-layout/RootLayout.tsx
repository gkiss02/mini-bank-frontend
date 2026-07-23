import { Outlet } from "react-router-dom";
import MainNavigation from "../main-navigation/MainNavigation";
import styles from "./RootLayout.module.css";

const RootLayout = () => {
  return (
    <>
      <header className={styles["header"]}>
        <h1 className={styles["header-title"]}>MiniBank</h1>
        <p className={styles["header-subtitle"]}>EUR accounts - demo</p>
      </header>
      <MainNavigation />
      <main>
        <Outlet />
      </main>
    </>
  );
};

export default RootLayout;
