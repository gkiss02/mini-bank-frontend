import { NavLink } from "react-router-dom";
import styles from "./MainNavigation.module.css";

const navLinks = [
  { to: "/", label: "Create account" },
  { to: "/list-accounts", label: "List accounts" },
  { to: "/transfer", label: "Transfer" },
  { to: "/withdraw", label: "Withdraw" },
  { to: "/deposit", label: "Deposit" },
];

const getNavLinkClassName = ({ isActive }: { isActive: boolean }) =>
  isActive ? styles.active : undefined;

const MainNavigation = () => {
  return (
    <nav>
      <ul className={styles.list}>
        {navLinks.map(({ to, label }) => (
          <li key={to}>
            <NavLink to={to} className={getNavLinkClassName}>
              {label}
            </NavLink>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default MainNavigation;
