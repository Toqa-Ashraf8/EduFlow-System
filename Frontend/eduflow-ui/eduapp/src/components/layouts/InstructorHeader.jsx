import React from 'react';
import { Link } from 'react-router-dom';
 export const InstructorHeader = () => {
  return (
    <div className="collapse navbar-collapse" id="navbarSupportedContent">
      <ul className="navbar-nav ms-2 mb-2 mb-lg-0"> 
      
        <li className="nav-item">
          <Link className="nav-link active" to="/instructor-dashboard">Dashboard</Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link" to="/instructor-attendence">Attendence</Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link" to="/gradebook">GradeBook</Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link" to="/instructor-warnings">Warnings</Link>
        </li>
         <li className="nav-item">
          <Link className="nav-link" to="/instructor-appointments">Appointments</Link>
        </li>
      </ul>
    </div>
  );
};

