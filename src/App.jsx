import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useState, useEffect } from "react";

import Product from "./pages/Product/Product";
import Pricing from "./pages/Pricing/Pricing";
import Homepage from "./pages/Homepage/Homepage";
import Login from "./pages/Login/Login";
import AppLayout from "./pages/AppLayout/AppLayout";
import PageNotFound from "./pages/PageNotFound/PageNotFound";
import City from "./components/City/City";
import CityList from "./components/CityList/CityList";
import CountryList from "./components/CountryList/CountryList";


const BASE_URL = "http://localhost:8000";
function App() {
  const [cities, setCities] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(function () {
    async function fetchCities() {
      try {
        setIsLoading(true);
        const res = await fetch(`${BASE_URL}/cities`);
        const data = await res.json();
        console.log(data);
        setCities(data);
      } catch {
        console.error("Something went wrong");
      } finally {
        setIsLoading(false);
      }
    }
    fetchCities();
  }, []);

  return (
    <BrowserRouter>
      <Routes>
        <Route index element={<Homepage />} />
        <Route path="product" element={<Product />} />
        <Route path="pricing" element={<Pricing />} />
        <Route path="/login" element={<Login />} />
        <Route path="app" element={<AppLayout />}>
          <Route
            index
            element={<CityList cities={cities} isLoading={isLoading} />}
          />
          <Route
            path="cities"
            element={<CityList cities={cities} isLoading={isLoading} />}
          />
          <Route path = "cities/:id" element={<City/>}/>
          <Route path="countries" element={<CountryList cities={cities} isLoading={isLoading}/>} />
          <Route path="form" element={<p>Form</p>} />
        </Route>

        <Route path="*" element={<PageNotFound />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
