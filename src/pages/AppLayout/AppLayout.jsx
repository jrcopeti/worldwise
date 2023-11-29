import Sidebar from "../../components/Sidebar/Sidebar";
import Map from "../../components/Map/Map";
import Footer from "../../components/Footer/Footer";
import styles from "./AppLayout.module.css";
import User from "../../components/User/User";

function AppLayout() {
  return (
    <div className={styles.app}>
      <Sidebar />
      <Map />
      <User />
      <Footer />
    </div>
  );
}

export default AppLayout;
