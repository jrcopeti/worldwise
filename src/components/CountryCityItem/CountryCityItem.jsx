import { Link } from "react-router-dom";
import { useCities } from "../../hooks/useCities";
import styles from "./CountryCityItem.module.css";

const formatDate = (date) =>
  new Intl.DateTimeFormat("en-GB", {
    day: "numeric",
    month: "numeric",
    year: "numeric",
  }).format(new Date(date));

function CountryCityItem({ city }) {
  const { currentCity, deleteCity } = useCities();
  const { cityName, emoji, date, id, position, user } = city;
  console.log(currentCity, cityName)

  function handleClick(e) {
    e.preventDefault();
    deleteCity(id);
  }
  return (
    <li>
      <Link
        to={`/app/cities/${id}?lat=${position.lat}&lng=${position.lng}`}
        className={`${styles.cityItem} ${
          id === currentCity.id ? styles["cityItem--active"] : ""
        }`}
      >
        <span className={styles.emoji}>{emoji}</span>
        <h3 className={styles.name}> {cityName}</h3>
        <span className={styles.user}>{user}</span>
        <time className={styles.date}>{formatDate(date)}</time>
        <button className={styles.deleteBtn} onClick={handleClick}>
          &times;
        </button>
      </Link>
    </li>
  );
}

export default CountryCityItem;
