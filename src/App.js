import { HelmetProvider } from "react-helmet-async";
import { Routes, Route } from "react-router-dom";
import React, { lazy, Suspense } from "react";

import Homepage from "./routes/Homepage";

function App() {
  return (
    <HelmetProvider>
      <Routes>
        <Route path="/" element={<Homepage />} />
      </Routes>
    </HelmetProvider>
  );
}

export default App;
