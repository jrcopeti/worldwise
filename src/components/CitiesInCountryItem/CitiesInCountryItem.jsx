import { Link } from "react-router-dom";
import { useCities } from "../../hooks/useCities";
import styles from "./CitiesInCountryItem.module.css";
import { useAuth } from "../../hooks/useAuth";
import { formatDate } from "../../utils/utils";
import Message from "../Message/Message";

function CountryCityItem({ city }) {
  const { currentCity, deleteCity, error } = useCities();
  const { user: loginUser } = useAuth();
  const { cityName, emoji, date, id, position, user } = city;

  function handleClick(e) {
    e.preventDefault();
    deleteCity(id);
  }

  if (error) return <Message message={error} />;
  
  return (
    <li>
      <Link
        to={`/app/cities/${id}?lat=${position.lat}&lng=${position.lng}`}
        className={`${styles.countryCityItem} ${
          id === currentCity.id ? styles["countryCityItem--active"] : ""
        }`}
      >
        <span className={styles.emoji}>{emoji}</span>
        <h3 className={styles.name}> {cityName}</h3>
        <span className={styles.user}>{user}</span>
        <time className={styles.date}>{formatDate(date)}</time>
        {user === loginUser && (
          <button className={styles.deleteBtn} onClick={handleClick}>
            &times;
          </button>
        )}
      </Link>
    </li>
  );
}

export default CountryCityItem;
