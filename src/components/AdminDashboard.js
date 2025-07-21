import React, { useEffect, useState } from 'react';
import axios from 'axios';
import AdminAddTutor from './AdminAddTutor';

function AdminDashboard({ token }) {
  const [tuteurs, setTuteurs] = useState([]);
  const [refresh, setRefresh] = useState(false);

  useEffect(() => {
    axios.get('http://127.0.0.1:8000/api/tuteurs', {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then(res => setTuteurs(res.data))
      .catch(err => console.error(err));
  }, [token, refresh]);

  const handleDelete = async (id) => {
    if (!window.confirm('Confirmer la suppression du tuteur ?')) return;

    try {
      await axios.delete(`http://127.0.0.1:8000/api/tuteurs/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setRefresh(!refresh); // forcer le rechargement
    } catch (err) {
      alert("Erreur lors de la suppression");
    }
  };

  return (
    <div className="form-container">
      <h2>Tableau de bord Administrateur</h2>

      <h3>Ajouter un nouveau tuteur</h3>
      <AdminAddTutor token={token} />

      <h3>Liste des tuteurs existants</h3>
      <ul>
        {tuteurs.map((tuteur) => (
          <li key={tuteur.id}>
            {tuteur.nom} ({tuteur.email}) - {tuteur.specialite || "Aucune spécialité"}
            <button onClick={() => handleDelete(tuteur.id)}>Supprimer</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default AdminDashboard;
