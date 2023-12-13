import {Link} from "react-router-dom"
import PageNav from "../../components/PageNav/PageNav";
import styles from "./Homepage.module.css";

export default function Homepage() {
  return (
    <main className={styles.homepage}>
      <PageNav />
      <section>
        <h1>
          You travel the world.
          <br />
          And share your stories.
        </h1>
        <h2>
          A world map that tracks your experiences in every city you have been.
         
        </h2>
        <Link to="/login" className="cta">
          Start Tracking Now
        </Link>
      </section>
    </main>
  );
}
