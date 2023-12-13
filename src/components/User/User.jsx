import { useAuth } from "../../hooks/useAuth";
import styles from "./User.module.css";
import Logout from "../Logout/Logout";

function User() {
  const { user } = useAuth();

  return (
    <div className={styles.user}>
      <span>Welcome, {user}</span>
      <Logout>Logout</Logout>
    </div>
  );
}

export default User;
