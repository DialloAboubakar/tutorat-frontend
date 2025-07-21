import React from "react";
import { Link } from "react-router-dom";
import "../styles.css";

function Navbar({ onLogout, role }) {
  return (
    <nav className="navbar">
      <div className="navbar-brand">TutoratApp</div>
      <ul className="navbar-links">
        <li><Link to="/">Accueil</Link></li>
        {role === "etudiant" && <li><Link to="/tuteurs">Tuteurs</Link></li>}
        {role === "tuteur" && <li><Link to="/rendezvous">Mes Rendez-vous</Link></li>}
        <li><button className="logout-btn" onClick={onLogout}>Déconnexion</button></li>
      </ul>
    </nav>
  );
}

export default Navbar;
