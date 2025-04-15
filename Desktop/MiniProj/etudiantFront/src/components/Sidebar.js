import React from "react";
import { Link } from "react-router-dom";
import { FileEarmarkArrowUp, FileText } from "react-bootstrap-icons";

function Sidebar() {
  return (
    <div className="bg-dark text-white h-screen p-3 d-flex flex-column" style={{ width: "220px" }}>
      <ul className="nav flex-column mt-3">
        <li className="nav-item">
          <Link to="/" className="nav-link text-white">
            <FileEarmarkArrowUp className="me-2" /> Déposer projet
          </Link>
        </li>
        <li className="nav-item">
          <Link to="/details-pfe" className="nav-link text-white">
            <FileText className="me-2" /> Détails PFE
          </Link>
        </li>
      </ul>
    </div>
  );
}

export default Sidebar;
