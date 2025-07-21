import React, { useEffect, useState } from "react";
import axios from "axios";
import "../styles.css";

function TutorAppointments({ token }) {
  const [rendezvous, setRendezvous] = useState([]);
  const [message, setMessage] = useState("");

  useEffect(() => {
    if (!token) return;

    axios
      .get("http://127.0.0.1:8000/api/rendezvous", {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => {
        setRendezvous(res.data);
        if (res.data.length === 0) {
          setMessage("Aucun rendez-vous pour l’instant.");
        }
      })
      .catch((err) => {
        console.error(err);
        setMessage("Erreur de chargement des rendez-vous.");
      });
  }, [token]);

  const handleAnnulerRdv = async (id) => {
    const confirmation = window.confirm("Voulez-vous vraiment annuler ce rendez-vous ?");
    if (!confirmation) return;

    try {
      await axios.delete(`http://127.0.0.1:8000/api/rendezvous/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setRendezvous((prev) => prev.filter((rdv) => rdv.id !== id));
      alert("✅ Rendez-vous annulé !");
    } catch (error) {
      console.error(error);
      alert("❌ Échec de l’annulation du rendez-vous.");
    }
  };

  return (
    <div className="form-container">
      <h2>📅 Mes Rendez-vous</h2>
      {message && <p>{message}</p>}

      {rendezvous.map((rdv) => (
        <div key={rdv.id} className="card">
          <p><strong>Étudiant :</strong> {rdv.nom_etudiant}</p>
          <p><strong>Date :</strong> {rdv.date}</p>
          <p><strong>Heure :</strong> {rdv.heure}</p>
          <button onClick={() => handleAnnulerRdv(rdv.id)} className="cancel-btn">
            ❌ Annuler
          </button>
        </div>
      ))}
    </div>
  );
}

export default TutorAppointments;
