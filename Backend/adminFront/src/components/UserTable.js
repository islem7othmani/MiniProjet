import React, { useState } from "react";
import { FiEdit2, FiTrash2, FiUserPlus } from "react-icons/fi";
import { Modal, Button, Form } from "react-bootstrap";

const UserTable = () => {
  const [users, setUsers] = useState([
    { id: 1, nom: "Dupont", prenom: "Jean", role: "Encadrant", email: "jean@example.com" },
    { id: 2, nom: "Martin", prenom: "Sophie", role: "Président Jury", email: "sophie@example.com" }
  ]);

  const roleColors = {
    Encadrant: "bg-primary",
    "Président Jury": "bg-success",
    Rapporteur: "bg-danger",
    Étudiant: "bg-secondary"
  };

  const [selectedUser, setSelectedUser] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [userToDelete, setUserToDelete] = useState(null);
  const [newUser, setNewUser] = useState({ nom: "", prenom: "", role: "Étudiant", email: "" });

  const handleAddUser = () => {
    if (selectedUser) {
      setUsers(users.map(u => (u.id === selectedUser.id ? selectedUser : u)));
    } else {
      setUsers([...users, { ...newUser, id: users.length + 1 }]);
    }
    setShowModal(false);
    setNewUser({ nom: "", prenom: "", role: "Étudiant", email: "" });
    setSelectedUser(null);
  };

  const handleDeleteUser = () => {
    setUsers(users.filter(u => u.id !== userToDelete.id));
    setShowDeleteModal(false);
    setUserToDelete(null);
  };

  return (
    <div className="container mt-4">
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h4 className="fw-bold text-dark">Gestion des Utilisateurs</h4>
        <Button variant="dark" onClick={() => setShowModal(true)}>
          <FiUserPlus className="me-2" /> Ajouter un utilisateur
        </Button>
      </div>

      <table className="table table-hover align-middle shadow-sm">
        <thead className="table-light">
          <tr>
            <th>Nom</th>
            <th>Prénom</th>
            <th>Rôle</th>
            <th>Email</th>
            <th className="text-center">Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.id}>
              <td>{user.nom}</td>
              <td>{user.prenom}</td>
              <td>
                <span className={`badge ${roleColors[user.role] || "bg-secondary"}`}>
                  {user.role}
                </span>
              </td>
              <td>{user.email}</td>
              <td className="text-center">
                <FiEdit2
                  size={18}
                  className="text-success me-3 cursor-pointer"
                  onClick={() => { setSelectedUser(user); setShowModal(true); }}
                />
                <FiTrash2
                  size={18}
                  className="text-danger cursor-pointer"
                  onClick={() => { setUserToDelete(user); setShowDeleteModal(true); }}
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <Modal show={showModal} onHide={() => { setShowModal(false); setSelectedUser(null); }} centered>
        <Modal.Header closeButton>
          <Modal.Title>{selectedUser ? "Modifier l'utilisateur" : "Ajouter un utilisateur"}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3">
              <Form.Label>Nom</Form.Label>
              <Form.Control
                type="text"
                value={selectedUser ? selectedUser.nom : newUser.nom}
                onChange={(e) => selectedUser ? setSelectedUser({ ...selectedUser, nom: e.target.value }) : setNewUser({ ...newUser, nom: e.target.value })}
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Prénom</Form.Label>
              <Form.Control
                type="text"
                value={selectedUser ? selectedUser.prenom : newUser.prenom}
                onChange={(e) => selectedUser ? setSelectedUser({ ...selectedUser, prenom: e.target.value }) : setNewUser({ ...newUser, prenom: e.target.value })}
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                value={selectedUser ? selectedUser.email : newUser.email}
                onChange={(e) => selectedUser ? setSelectedUser({ ...selectedUser, email: e.target.value }) : setNewUser({ ...newUser, email: e.target.value })}
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Rôle</Form.Label>
              <Form.Select
                value={selectedUser ? selectedUser.role : newUser.role}
                onChange={(e) => selectedUser ? setSelectedUser({ ...selectedUser, role: e.target.value }) : setNewUser({ ...newUser, role: e.target.value })}
              >
                <option value="Encadrant">Encadrant</option>
                <option value="Président Jury">Président du Jury</option>
                <option value="Rapporteur">Rapporteur</option>
                <option value="Étudiant">Étudiant</option>
              </Form.Select>
            </Form.Group>

            <div className="d-flex justify-content-end">
              <Button variant="secondary" onClick={() => { setShowModal(false); setSelectedUser(null); }} className="me-2">
                Annuler
              </Button>
              <Button variant="primary" onClick={handleAddUser}>
                Enregistrer
              </Button>
            </div>
          </Form>
        </Modal.Body>
      </Modal>

      <Modal show={showDeleteModal} onHide={() => setShowDeleteModal(false)} centered>
        <Modal.Header closeButton>
          <Modal.Title>Confirmer la suppression</Modal.Title>
        </Modal.Header>
        <Modal.Body>Êtes-vous sûr de vouloir supprimer cet utilisateur ?</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowDeleteModal(false)}>
            Annuler
          </Button>
          <Button variant="danger" onClick={handleDeleteUser}>
            Supprimer
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default UserTable;
