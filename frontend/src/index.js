import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";
import { BookContextProvider } from "./context/BookContext";
import { AuthContextProvider } from "./context/AuthContext";

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <React.StrictMode>
    <AuthContextProvider>
      <BookContextProvider>
        <App />
      </BookContextProvider>
    </AuthContextProvider>
  </React.StrictMode>
);
