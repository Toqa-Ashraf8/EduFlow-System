import React from 'react';
import './Header.css'; 

const Header = () => {
  return (
    <nav className="navbar navbar-expand-lg custom-navbar">
      <div className="container-fluid">
       <a className="navbar-brand" href="#">
       Edu<span>Flow</span>
      </a>
        
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
              <a className="nav-link active" href="#">Home</a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="#">Courses</a>
            </li>
            <li className="nav-item dropdown">
              <a
                className="nav-link dropdown-toggle"
                href="#"
                role="button"
                data-bs-toggle="dropdown"
              >
                Services
              </a>
              <ul className="dropdown-menu">
                <li><a className="dropdown-item" href="#">Schedule</a></li>
                <li><a className="dropdown-item" href="#">Attendance</a></li>
                <li><hr className="dropdown-divider" /></li>
                <li><a className="dropdown-item" href="#">Grades</a></li>
              </ul>
            </li>
          </ul>
          
          <form className="d-flex" role="search">
            <input
              className="form-control me-2"
              type="search"
              placeholder="Search student..."
            />
            <button className="btn btn-custom-search" type="submit">
              Search
            </button>
          </form>
        </div>
      </div>
    </nav>
  );
};

export default Header;