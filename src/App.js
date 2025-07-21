import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Login from "./components/Login";
import Register from "./components/Register";
import TutorList from "./components/TutorList";
import TutorAppointments from "./components/TutorAppointments";
import Home from "./components/Home";
import Navbar from "./components/Navbar"; // ✅
import "./styles.css";
import AdminDashboard from "./components/AdminDashboard";
import Chatbot from "./components/Chatbot";


function App() {
  const [token, setToken] = useState(localStorage.getItem("token") || "");
  const [role, setRole] = useState(localStorage.getItem("role") || "");

const handleLogin = (token, role) => {
  localStorage.setItem("token", token);
  localStorage.setItem("role", role);
  setToken(token);
  setRole(role);
};


  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    setToken("");
    setRole("");
  };

  return (
    <Router>
      <div className="App">
        <Navbar token={token} role={role} onLogout={handleLogout} /> {/* ✅ toujours visible */}
        <Routes>
          {!token ? (
            <>
              <Route path="/" element={<Home />} />
              <Route path="/login" element={<Login onLogin={handleLogin} />} />
 
              <Route path="/register" element={<Register />} />
              <Route path="*" element={<Navigate to="/" />} />
            </>
          ) : role === "etudiant" ? (
            <>
              <Route path="/tuteurs" element={<TutorList token={token} />} />
              <Route path="/chatbot" element={<Chatbot />} />

              <Route path="/rdvs" element={<TutorAppointments token={token} />} />
              <Route path="*" element={<Navigate to="/tuteurs" />} />
            </>
          ) : (
            <>
              <Route path="/rdvs" element={<TutorAppointments token={token} />} />
              <Route path="*" element={<Navigate to="/rdvs" />} />
              <Route path="/admin" element={<AdminDashboard token={token} />} />
              

            </>
          )}
        </Routes>
      </div>
    </Router>
    
  );
}

export default App;
