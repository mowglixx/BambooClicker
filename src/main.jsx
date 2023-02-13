import React from "react";
import ReactDOM from "react-dom/client";
import Debug from "./Debug";
import App from "./App";

const debugFlag = import.meta.env.VITE_DEBUGFLAG;

ReactDOM.createRoot(document.querySelector("#gameCanvas")).render(
  <React.StrictMode>{debugFlag ? <Debug /> : <App />}</React.StrictMode>
);
