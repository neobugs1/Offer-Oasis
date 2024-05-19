import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import Login from "./views/Login.jsx";
import Signup from "./views/Signup.jsx";
import Users from "./views/Users.jsx";
import NotFound from "./views/NotFound.jsx";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import DefaultHeader from "./headers/DefaultHeader.jsx";
import Dashboard from "./views/Dashboard.jsx";
import { ChakraProvider } from "@chakra-ui/react";
import Layout from "./layouts/Layout.jsx";
import MainContent from "./components/MainContent.jsx";
import { ContextProvider } from "./contexts/ContextProvider.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <ContextProvider>
      <ChakraProvider>
        <App />
      </ChakraProvider>
    </ContextProvider>
  </React.StrictMode>
);
