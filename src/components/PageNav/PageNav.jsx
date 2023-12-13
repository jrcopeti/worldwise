import { NavLink } from "react-router-dom";
import styles from "./PageNav.module.css";
import Logo from "../Logo/Logo";
import { useAuth } from "../../hooks/useAuth";
import Logout from "../Logout/Logout";

function PageNav() {
  const { isAuthenticated } = useAuth();
  return (
    <nav className={styles.nav}>
      <Logo />
      <ul>
        <li>
          <NavLink to="/about">About</NavLink>
        </li>
        <li>
          <NavLink to="/how-to-use">Usage</NavLink>
        </li>
        <li>
          {isAuthenticated ? (
            <Logout>Logout</Logout>
          ) : (
            <NavLink to="/login" className={styles.ctaLink}>
              Login
            </NavLink>
          )}
        </li>
      </ul>
    </nav>
  );
}

export default PageNav;
