import React, { useState } from "react";
import { PersonFill, Calendar2Event, ClockFill, Building, Award } from "react-bootstrap-icons";
import "bootstrap/dist/css/bootstrap.min.css";

function DetailsPFE() {
  // Simulation des données récupérées depuis une API (peut être remplacé plus tard)
  const [details, setDetails] = useState({
    encadrant: " Dr. Ahmed Ben Salah",
    rapporteur: " Mme. Nadia Kefi",
    president: " Pr. Karim Jaziri",
    salle: " G14",
    date: " 12 Juin 2025",
    heure: " 10:30",
    note: null, // Null signifie que la note n'a pas encore été attribuée
  });

  return (
    <div className="container d-flex justify-content-center align-items-center vh-100">
      <div className="card shadow-lg p-4 rounded bg-light" style={{ width: "500px" }}>
        <h3 className="text-center mb-4">Détails de la Présentation</h3>

        <ul className="list-group list-group-flush">
          <li className="list-group-item d-flex align-items-center">
            <PersonFill className="text-primary me-2" size={20} /> <strong>Encadrant : </strong> {details.encadrant}
          </li>
          <li className="list-group-item d-flex align-items-center">
            <PersonFill className="text-success me-2" size={20} /> <strong>Rapporteur : </strong> {details.rapporteur}
          </li>
          <li className="list-group-item d-flex align-items-center">
            <PersonFill className="text-danger me-2" size={20} /> <strong>Président du Jury : </strong> {details.president}
          </li>
          <li className="list-group-item d-flex align-items-center">
            <Building className="text-warning me-2" size={20} /> <strong>Salle : </strong> {details.salle}
          </li>
          <li className="list-group-item d-flex align-items-center">
            <Calendar2Event className="text-info me-2" size={20} /> <strong>Date : </strong> {details.date}
          </li>
          <li className="list-group-item d-flex align-items-center">
            <ClockFill className="text-secondary me-2" size={20} /> <strong>Heure : </strong> {details.heure}
          </li>
        </ul>

        {/* Zone de note */}
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
              value={details.note || ""}
              disabled={details.note === null}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default DetailsPFE;
