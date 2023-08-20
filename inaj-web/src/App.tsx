import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import NavSideBar from "./components/NavSideBar";
import Redirect from "./components/Redirect";
import Dashboard from "./pages/Dashboard";

import "./App.css";
import Profile from "./pages/Profile";
import Docs from "./pages/Docs";
import Emails from "./pages/Emails";
import Regs from "./pages/Regs";
import { AppBar, IconButton } from "@mui/material";
import Doc from "./pages/Doc";

function App() {
  return (
    <Router>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          minHeight: "100vh",
          paddingTop: "44.666667px",
        }}
      >
        <AppBar sx={{ background: "#5c33f6", boxShadow: "none" }}>
          <IconButton>Oi</IconButton>
        </AppBar>
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            flex: "1",
            position: "relative",
            minHeight: "calc(100vh - 44.666667px)",
          }}
        >
          <NavSideBar />
          <Routes>
            <Route path="/" element={<Redirect to="/app" />} />
            <Route path="/app">
              <Route path="" element={<Dashboard />} />
              <Route path="profile" element={<Profile />} />
              <Route path="docs" element={<Docs />} />
              <Route path="docs/:docId" element={<Doc />} />
              <Route path="sends" element={<Emails />} />
              <Route path="regs" element={<Regs />} />
            </Route>
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
