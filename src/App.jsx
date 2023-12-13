import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { Suspense, lazy } from "react";

import ProtectedRoute from "./pages/ProtectedRoute/ProtectedRoute";

import City from "./components/City/City";
import CityList from "./components/CityList/CityList";
import CountryList from "./components/CountryList/CountryList";
import Form from "./components/Form/Form";
import SpinnerFullPage from "./components/SpinnerFullPage/SpinnerFullPage";
import CitiesInCountryList from "./components/CitiesInCountryList/CitiesInCountryList";

import { CitiesProvider } from "./contexts/CitiesContext";
import { AuthProvider } from "./contexts/FakeAuthContext";
import { FormProvider } from "./contexts/FormContext";

const Homepage = lazy(() => import("./pages/Homepage/Homepage"));
const About = lazy(() => import("./pages/About/About"));
const HowToUse = lazy(() => import("./pages/HowToUse/HowToUse"));
const Login = lazy(() => import("./pages/Login/Login"));
const AppLayout = lazy(() => import("./pages/AppLayout/AppLayout"));
const PageNotFound = lazy(() => import("./pages/PageNotFound/PageNotFound"));

function App() {
  return (
    <AuthProvider>
      <CitiesProvider>
        <BrowserRouter>
          <Suspense fallback={<SpinnerFullPage />}>
            <Routes>
              <Route index element={<Homepage />} />
              <Route path="about" element={<About />} />
              <Route path="how-to-use" element={<HowToUse />} />
              <Route path="login" element={<Login />} />
              <Route
                path="app"
                element={
                  <ProtectedRoute>
                    <AppLayout />
                  </ProtectedRoute>
                }
              >
                <Route index element={<Navigate replace to="cities" />} />
                <Route path="cities" element={<CityList />} />
                <Route path="cities/:id" element={<City />} />
                <Route path="countries" element={<CountryList />} />
                <Route
                  path="countries/:country"
                  element={<CitiesInCountryList />}
                />

                <Route
                  path="form"
                  element={
                    <FormProvider>
                      <Form />
                    </FormProvider>
                  }
                />
              </Route>

              <Route path="*" element={<PageNotFound />} />
            </Routes>
          </Suspense>
        </BrowserRouter>
      </CitiesProvider>
    </AuthProvider>
  );
}

export default App;
