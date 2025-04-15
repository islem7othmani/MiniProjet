import React, { useState } from "react";
import { CloudUpload } from "react-bootstrap-icons";
import ProgressBar from "../components/ProgressBar"; // Importation du composant

function Home() {
  const [file, setFile] = useState(null);
  const [submitted, setSubmitted] = useState(false);

  const handleFileChange = (event) => {
    setFile(event.target.files[0]);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (file) {
      setSubmitted(true);
      alert("Projet soumis avec succès !");
    } else {
      alert("Veuillez déposer un fichier.");
    }
  };

  return (
    <div className="container d-flex flex-column align-items-center">
      <h2 className="mb-4">Déposer votre projet</h2>

      {/* Formulaire */}
      <form
        onSubmit={handleSubmit}
        className={`form-container ${submitted ? "disabled" : ""}`} // Désactiver après soumission
      >
        {/* Titre du projet */}
        <div className="mb-3">
          <label className="form-label fw-semibold">Titre du projet</label>
          <input type="text" className="form-control" placeholder="Titre du projet" required />
        </div>

        {/* Description */}
        <div className="mb-3">
          <label className="form-label fw-semibold">Description</label>
          <textarea className="form-control" rows="3" placeholder="Décrivez votre projet..." required></textarea>
        </div>

        {/* Upload du fichier */}
        <div className="mb-3">
          <label className="form-label fw-semibold">Déposer le fichier PFE</label>
          <div className="file-upload d-flex flex-column align-items-center justify-content-center">
            <input type="file" id="fileInput" onChange={handleFileChange} hidden />
            <label htmlFor="fileInput" className="upload-box">
              <CloudUpload size={50} className="text-primary" />
              <p className="mt-2 text-secondary">
                {file ? file.name : "Cliquez pour uploader votre fichier"}
              </p>
            </label>
          </div>
        </div>

        {/* Bouton de soumission */}
        <button type="submit" className="btn btn-primary w-100" disabled={submitted}>
          {submitted ? "Projet soumis" : "Soumettre le projet"}
        </button>
      </form>

      {/* Barre d’avancement - affichée seulement après soumission */}
      {submitted && <ProgressBar />}
    </div>
  );
}

export default Home;
