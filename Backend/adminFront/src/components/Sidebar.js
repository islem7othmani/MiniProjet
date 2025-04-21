import React from "react";
import { Link } from "react-router-dom";
import "./Sidebar.css"; // Optional for styling

const Sidebar = () => {
  return (
    <div className="bg-dark text-white h-screen p-3 d-flex flex-column" style={{ width: "220px" }}>
      <ul className="nav flex-column mt-3">
        </ul><h4 className="text-center">Admin Panel</h4>
      <ul className="nav nav-pills flex-column mb-auto">
        <li className="nav-item">
          <Link to="/" className="nav-link ">
            Dashboard
          </Link>
        </li>
        {/* Add more links here if needed */}
      </ul>
    </div>
    



  );
};

export default Sidebar;
