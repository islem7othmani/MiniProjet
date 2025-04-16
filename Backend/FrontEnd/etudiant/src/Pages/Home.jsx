import { CloudUpload } from "react-bootstrap-icons";
import ProgressBar from "../Components/ProgressBar";
import React, { useState, useEffect } from "react";

function Home({ etudiant }) {
  console.log("Etudiant data in Home component:", etudiant);

  const [file, setFile] = useState(null);
  const [submitted, setSubmitted] = useState(false);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [status, setStatus] = useState("In Progress"); 
  const [depot, setDepot] = useState(new Date().toISOString().split("T")[0]); 

  // Handle file change
  const handleFileChange = (event) => {
    setFile(event.target.files[0]);
  };

  // Handle form submission
  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!file) {
      alert("Veuillez déposer un fichier.");
      return;
    }

    const formData = new FormData();
    formData.append("title", title);
    formData.append("description", description);
    formData.append("status", status);
    formData.append("depot", depot); // Use the date of today
    formData.append("etudiantId", etudiant?.id); // Assuming etudiant has an 'id' field
    formData.append("pdf", file); // File upload field

    try {
      const response = await fetch("http://localhost:8000/projet/addProjet", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        throw new Error("Erreur lors de l'envoi du projet.");
      }

      const data = await response.json(); // Handle the response data (if needed)
      setSubmitted(true);
      alert("Projet soumis avec succès !");
    } catch (error) {
      console.error("Erreur lors de la soumission:", error);
      alert("Une erreur est survenue.");
    }
  };

  return (
    <div className="container d-flex flex-column align-items-center">
      <h2 className="mb-4">Déposer votre projet</h2>

      {/* Formulaire */}
      <form
        onSubmit={handleSubmit}
        className={`form-container ${submitted ? "disabled" : ""}`} // Disable after submission
      >
        {/* Titre du projet */}
        <div className="mb-3">
          <label className="form-label fw-semibold">Titre du projet</label>
          <input
            type="text"
            className="form-control"
            placeholder="Titre du projet"
            required
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>

        {/* Description */}
        <div className="mb-3">
          <label className="form-label fw-semibold">Description</label>
          <textarea
            className="form-control"
            rows="3"
            placeholder="Décrivez votre projet..."
            required
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          ></textarea>
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
