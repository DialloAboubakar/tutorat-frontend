import React, { useState } from 'react';
import axios from 'axios';

function AdminAddTutor({ token }) {
  const [form, setForm] = useState({
    nom: '',
    email: '',
    mot_de_passe: '',
    specialite: '',
  });
  const [message, setMessage] = useState('');

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post(
        'http://127.0.0.1:8000/api/register/tuteur',
        form,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setMessage('✅ Tuteur ajouté avec succès !');
      setForm({ nom: '', email: '', mot_de_passe: '', specialite: '' });
    } catch (error) {
      console.error(error);
      setMessage('❌ Erreur : ' + (error.response?.data?.detail || 'Inconnue'));
    }
  };

  return (
    <div className="form-container">
      <h2>Ajouter un Tuteur</h2>
      {message && <p>{message}</p>}
      <form onSubmit={handleSubmit}>
        <input
          name="nom"
          placeholder="Nom"
          value={form.nom}
          onChange={handleChange}
          required
        />
        <input
          name="email"
          type="email"
          placeholder="Email"
          value={form.email}
          onChange={handleChange}
          required
        />
        <input
          name="mot_de_passe"
          type="password"
          placeholder="Mot de passe"
          value={form.mot_de_passe}
          onChange={handleChange}
          required
        />
        <input
          name="specialite"
          placeholder="Spécialité"
          value={form.specialite}
          onChange={handleChange}
        />
        <button type="submit">Ajouter le Tuteur</button>
      </form>
    </div>
  );
}

export default AdminAddTutor;
