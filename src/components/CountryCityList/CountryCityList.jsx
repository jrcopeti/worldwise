import { useParams } from "react-router-dom"
import { useCities } from "../../hooks/useCities"
import CityItem from "../CityItem/CityItem"
import styles from "./CountryCityList.module.css"
import CountryCityItem from "../CountryCityItem/CountryCityItem"

function CountryCityList() {
 const {cities} = useCities()
 const {country} = useParams()

  const citiesInCountry = cities.filter(city => city.country === country)
  console.log(citiesInCountry)

  return (
    <div>
    <h1>Cities in {country}</h1>
    <ul className={styles.CountryCityList}>
      {citiesInCountry.map((city) => (
        <CountryCityItem city={city} key={city.id} />
      ))}
    </ul>
  </div>
);
}

export default CountryCityList
