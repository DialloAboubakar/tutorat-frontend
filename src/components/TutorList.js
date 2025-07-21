import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom"; // pour redirection
import "../styles.css";

function TutorList({ token }) {
  const [tuteurs, setTuteurs] = useState([]);
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get("http://127.0.0.1:8000/api/tuteurs", {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => setTuteurs(res.data))
      .catch(() => setMessage("Erreur de chargement."));
  }, [token]);

  const handleSelectTutor = async (tuteurId) => {
    const date = prompt("Entrez la date (YYYY-MM-DD) :");
    const heure = prompt("Entrez l’heure (HH:MM) :");

    if (date && heure) {
      try {
        await axios.post(
  "http://127.0.0.1:8000/api/rendezvous",
  { id_tuteur: tuteurId, date, heure },
  { headers: { Authorization: `Bearer ${token}` } }
);

        setMessage("Rendez-vous réservé !");
      } catch (err) {
        setMessage("Erreur de réservation.");
      }
    }
  };

  return (
    <div className="tutor-list-container">
      <div className="header-with-button">
        <h2>Liste des Tuteurs</h2>
        <button className="chatbot-button" onClick={() => navigate("/chatbot")}>
          🤖 Chatbot
        </button>
      </div>

      {message && <p className="message">{message}</p>}

      <div className="tutor-grid">
        {tuteurs.map((tuteur) => (
          <div key={tuteur.id} className="tutor-card">
            <div className="avatar-placeholder">👨‍🏫</div>
            <h3>{tuteur.nom}</h3>
            <p><strong>Spécialité :</strong> {tuteur.specialite || "Non spécifiée"}</p>
            <button onClick={() => handleSelectTutor(tuteur.id)}>
              Réserver
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default TutorList;
