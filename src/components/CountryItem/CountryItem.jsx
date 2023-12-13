import { Link } from "react-router-dom";
import styles from "./CountryItem.module.css";
import { useCities } from "../../hooks/useCities";
import { formatCountryName } from "../../utils/utils";

function CountryItem({ country }) {
  const { currentCity } = useCities();
  console.log(currentCity, country, currentCity.country);

  return (
    <li>
      <Link to={`${country.country}`} className={styles.countryItem}>
        <span>{country.emoji}</span>
        <span>{formatCountryName(country.country)}</span>
      </Link>
    </li>
  );
}

export default CountryItem;
