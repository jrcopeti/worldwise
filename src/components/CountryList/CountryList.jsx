import { useCities } from "../../hooks/useCities";
import Spinner from "../Spinner/Spinner";
import CountryItem from "../CountryItem/CountryItem";
import Message from "../Message/Message";
import styles from "./CountryList.module.css";

function CountryList() {
  const { cities, isLoading } = useCities();
  if (isLoading) return <Spinner />;
  if (!cities.length)
    return (
      <Message message="Add your first city by clicking on the city on the map" />
    );

  const countries = cities.reduce((arr, city) => {
    if (!arr.map((el) => el.country).includes(city.country))
      return [...arr, { country: city.country, emoji: city.emoji }];
    else return arr;
  }, []);

  const sortedCountries = countries.sort((a, b) =>
    a.country.localeCompare(b.country)
  );

  return (
    <ul className={styles.countryList}>
      {sortedCountries.map((country) => (
        <CountryItem country={country} key={country.country} />
      ))}
    </ul>
  );
}

export default CountryList;
