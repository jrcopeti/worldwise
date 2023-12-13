import { useCallback } from "react";
import { createContext, useEffect, useReducer } from "react";

const BASE_URL = "https://api.jsonbin.io/v3";

const CitiesContext = createContext();

const initialState = {
  cities: [],
  isLoading: false,
  currentCity: {},
  error: "",
};

function reducer(state, action) {
  switch (action.type) {
    case "loading":
      return { ...state, isLoading: true };
    case "cities/loaded":
      return { ...state, isLoading: false, cities: action.payload };

    case "city/loaded":
      return { ...state, isLoading: false, currentCity: action.payload };

    case "city/created":
      return {
        ...state,
        isLoading: false,
        cities: [...state.cities, action.payload],
        currentCity: action.payload,
      };

    case "city/deleted":
      return {
        ...state,
        isLoading: false,
        cities: state.cities.filter((city) => city.id !== action.payload),
        currentCity: {},
      };

    case "rejected":
      return { ...state, isLoading: false, error: action.payload };

    default:
      throw new Error(`Action type ${action.type} is not supported`);
  }
}

function CitiesProvider({ children }) {
  const [{ cities, isLoading, currentCity, error }, dispatch] = useReducer(
    reducer,
    initialState
  );

  useEffect(function () {
    async function fetchCities() {
      dispatch({ type: "loading" });
      try {
        const res = await fetch(
          `${BASE_URL}/b/${import.meta.env.VITE_BIN_ID}`,
          {
            method: "GET",
            headers: {
              "X-Master-Key": "$2a$10$6sbAeKB.oYZke0TvQSOTo.ejld21yuCcdbXEoHiAJjvtnsKhbmyIO",
              "X-Access-Key": "$2a$10$GGJRcHwjZu9gyNjaJoX6euSB13k.x2JVQaPD.mUiKk8ayireZVtlu",
            },
          }
        );
        const data = await res.json();
        dispatch({ type: "cities/loaded", payload: data.record.cities });
        console.log(data);
      } catch {
        dispatch({
          type: "rejected",
          payload: "There was an error loading cities...",
        });
      }
    }
    fetchCities();
  }, []);

  const getCity = useCallback(
    async function getCity(id) {
      if (Number(id) === currentCity.id) return;
      dispatch({ type: "loading" });
      try {
        const res = await fetch(
          `${BASE_URL}/b/${import.meta.env.VITE_BIN_ID}`,
          {
            method: "GET",
            headers: {
              "X-Master-Key": "$2a$10$6sbAeKB.oYZke0TvQSOTo.ejld21yuCcdbXEoHiAJjvtnsKhbmyIO",
              "X-Access-Key": "$2a$10$GGJRcHwjZu9gyNjaJoX6euSB13k.x2JVQaPD.mUiKk8ayireZVtlu",
            },
          }
        );

        const data = await res.json();
        const city = data.record.cities.find(city => city.id === Number(id));

        dispatch({ type: "city/loaded", payload: city });
        console.log(city);
      } catch (error) {
        console.error(error);
        dispatch({
          type: "rejected",
          payload: "There was an error loading the city...",
        });
      }
    },
    [currentCity.id]
  );


  async function createCity(newCity) {
    dispatch({ type: "loading" });
    try {
      // Fetch current data from the bin
      const fetchRes = await fetch(`${BASE_URL}/b/${import.meta.env.VITE_BIN_ID}`, {
        method: 'GET',
        headers: {
          "X-Master-Key": "$2a$10$6sbAeKB.oYZke0TvQSOTo.ejld21yuCcdbXEoHiAJjvtnsKhbmyIO",
          "X-Access-Key": "$2a$10$GGJRcHwjZu9gyNjaJoX6euSB13k.x2JVQaPD.mUiKk8ayireZVtlu",
        }
      });

      if (!fetchRes.ok) {
        throw new Error("Failed to fetch current data");
      }

      const currentData = await fetchRes.json();

      // Update the data with the new city
      const updatedCities = [...currentData.record.cities, newCity];

      // Put the updated data back into the bin
      const updateRes = await fetch(`${BASE_URL}/b/${import.meta.env.VITE_BIN_ID}`, {
        method: 'PUT',
        headers: {
          "Content-Type": "application/json",
          "X-Master-Key": "$2a$10$6sbAeKB.oYZke0TvQSOTo.ejld21yuCcdbXEoHiAJjvtnsKhbmyIO",
          "X-Access-Key": "$2a$10$GGJRcHwjZu9gyNjaJoX6euSB13k.x2JVQaPD.mUiKk8ayireZVtlu",
          // "X-Bin-Versioning": "true" // Uncomment if version control is needed
        },
        body: JSON.stringify({ cities: updatedCities }),
      });

      if (!updateRes.ok) {
        throw new Error("Failed to update the bin");
      }

      const updatedData = await updateRes.json();

      dispatch({ type: "city/created", payload: updatedData.record.cities });
    } catch (error) {
      console.error("Error creating city:", error);
      dispatch({
        type: "rejected",
        payload: "There was an error creating the city...",
      });
    }
  }


  async function deleteCity(id) {
    dispatch({ type: "loading" });
    try {
      await fetch(`${BASE_URL}/b/${import.meta.env.VITE_BIN_ID}`, {
        method: "DELETE",
        headers: {
          "X-Master-Key": "$2a$10$6sbAeKB.oYZke0TvQSOTo.ejld21yuCcdbXEoHiAJjvtnsKhbmyIO",
          "X-Access-Key": "$2a$10$GGJRcHwjZu9gyNjaJoX6euSB13k.x2JVQaPD.mUiKk8ayireZVtlu",
        },
      });

      dispatch({ type: "city/deleted", payload: id });
    } catch {
      dispatch({
        type: "rejected",
        payload: "There was an error deleting the city...",
      });
    }
  }

  return (
    <CitiesContext.Provider
      value={{
        cities,
        isLoading,
        currentCity,
        error,
        getCity,
        createCity,
        deleteCity,
      }}
    >
      {children}
    </CitiesContext.Provider>
  );
}

export { CitiesProvider, CitiesContext };
