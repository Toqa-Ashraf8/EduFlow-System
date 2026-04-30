import React, { useEffect, useRef, useState } from 'react';
import './ManageUsers.css';
import { Save, Search, Trash2, RotateCcw, Users } from 'lucide-react';
import {useDispatch,useSelector} from 'react-redux'
import { resetForm, setUserFormData, toggleDeleteuserModal } from '../../../features/Admin/usersManagementSlice';
import {useNavigate} from 'react-router-dom'
import { saveUsers } from '../../../services/UserManagementService';
import {toast} from 'react-toastify'
import DeleteUserModal from './modals/DeleteUserModal';

const ManageUsers = () => {
    const {token}=useSelector((state)=>state.auth);
    const {selectedUser,isDeleteUserModal}=useSelector((state)=>state.usersManagement);
    const dispatch=useDispatch();
    const navigate=useNavigate();
    const idRef=useRef();
    const nameRef=useRef();

const handleChange=(e)=>{
    const {name,value}=e.target;
    dispatch(setUserFormData({[name]:value}));
}

const handleClear=()=>{
    dispatch(resetForm());
    idRef.current.disabled=true;
    nameRef.current.focus();
}
const handleSave=async()=>{
    try {
         const result=await dispatch(saveUsers(selectedUser)).unwrap();
         if(result.saved){
            toast.success("User Data Saved Successfully!",{
                theme:'colored',
                position:'top-right'
            })
         }
         if(result.updated){
             toast.success("User Data Updated Successfully!",{
                theme:'colored',
                position:'top-right'
            })
         }
    } catch (error) {}   
}

const handleDelete=()=>{
    if(selectedUser.UserID===0){
        toast.error("User selection required before deletion!",{
            theme:'colored',
            position:'top-right'
        })
        return;
    }
    else{
        dispatch(toggleDeleteuserModal(true))
    }
}

useEffect(()=>{
if(nameRef)nameRef.current.focus();
},[])

    return (
    <div className="manage-users-page">
            {isDeleteUserModal && <DeleteUserModal />}
            <div className="content-wrapper">
                <div className="side-actions-bar">
                    <div className="sidebar-top-icon">
                        <Users size={24} color="#818cf8" />
                    </div>
                    <div className="sidebar-actions-group">
                        <button className="action-icon-btn btn-reset" title="Clear All Fields" onClick={handleClear}>
                            <RotateCcw size={20} />
                        </button>
                        <button className="action-icon-btn btn-save" title="Save User Data" onClick={handleSave}>
                            <Save size={20} />
                        </button>
                        <button className="action-icon-btn btn-delete" title="Delete Account" onClick={handleDelete}>
                            <Trash2 size={20} />
                        </button>
                        <button className="action-icon-btn btn-search" title="Search for User" onClick={() => navigate('/users')}>
                            <Search size={20} />
                        </button>
                    </div>
                </div>

                <div className="form-master-card">
                    <div className="card-header-simple">
                        <h4>User Management Center</h4>
                        <p>Configure user credentials and system permissions</p>
                    </div>

                    <div className='body-cnt'>
                        <div className="form-row-split">
                            <div className="master-form-group">
                                <label>System ID</label>
                                <input 
                                className='inputId-small' 
                                type="text" 
                                name="UserID" 
                                value={selectedUser.UserID || 0} 
                                ref={idRef} 
                                readOnly />
                            </div>
                            <div className="master-form-group">
                                <label>Academic ID</label>
                                <input 
                                type="text" 
                                name="AcademicID" 
                                value={selectedUser.AcademicID || 0} 
                                onChange={handleChange} />
                            </div>
                        </div>

                        <div className="master-form-group full-width-row">
                            <label>Full Name</label>
                            <input 
                            type="text" 
                            name="UserName" 
                            value={selectedUser.UserName || ""} 
                            onChange={handleChange} 
                            ref={nameRef} />
                        </div>

                        <div className="master-form-group full-width-row">
                            <label>Email Address</label>
                            <input 
                            type="email" 
                            name="Email" 
                            value={selectedUser.Email || ""} 
                            onChange={handleChange} 
                             />
                        </div>

                        <div className="master-form-group full-width-row">
                            <label>Password</label>
                            <input 
                            type="password" 
                            name="Password" 
                            value={selectedUser.Password || ""} 
                            onChange={handleChange} />
                        </div>

                        <div className="master-form-group full-width-row">
                            <label>User Role</label>
                            <select name="Role" value={selectedUser.Role || ""} onChange={handleChange}>
                                <option value="-1">-- choose --</option>
                                <option value="Student">Student</option>
                                <option value="Instructor">Academic Doctor</option>
                                <option value="Admin">Admin</option>
                            </select>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ManageUsers;