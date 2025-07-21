import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Login({ onLogin }) {
  const [email, setEmail] = useState("");
  const [motDePasse, setMotDePasse] = useState("");
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("http://127.0.0.1:8000/api/login", {
        email,
        mot_de_passe: motDePasse,
      });

      const { access_token, role } = res.data;

      // stocker token et rôle dans localStorage
      localStorage.setItem("token", access_token);
      localStorage.setItem("role", role);

      // informer App.js
      onLogin(access_token, role);

      // redirection selon le rôle
      if (role === "etudiant") {
        navigate("/tuteurs");
      } else if (role === "tuteur") {
        navigate("/rdvs");
      } else {
        navigate("/");
      }

    } catch (err) {
      setMessage("Identifiants incorrects");
    }
  };

  return (
    <div className="auth-container">
      <form className="auth-card" onSubmit={handleSubmit}>
        <h2>Connexion</h2>
        {message && <p style={{ color: "red" }}>{message}</p>}
        <input
          type="email"
          placeholder="Adresse email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Mot de passe"
          value={motDePasse}
          onChange={(e) => setMotDePasse(e.target.value)}
          required
        />
        <button type="submit">Se connecter</button>
      </form>
    </div>
  );
}

export default Login;
