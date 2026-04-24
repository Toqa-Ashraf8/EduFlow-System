import React from 'react';
import './Header.css'; 
import { Link } from 'react-router-dom';
const Header = () => {
  return (
    <nav className="navbar navbar-expand-lg custom-navbar">
      <div className="container-fluid">
      <Link className="navbar-brand" to="/">
       Edu<span>Flow</span>
     </Link>
        
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"

        >
          <span className="navbar-toggler-icon" />
        </button>

        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
             <li className="nav-item">
             <Link className="nav-link" to="/register">Register</Link>
            </li>
             <li className="nav-item">
             <Link className="nav-link" to="/login">Login</Link>
            </li>
            <li className="nav-item">
             <Link className="nav-link active" to="/">Home</Link>
            </li>
            <li className="nav-item">
             <Link className="nav-link" to="#">Courses</Link>
            </li>
            <li className="nav-item dropdown">
             <Link
                className="nav-link dropdown-toggle"
                to="#"
                role="button"
                data-bs-toggle="dropdown"
              >
                Services
             </Link>
              <ul className="dropdown-menu">
                <li><Link className="dropdown-item" to="#">Schedule</Link></li>
                <li><Link className="dropdown-item" to="#">Attendance</Link></li>
                <li><hr className="dropdown-divider" /></li>
                <li><Link className="dropdown-item" to="#">Grades</Link></li>
              </ul>
            </li>
          </ul>
          
        </div>
      </div>
    </nav>
  );
};

export default Header;