import React from 'react';
import { Link } from 'react-router-dom';
 export const AdminHeader = () => {
  return (
    <div className="collapse navbar-collapse" id="navbarSupportedContent">
      <ul className="navbar-nav ms-2 mb-2 mb-lg-0"> 
      
        <li className="nav-item">
          <Link className="nav-link active" to="/admin-dashboard">Dashboard</Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link" to="/manageusers">Manage Users</Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link" to="/addcourses">Add Courses</Link>
        </li>
      </ul>
    </div>
  );
};

