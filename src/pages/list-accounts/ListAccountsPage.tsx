import AccountsTable from "../../components/accounts-table/AccountsTable";
import styles from "./ListAccountsPage.module.css";

const ListAccountsPage = () => {
  return (
    <section className={styles.container}>
      <h2>List Accounts</h2>
      <AccountsTable />
    </section>
  );
};

export default ListAccountsPage;
