import React from 'react';
import './MainHeader.css'; 
import { Link } from 'react-router-dom';
import { AdminHeader } from './AdminHeader';
import { useSelector } from 'react-redux';
import { InstructorHeader } from './InstructorHeader';
const MainHeader = () => {
  const {userData}=useSelector((state)=>state.auth);
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
        {userData.Role==='Admin'&& <AdminHeader />}
        {userData.Role==='Instructor'&& <InstructorHeader/>}
        {/* {userData.Role==='Student'&& <StudentHeader/>} */}
      </div>
    </nav>
  );
};

export default MainHeader;