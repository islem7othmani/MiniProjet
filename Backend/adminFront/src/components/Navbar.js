import React from "react";
import { BsBell } from "react-icons/bs"; // Import the Bell icon

const Navbar = () => {
  return (
    <nav className="navbar navbar-light bg-light px-4 shadow-sm">
      <a className="navbar-brand fw-bold" href="/">
        📘 Gestion PFE
      </a>

      <div className="d-flex align-items-center">
        <BsBell size={20} className="me-3 text-secondary" /> {/* Use BsBell instead of Bell */}
        <span className="me-2 fw-semibold">Ahmed Ben Ali</span>
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
};

export default Navbar;
