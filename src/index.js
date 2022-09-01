import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import Login from "./components/Login Page/Login";
import "bootstrap/dist/css/bootstrap.css";
import SideBar from "./components/Sidebar";
import sidebar_menu from "./constants/sidebar-menu";
import { BrowserRouter } from "react-router-dom";
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>
);
