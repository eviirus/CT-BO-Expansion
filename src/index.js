import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import "./styles/layout.css";
import "./styles/typography.css";
import "./styles/antd-override.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { BrowserRouter } from "react-router-dom";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <BrowserRouter basename="/CT-BO-Expansion">
    <App />
  </BrowserRouter>
);

reportWebVitals();
