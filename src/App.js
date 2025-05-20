import { HelmetProvider } from "react-helmet-async";
import { Routes, Route } from "react-router-dom";
import React, { lazy, Suspense } from "react";

import Homepage from "./routes/Homepage";
import AppLayout from "./layouts/AppLayout";

const ExcursionPageGenerator = lazy(() =>
  import("./routes/landing-pages/excursions/ExcursionPageGenerator")
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
          </Route>
        </Routes>
      </Suspense>
    </HelmetProvider>
  );
}

export default App;
