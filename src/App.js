import { HelmetProvider } from "react-helmet-async";
import { Routes, Route } from "react-router-dom";
import React, { lazy, Suspense } from "react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import Homepage from "./routes/Homepage";
import AppLayout from "./layouts/AppLayout";

const ExcursionPageGenerator = lazy(() =>
  import("./routes/landing-pages/excursions/ExcursionPageGenerator")
);
const CardsWithOffers = lazy(() =>
  import("./routes/widgets/static-widget-generator/CardsWithOffers")
);

function App() {
  return (
    <HelmetProvider>
      <Suspense fallback={<div>Loading...</div>}>
        <Routes>
          <Route element={<AppLayout />}>
            <Route path="/" element={<Homepage />} />
            <Route path="landing-pages">
              <Route path="excursions">
                <Route
                  path="excursion-page-generator"
                  element={<ExcursionPageGenerator />}
                />
              </Route>
            </Route>
            <Route path="widgets">
              <Route path="static-widget-generator">
                <Route path="cards-with-offers" element={<CardsWithOffers />} />
              </Route>
            </Route>
          </Route>
        </Routes>
      </Suspense>
      <ToastContainer />
    </HelmetProvider>
  );
}

export default App;
