import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { Suspense, lazy } from "react";

// import Product from "./pages/Product/Product";
// import Pricing from "./pages/Pricing/Pricing";
// import Homepage from "./pages/Homepage/Homepage";
// import Login from "./pages/Login/Login";
// import AppLayout from "./pages/AppLayout/AppLayout";
// import PageNotFound from "./pages/PageNotFound/PageNotFound";

import ProtectedRoute from "./pages/ProtectedRoute/ProtectedRoute";

import City from "./components/City/City";
import CityList from "./components/CityList/CityList";
import CountryList from "./components/CountryList/CountryList";
import Form from "./components/Form/Form";
import SpinnerFullPage from "./components/SpinnerFullPage/SpinnerFullPage";

import { CitiesProvider } from "./contexts/CitiesContext";
import { AuthProvider } from "./contexts/FakeAuthContext";
import { FormProvider } from "./contexts/FormContext";
import CountryCityList from "./components/CountryCityList/CountryCityList";

const Homepage = lazy(() => import("./pages/Homepage/Homepage"));
const Product = lazy(() => import("./pages/Product/Product"));
const Pricing = lazy(() => import("./pages/Pricing/Pricing"));
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
              <Route path="product" element={<Product />} />
              <Route path="pricing" element={<Pricing />} />
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
                <Route path="countries/:country" element={<CountryCityList />} />

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
