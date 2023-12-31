import { createContext, useLayoutEffect, useReducer } from "react";
import { useNavigate } from "react-router-dom";
import { useUrlPosition } from "../hooks/useUrlPosition";
import { useCities } from "../hooks/useCities";
import { useAuth } from "../hooks/useAuth";
import { convertToEmoji, generateRandomId } from "../utils/utils";

const BASE_URL = "https://api-bdc.net/data/reverse-geocode";
const REVERSE_GEOCODING_KEY = import.meta.env.VITE_REVERSE_GEOCODING_KEY;

const FormContext = createContext();

const initialState = {
  isLoadingGeocoding: false,
  cityName: "",
  country: "",
  date: new Date(),
  notes: "",
  emoji: "",
  geocodingError: "",
};

function reducer(state, action) {
  switch (action.type) {
    case "geocoding/loading":
      return { ...state, isLoadingGeocoding: true };
    case "cityname":
      return { ...state, isLoadingGeocoding: false, cityName: action.payload };
    case "country":
      return { ...state, isLoadingGeocoding: false, country: action.payload };
    case "date":
      return { ...state, isLoadingGeocoding: false, date: action.payload };
    case "notes":
      return { ...state, isLoadingGeocoding: false, notes: action.payload };
    case "emoji":
      return { ...state, isLoadingGeocoding: false, emoji: action.payload };
    case "geocoding/error":
      return {
        ...state,
        isLoadingGeocoding: false,
        geocodingError: action.payload,
      };
    case "geocoding/clear-error":
      return {
        ...state,
        geocodingError: "",
      };

    default:
      throw new Error(`Action type ${action.type} is not supported`);
  }
}

function FormProvider({ children }) {
  const { createCity } = useCities();
  const navigate = useNavigate();
  const [lat, lng] = useUrlPosition();
  const { user } = useAuth();
  const [
    {
      isLoadingGeocoding,
      cityName,
      country,
      date,
      notes,
      emoji,
      geocodingError,
    },
    dispatch,
  ] = useReducer(reducer, initialState);

  useLayoutEffect(
    function () {
      if (!lat || !lng) return;
      dispatch({ type: "geocoding/clear-error" });
      dispatch({ type: "geocoding/loading" });
      async function fetchCityData() {
        try {
          const res = await fetch(
            `${BASE_URL}?latitude=${lat}&longitude=${lng}&localityLanguage=en&key=${REVERSE_GEOCODING_KEY}`
          );
          const data = await res.json();
          console.log(data);

          if (!data.countryCode)
            throw new Error(
              "It doesn't seem to be a city. Click somewhere else 😉"
            );
          dispatch({
            type: "cityname",
            payload: data.city || data.locality || "",
          });
          dispatch({ type: "country", payload: data.countryName || "" });
          dispatch({
            type: "emoji",
            payload: convertToEmoji(data.countryCode),
          });
        } catch (err) {
          dispatch({ type: "geocoding/error", payload: "There was an error fetching the city..."});
        }
      }
      fetchCityData();
    },
    [lat, lng]
  );

  async function handleSubmit(e) {
    e.preventDefault();

    if (!cityName || !date) return;

    const newCity = {
      cityName,
      country,
      emoji,
      date,
      notes,
      position: { lat, lng },
      user,
      id: generateRandomId(5),
    };
    await createCity(newCity);
    navigate("/app/cities");
  }

  return (
    <FormContext.Provider
      value={{
        isLoadingGeocoding,
        cityName,
        country,
        date,
        notes,
        emoji,
        geocodingError,
        dispatch,
        handleSubmit,
        lat,
        lng,
        navigate,
        user,
      }}
    >
      {children}
    </FormContext.Provider>
  );
}

export { FormProvider, FormContext };
