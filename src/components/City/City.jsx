import { useParams } from "react-router-dom";
import { useEffect } from "react";
import { useCities } from "../../hooks/useCities";
import Spinner from "../Spinner/Spinner";
import styles from "./City.module.css";
import BackButton from "../BackButton/BackButton";

const formatDate = (date) =>
  new Intl.DateTimeFormat("en", {
    day: "numeric",
    month: "long",
    year: "numeric",
    weekday: "long",
  }).format(new Date(date));

function City() {
  const { id } = useParams();
  const { getCity, currentCity, isLoading } = useCities();

  useEffect(
    function () {
      getCity(id);
    },
    [id, getCity]
  );

  const { cityName, emoji, date, notes, user } = currentCity;

  if (isLoading) return <Spinner />;

  return (
    currentCity.id === +id && (
      <div className={styles.city}>
        <div className={styles.row}>
          <h6>City name</h6>
          <h3>
            <span>{emoji}</span> {cityName}
          </h3>
        </div>

        <div className={styles.row}>
          <h6>{user} went to {cityName} on </h6>
          <p>{formatDate(date || null)}</p>
        </div>

        {notes && (
          <div className={styles.row}>
            <h6>Notes</h6>
            <p>{notes}</p>
          </div>
        )}

        <div className={styles.row}>
          <h6>Created by</h6>
          <p>{user}</p>
        </div>

        <div className={styles.row}>
          <h6>Learn more</h6>
          <a
            href={`https://en.wikipedia.org/wiki/${cityName}`}
            target="_blank"
            rel="noreferrer"
          >
            Check out {cityName} on Wikipedia &rarr;
          </a>
        </div>

        <div>
          <BackButton reason="back-1" />
        </div>
      </div>
    )
  );
}

export default City;
