import { Link } from "react-router-dom";
import styles from "./CountryItem.module.css";
import { useCities } from "../../hooks/useCities";

function formatCountryName(countryName) {
  switch (countryName) {
    case "United States of America (the)":
      return "United States";
    case "United Kingdom of Great Britain and Northern Ireland (the)":
      return "United Kingdom";
    case "Russian Federation (the)":
      return "Russia";
    case "Korea (the Republic of)":
      return "South Korea";
    case "Korea (the Democratic People's Republic of)":
      return "North Korea";
    case "Viet Nam":
      return "Vietnam";
    case "Iran (Islamic Republic of)":
      return "Iran";
    case "Syrian Arab Republic":
      return "Syria";
    case "Tanzania, United Republic of":
      return "Tanzania";
    case "Congo (the Democratic Republic of the)":
      return "Congo";
    case "Congo (the)":
      return "Congo";
    case "Venezuela (Bolivarian Republic of)":
      return "Venezuela";
    case "Bolivia (Plurinational State of)":
      return "Bolivia";
    case "Lao People's Democratic Republic (the)":
      return "Laos";
    case "Moldova (the Republic of)":
      return "Moldova";
    case "Netherlands (the)":
      return "Netherlands";
    default:
      return countryName;
  }
}

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
