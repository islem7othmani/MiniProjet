import {React, useEffect, useState} from "react";
import { Bell } from "react-bootstrap-icons";
import "bootstrap/dist/css/bootstrap.min.css";

function Navbar() {

    const [user, setUser] = useState(null);

    useEffect(() => {
      fetch("http://localhost:8000/student/studentById/1", {
        
      })
        .then((res) => {
          if (!res.ok) {
            throw new Error("Failed to fetch user data");
          }
          return res.json();
        })
        .then((data) => {
          setUser(data); 
          console.log("User data:", data);
        })
        .catch((error) => {
          console.error("Error fetching user:", error);
        });
    }, []);
  
    
  return (
    <nav className="navbar navbar-light bg-light px-4 shadow-sm">
    <a className="navbar-brand fw-bold" href="/">
      📘 Gestion PFE
    </a>

    <div className="d-flex align-items-center">
      <Bell size={20} className="me-3 text-secondary" />
      <span className="me-2 fw-semibold">
        {user ? `${user.nom} ${user.prenom}` : "Loading..."}
      </span>
      <img
        src="/user.jpg"
        alt="Profil"
        className="rounded-circle"
        width="40"
        height="40"
      />
    </div>
  </nav>
  );
}

export default Navbar;