// Uses the same styles as Product
import PageNav from "../../components/PageNav/PageNav";
import styles from "../HowToUse/HowToUse.module.css";

function HowToUse() {
  return (
    <main className={styles.howToUse}>
      <PageNav />
      <section>
        <div>
          <h2>
            Simple to use.
            <br />
            Easy to manage.
          </h2>
          <p>
            Login with your name, click on the map, and write your notes.
            It's that easy!
          </p>
        </div>
        <img src="img-2.jpg" alt="overview of a large city with skyscrapers" />
      </section>
    </main>
  );
}

export default HowToUse;
