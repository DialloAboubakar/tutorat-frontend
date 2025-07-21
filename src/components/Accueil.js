// src/components/Accueil.js
import React from "react";
import { Link } from "react-router-dom";
import "../styles.css";

const Accueil = () => {
  return (
    <div className="accueil-container">
      <h1>Bienvenue dans Tutora App</h1>
      <div className="button-group">
        <Link to="/login">
          <button className="primary-button">Connexion</button>
        </Link>
        <Link to="/register">
          <button className="primary-button">Inscription</button>
        </Link>
      </div>
    </div>
  );
};

export default Accueil;
