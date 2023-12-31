import { useParams } from "react-router-dom";
import { useCities } from "../../hooks/useCities";
import styles from "./CitiesInCountryList.module.css";
import Spinner from "../Spinner/Spinner";
import CitiesInCountryItem from "../CitiesInCountryItem/CitiesInCountryItem";
import { formatCountryName } from "../../utils/utils";

function CountryCityList() {
  const { cities, isLoading } = useCities();
  const { country } = useParams();

  const citiesInCountry = cities.filter((city) => city.country === country);

  if (isLoading) return <Spinner />;

  return (
    <>
      <h1>Places in {formatCountryName(country)}</h1>
      <ul className={styles.countryCityList}>
        {citiesInCountry.map((city) => (
          <CitiesInCountryItem city={city} key={city.id} />
        ))}
      </ul>
    </>
  );
}

export default CountryCityList;
