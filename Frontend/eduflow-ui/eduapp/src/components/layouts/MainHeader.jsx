import React from 'react';
import './MainHeader.css'; 
import { Link } from 'react-router-dom';
import { AdminHeader } from './AdminHeader';
const MainHeader = () => {
  return (
    <nav className="navbar navbar-expand-lg custom-navbar">
      <div className="container-fluid d-flex justify-content-start">
        <Link className="navbar-brand" to="/">
          Edu<span>Flow</span>
        </Link>
        
        <button
          className="navbar-toggler ms-auto" 
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
        >
          <span className="navbar-toggler-icon" />
        </button>

        <AdminHeader />
      </div>
    </nav>
  );
};

export default MainHeader;