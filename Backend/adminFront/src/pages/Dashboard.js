import React, { useState } from "react";
import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";
import AddUserModal from "../components/AddUserModal";
import UserTable from "../components/UserTable";
import { FiUserPlus } from "react-icons/fi";

const Dashboard = () => {
  const [showModal, setShowModal] = useState(false);
  const [modalType, setModalType] = useState(""); // "enseignant" or "etudiant"

  const handleShowModal = (type) => {
    setModalType(type);
    setShowModal(true);
  };

  return (
    <div className="d-flex bg-light" style={{ minHeight: "100vh" }}>
      <Sidebar />
      <div className="flex-grow-1 p-4">
        <Navbar />
        <div className="container mt-4">
          
          <UserTable />
        </div>
      </div>
      {showModal && <AddUserModal type={modalType} onClose={() => setShowModal(false)} />}
    </div>
  );
};

export default Dashboard;
