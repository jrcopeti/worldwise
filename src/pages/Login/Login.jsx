import { useEffect, useState } from "react";
import { useAuth } from "../../hooks/useAuth";
import Button from "../../components/Button/Button";

import styles from "./Login.module.css";
import PageNav from "../../components/PageNav/PageNav";
import { useNavigate } from "react-router-dom";

 function Login() {
  // PRE-FILL FOR DEV PURPOSES
  const [name, setName] = useState("");

  const { login, isAuthenticated } = useAuth();
  const navigate = useNavigate();

  function handleSubmit(e) {
    e.preventDefault();
    if (name) login(name);
  }

  useEffect(
    function () {
      if (isAuthenticated) navigate("/app", { replace: true });
    },
    [isAuthenticated, navigate]
  );

  return (
    <main className={styles.login}>
      <PageNav />
      <form className={styles.form} onSubmit={handleSubmit}>
        <div className={styles.row}>
          <label htmlFor="name">Name</label>
          <input
            type="name"
            id="name"
            required
            onChange={(e) => setName(e.target.value)}
            value={name}
          />
        </div>

        <div>
          <Button type="primary">Go</Button>
        </div>
      </form>
    </main>
  );
}

export default Login;
