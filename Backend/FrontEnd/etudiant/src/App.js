import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./Components/Navbar";
import Sidebar from "./Components/SideBar";
import Home from "./Pages/Home";
import DetailsPFE from "./Pages/DetailsPFE";

function App() {
  const [etudiant, setEtudiant] = useState(null);
  const etudiantId = "1"; // Replace with actual ID (can also come from route params)

  useEffect(() => {
    fetch(`http://localhost:8000/student/studentById/${etudiantId}`)
      .then((response) => response.json())
      .then((data) => {
        setEtudiant(data);
        console.log("Fetched etudiant:", data);
      })
      .catch((error) => {
        console.error("Error fetching etudiant by ID:", error);
      });
  }, [etudiantId]);

  return (
    <Router>
      <div className="d-flex">
        <Sidebar />
        <div className="flex-grow-1">
          <Navbar />
          <div className="container mt-4">
            <Routes>
              <Route path="/" element={<Home etudiant={etudiant} />} />
              <Route path="/details-pfe" element={<DetailsPFE />} />
            </Routes>
          </div>
        </div>
      </div>
    </Router>
  );
}

export default App;
