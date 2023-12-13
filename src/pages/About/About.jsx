import PageNav from "../../components/PageNav/PageNav";
import styles from "./About.module.css";

function About() {
  return (
    <main className={styles.about}>
      <PageNav />
      <section>
        <img
          src="img-1.jpg"
          alt="person with dog overlooking mountain with sunset"
        />
        <div>
          <h2>About WorldWise</h2>
          <p>
            WorldWise is a travel app that allows you to track your trips to
            every city you have been. Share your unique experiences, or get
            inspired by other travellers.
          </p>
        </div>
      </section>
    </main>
  );
}

export default About;
