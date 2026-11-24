import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";

window.addEventListener("pageshow", (event) => {
  if (event.persisted) {
    window.location.reload();
  }
});

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<App />);
