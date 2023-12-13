import styles from "./PageNotFound.module.css";
import BackButton from "../../components/BackButton/BackButton";
function PageNotFound() {
  return (
    <div className={styles.pageNotFound}>
      <h1>Page not found 😢</h1>
      <BackButton reason="home">Back</BackButton>
    </div>
  );
}

export default PageNotFound;
