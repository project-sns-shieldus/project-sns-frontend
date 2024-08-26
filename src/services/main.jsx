import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import Home from "../pages/Home.jsx";
import Login from "../pages/Login.jsx";
import Signup from "../pages/Signup.jsx";
import "../css/root.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <>
      <Router>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/home" element={<Home />} />
        </Routes>
      </Router>
    </>
  </StrictMode>
);
