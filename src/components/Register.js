import React, { useState } from "react";
import axios from "axios";

function Register() {
  const [nom, setNom] = useState("");
  const [email, setEmail] = useState("");
  const [motDePasse, setMotDePasse] = useState("");
  const [role, setRole] = useState("etudiant");
  const [specialite, setSpecialite] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await axios.post("http://127.0.0.1:8000/api/register", {
        nom,
        email,
        mot_de_passe: motDePasse,
        role,
        specialite: role === "tuteur" ? specialite : null,
      });

      setMessage("Inscription réussie. Vous pouvez maintenant vous connecter.");
    } catch (error) {
      setMessage("Erreur lors de l'inscription.");
    }
  };

  return (
    <div className="auth-container">
      <form className="auth-card" onSubmit={handleSubmit}>
        <h2>Inscription</h2>
        {message && <p>{message}</p>}
        <input
          type="text"
          placeholder="Nom complet"
          value={nom}
          onChange={(e) => setNom(e.target.value)}
          required
        />
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
        <select value={role} onChange={(e) => setRole(e.target.value)}>
          <option value="etudiant">Étudiant</option>
          <option value="tuteur">Tuteur</option>
        </select>

        {/* Spécialité visible seulement pour les tuteurs */}
        {role === "tuteur" && (
          <input
            type="text"
            placeholder="Spécialité (ex : Math, Anglais, etc.)"
            value={specialite}
            onChange={(e) => setSpecialite(e.target.value)}
            required
          />
        )}

        <button type="submit">S’inscrire</button>
      </form>
    </div>
  );
}

export default Register;
