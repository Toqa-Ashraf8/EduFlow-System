import React, { useEffect, useState } from 'react';
import './UsersTable.css';
import { UserPen, Search, ChevronLeft, ChevronRight } from 'lucide-react';
import { useDispatch, useSelector } from 'react-redux';
import { editUser, setCurrentPage } from '../../../features/Admin/usersManagementSlice';
import { fetchUsers } from '../../../services/UserManagementService';
import { useNavigate } from 'react-router-dom';

const UsersTable = () => {
  const navigate=useNavigate();
   const dispatch = useDispatch();
  const { allUsers, pagination } = useSelector((state) => state.usersManagement);
  const { currentPage, pageSize, totalCount } = pagination;
  const totalPages = Math.ceil(totalCount / pageSize);
  const handlePageChange = (newPage) => {
    dispatch(setCurrentPage(newPage));
  };

const handleEdit=(index)=>{
  dispatch(editUser(index));
  navigate('/manageusers');
  
}

  useEffect(() => {
    dispatch(fetchUsers({pageNumber: currentPage,pageSize}));
  }, [dispatch, currentPage, pageSize]);
 
  return (
    <div className="page-wrapper">
      <div className="table-card">
        <div className="table-controls">
          <div className="title-group">
            <h3>Community Directory</h3>
            <div className="stats-pills">
                 <span className="stat-pill instructor">{pagination.totalCount} All</span>
              <span className="stat-pill student">{pagination.studentsCount} Students</span>
              <span className="stat-pill instructor">{pagination.instructorsCount} Instructors</span>
            </div>
          </div>
          
          <div className="actions-group">
            <div className="search-box">
              <Search className="search-icon" size={16} />
              <input 
                type="text" 
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>
        </div>

        <div className="scroll-area">
          <table className="elite-table">
            <thead>
              <tr>
                <th>Member</th>
                <th>Email Address</th>
                <th className="hide-mobile">Academic ID</th>
                <th>Role</th>
                <th className="text-right">Action</th>
              </tr>
            </thead>
            <tbody>
              {allUsers.map((u, index) => (
                <tr key={index}>
                  <td>
                    <div className="user-info-cell">
                      <div className="user-text">
                        <p className="name">{u.UserName}</p>
                      </div>
                    </div>
                  </td>
                  <td><p className="email">{u.Email}</p></td>
                  <td className="hide-mobile"><span className="id-text">{u.AcademicID}</span></td>
                  <td>
                    <span className={`badge-role ${u.Role.toLowerCase()}`}>{u.Role}</span>
                  </td>
                  <td className="text-right">
                    <div className="btn-edit" title="Edit User">
                       <UserPen size={16} onClick={()=>handleEdit(index)}/>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="table-footer">
      <span className="page-info">
        Page {currentPage} of {totalPages}
      </span>
      <div className="pagination-btns">
        <button 
          disabled={currentPage === 1} 
          onClick={() => handlePageChange(currentPage - 1)}
        >
          <ChevronLeft size={18} />
        </button>
        <button 
          disabled={currentPage === totalPages} 
          onClick={() => handlePageChange(currentPage + 1)}
        >
          <ChevronRight size={18} />
        </button>
      </div>
      </div>
      </div>
    </div>
  );
};

export default UsersTable;