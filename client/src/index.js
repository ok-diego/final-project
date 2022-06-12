// Module imports
import React from "react";
import ReactDOM from "react-dom/client";
import { Auth0Provider } from "@auth0/auth0-react";
import { createRoot } from "react-dom/client";

// Local imports
import { SimpleProvider } from "./components/SimpleContext";
import App from "./components/App";

// process is a global node object - it's asking for the info inside .env
const { REACT_APP_AUTH0_DOMAIN, REACT_APP_AUTH0_CLIENT_ID } = process.env;

// console.log(REACT_APP_AUTH0_DOMAIN, REACT_APP_AUTH0_CLIENT_ID);

const container = document.getElementById("root");
const root = createRoot(container);
// const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <Auth0Provider
    domain={REACT_APP_AUTH0_DOMAIN}
    clientId={REACT_APP_AUTH0_CLIENT_ID}
    redirectUri={window.location.origin}
  >
    <SimpleProvider>
      <App />
    </SimpleProvider>
  </Auth0Provider>
);
