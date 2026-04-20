import React from "react";
import ReactDOM from "react-dom/client";
import "../styles/index.css";

export function renderPage(PageComponent) {
  ReactDOM.createRoot(document.getElementById("root")).render(
    <React.StrictMode>
      <PageComponent />
    </React.StrictMode>
  );
}
