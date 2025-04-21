import React, { useState } from "react";
import { Modal, Button, Form } from "react-bootstrap";

const AddUserModal = ({ type, onClose }) => {
  const [formData, setFormData] = useState({
    nom: "",
    prenom: "",
    email: "",
    role: type === "enseignant" ? "Encadrant" : "Étudiant",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Nouvel utilisateur ajouté :", formData);
    onClose(); // Fermer le modal après soumission
  };

  return (
    <Modal show onHide={onClose} centered>
      <Modal.Header closeButton>
        <Modal.Title>Ajouter {type === "enseignant" ? "un Enseignant" : "un Étudiant"}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-3">
            <Form.Label>Nom</Form.Label>
            <Form.Control type="text" name="nom" value={formData.nom} onChange={handleChange} required />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Prénom</Form.Label>
            <Form.Control type="text" name="prenom" value={formData.prenom} onChange={handleChange} required />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Email</Form.Label>
            <Form.Control type="email" name="email" value={formData.email} onChange={handleChange} required />
          </Form.Group>

          {type === "enseignant" && (
            <Form.Group className="mb-3">
              <Form.Label>Rôle</Form.Label>
              <Form.Select name="role" value={formData.role} onChange={handleChange}>
                <option value="Encadrant">Encadrant</option>
                <option value="Président Jury">Président du Jury</option>
                <option value="Rapporteur">Rapporteur</option>
              </Form.Select>
            </Form.Group>
          )}

          <div className="d-flex justify-content-end">
            <Button variant="secondary" onClick={onClose} className="me-2">
              Annuler
            </Button>
            <Button variant="primary" type="submit">
              Ajouter
            </Button>
          </div>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default AddUserModal;
