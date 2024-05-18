import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Layout from "./layouts/Layout";
import Users from "./views/Users";
import Dashboard from "./views/Dashboard";
import NotFound from "./views/NotFound";
import Login from "./views/Login";
import Signup from "./views/Signup";
import MainContent from "./components/MainContent";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<MainContent />} />
          <Route path="users" element={<Users />} />
          <Route path="dashboard" element={<Dashboard />} />
        </Route>
        <Route path="*" element={<NotFound />} />
        <Route path="login" element={<Login />} />
        <Route path="signup" element={<Signup />} />
      </Routes>
    </Router>
  );
};

export default App;
