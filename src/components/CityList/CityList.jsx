import Spinner from "../Spinner/Spinner";
import CityItem from "../CityItem/CityItem";
import Message from "../Message/Message";
import styles from "./CityList.module.css";
import { useCities } from "../../hooks/useCities";

function CityList() {
  const { cities, isLoading } = useCities();

  if (isLoading) return <Spinner />;

  if (!cities.length)
    return (
      <Message message="Add your first city by clicking on the city on the map" />
    );

  const sortedCities = cities
    .filter((city) => typeof city.cityName === "string")
    .sort((a, b) => a.cityName.localeCompare(b.cityName));

  return (
    <ul className={styles.cityList}>
      {sortedCities.map((city) => (
        <CityItem city={city} key={city.id} />
      ))}
    </ul>
  );
}

export default CityList;
