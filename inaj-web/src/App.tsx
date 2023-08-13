import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import NavSideBar from "./components/NavSideBar";
import Redirect from "./components/Redirect";
import Dashboard from "./pages/Dashboard";

import "./App.css";
import Profile from "./pages/Profile";

function App() {
  return (
    <Router>
      <div style={{display: "flex", flexDirection: "row"}}>
        <NavSideBar />
        <Routes>
          <Route path="/" element={<Redirect to="/app" />} />
          <Route path="/app">
            <Route path="" element={<Dashboard />} />
            <Route path="profile" element={<Profile />} />
          </Route>
        </Routes>
        </div>
    </Router>
  );
}

export default App;
