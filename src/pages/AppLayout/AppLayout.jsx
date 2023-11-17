import Sidebar from "../../components/Sidebar/Sidebar";
import Map from "../../components/Map/Map";
import Footer from "../../components/Footer/Footer";
import styles from "./AppLayout.module.css";

function AppLayout() {
  return (
    <div className={styles.app}>
      <Sidebar />
      <Map />
      <Footer />
    </div>
  );
}

export default AppLayout;
