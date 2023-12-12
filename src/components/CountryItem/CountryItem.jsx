import { Link } from "react-router-dom";
import styles from "./CountryItem.module.css";
import { useCities } from "../../hooks/useCities";

function CountryItem({ country }) {
  const { currentCity } = useCities();
  console.log(currentCity, country, currentCity.country)

  return (
    <li className={styles.countryItem}>
      <Link
        to={`${country.country}`}
        className={`${styles.cityItem} ${
          country === currentCity.country ? styles["countryItem--active"] : ""
        }`}
      >
        <span>{country.emoji}</span>
        <span>{country.country}</span>
      </Link>
    </li>
  );
}

export default CountryItem;
