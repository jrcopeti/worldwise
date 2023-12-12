import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

import Button from "../Button/Button";
import BackButton from "../BackButton/BackButton";
import Message from "../Message/Message";
import Spinner from "../Spinner/Spinner";
import styles from "./Form.module.css";

import { useCities } from "../../hooks/useCities";
import { useForm } from "../../hooks/useForm";

function Form() {
  const { isLoading } = useCities();

  const {
    isLoadingGeocoding,
    cityName,
    date,
    notes,
    emoji,
    geocodingError,
    dispatch,
    lat,
    lng,
    handleSubmit,
    user,
  } = useForm();

  if (isLoadingGeocoding) return <Spinner />;

  if (!lat || !lng)
    return <Message message="Start by clicking on the map 👆" />;

  if (geocodingError) return <Message message={geocodingError} />;

  return (
    <form
      className={`${styles.form} ${isLoading ? styles.loading : ""}`}
      onSubmit={handleSubmit}
    >
      <div className={styles.row}>
        <label htmlFor="cityName">City name</label>
        <input
          id="cityName"
          onChange={(e) =>
            dispatch({ type: "cityname", payload: e.target.value })
          }
          value={cityName}
        />
        <span className={styles.flag}>{emoji}</span>
      </div>

      <div className={styles.row}>
        <label htmlFor="date">When did you go to {cityName}?</label>
        <DatePicker
          id="date"
          onChange={(date) => dispatch({ type: "date", payload: date })}
          selected={date}
          dateFormat="dd/MM/yyyy"
        />
      </div>

      <div className={styles.row}>
        <label htmlFor="notes">Notes about your trip to {cityName}</label>
        <textarea
          id="notes"
          onChange={(e) => dispatch({ type: "notes", payload: e.target.value })}
          value={notes}
        />
      </div>

      <input type="hidden" value={user} />

      <div className={styles.buttons}>
        <Button type="primary">Add</Button>
        <BackButton reason="back-form" />
      </div>
    </form>
  );
}

export default Form;
