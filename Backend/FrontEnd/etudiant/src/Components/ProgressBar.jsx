import React from "react";
import "../index.css"; // Assure-toi que les styles sont bien appliqués

function ProgressBar() {
  const steps = [
    { label: "Départ", info: "Votre projet a été déposé" },
    { label: "Validation", info: "En cours de validation par le jury" },
  ];

  return (
    <div className="progress-container mt-4">
      {steps.map((step, index) => (
        <div key={index} className="progress-step">
          <div className="circle" data-tooltip={step.info}></div>
          <p className="mt-2">{step.label}</p>
          {index < steps.length - 1 && <div className="progress-line"></div>}
        </div>
      ))}
    </div>
  );
}

export default ProgressBar;