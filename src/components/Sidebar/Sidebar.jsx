import AppNav from '../AppNav/AppNav';
import Footer from '../Footer/Footer';
import Logo from '../Logo/Logo';
import styles from './Sidebar.module.css';

function Sidebar() {

  return (
    <div className={styles.sidebar}>
      <Logo />
      <AppNav />

      <p>List of Cities</p>
      <Footer />
    

    </div>
  )
}

export default Sidebar
