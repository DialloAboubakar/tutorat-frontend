import React from "react";
import { Link } from "react-router-dom";

function Home() {
  return (
    <div className="accueil-container">
      <img
        src="/tutoring-banner.jpg"
        alt="Séance de tutorat"
        className="accueil-image"
      />

      <div className="accueil-content">
        <h1 className="accueil-title">Bienvenue sur Tutorat+</h1>
        <p className="accueil-subtitle">
          Trouvez un tuteur ou gérez vos rendez-vous facilement.
        </p>

        <div className="accueil-buttons">
          <Link to="/login">Se connecter</Link>
          <Link to="/register" className="register">S’inscrire</Link>
        </div>
      </div>
    </div>
  );
}

export default Home;
