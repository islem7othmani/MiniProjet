import React, { useState, useEffect } from "react";
import {
  PersonFill,
  Calendar2Event,
  ClockFill,
  Building,
  Award,
} from "react-bootstrap-icons";
import "bootstrap/dist/css/bootstrap.min.css";

function DetailsPFE() {
  const [details, setDetails] = useState(null);

  useEffect(() => {
    fetch("http://localhost:8000/soutenance/soutenanceByStudent/1", {
  
    })
      .then((res) => {
        if (!res.ok) throw new Error("Failed to fetch PFE details");
        return res.json();
      })
      .then((data) => {
        setDetails(data);
        console.log("PFE details:", data);
      })
      .catch((err) => {
        console.error("Error loading PFE details:", err);
      });
  }, []);

  if (!details) {
    return <div className="text-center mt-5">Chargement des détails...</div>;
  }

  const formatName = (nom, prenom) => `${prenom} ${nom}`;

  return (
    <div className="container d-flex justify-content-center align-items-center vh-100">
      <div className="card shadow-lg p-4 rounded bg-light" style={{ width: "500px" }}>
        <h3 className="text-center mb-4">Détails de la Présentation</h3>

        <ul className="list-group list-group-flush">
          <li className="list-group-item d-flex align-items-center">
            <PersonFill className="text-primary me-2" size={20} /> 
            <strong>Encadrant : </strong>&nbsp;
            {formatName(details.encadrant_nom, details.encadrant_prenom)}
          </li>
          <li className="list-group-item d-flex align-items-center">
            <PersonFill className="text-success me-2" size={20} /> 
            <strong>Rapporteur : </strong>&nbsp;
            {formatName(details.rapporteur_nom, details.rapporteur_prenom)}
          </li>
          <li className="list-group-item d-flex align-items-center">
            <PersonFill className="text-danger me-2" size={20} /> 
            <strong>Président du Jury : </strong>&nbsp;
            {formatName(details.president_nom, details.president_prenom)}
          </li>
          <li className="list-group-item d-flex align-items-center">
            <Building className="text-warning me-2" size={20} /> 
            <strong>Salle : </strong>&nbsp;
            {details.salle || "Non spécifiée"}
          </li>
          <li className="list-group-item d-flex align-items-center">
            <Calendar2Event className="text-info me-2" size={20} /> 
            <strong>Date : </strong>&nbsp;
            {details.date_soutenance || "Non définie"}
          </li>
          <li className="list-group-item d-flex align-items-center">
            <ClockFill className="text-secondary me-2" size={20} /> 
            <strong>Heure : </strong>&nbsp;
            {details.time_soutenance || "Non définie"}
          </li>
        </ul>

        <div className="mt-4">
          <label className="form-label fw-semibold">Note finale</label>
          <div className="input-group">
            <span className="input-group-text">
              <Award className="text-warning" size={20} />
            </span>
            <input
              type="number"
              className="form-control"
              placeholder="En attente..."
              value={details.note !== null ? details.note : ""}
              disabled={details.note === null}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default DetailsPFE;
