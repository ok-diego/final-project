import React from "react";
import ReactDOM from "react-dom/client";
import App from "./components/App";
import { SimpleProvider } from "./components/SimpleContext";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <SimpleProvider>
    <App />
  </SimpleProvider>
);
