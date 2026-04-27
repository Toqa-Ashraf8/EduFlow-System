import React, { useEffect, useRef, useState } from 'react';
import './ManageUsers.css';
import { Save, Search, Trash2, RotateCcw } from 'lucide-react';
import {useDispatch,useSelector} from 'react-redux'
import { resetForm, setUserFormData, toggleDeleteuserModal } from '../../../features/Admin/usersManagementSlice';
import {useNavigate} from 'react-router-dom'
import { saveUsers } from '../../../services/UserManagementService';
import {toast} from 'react-toastify'
import DeleteUserModal from './modals/DeleteUserModal';

const ManageUsers = () => {
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
            {isDeleteUserModal && <DeleteUserModal/>}
            <h4 className="page-main-title">User Management Center</h4>
            <div className="content-wrapper">
                <div className="side-actions-bar">
                    <button className="action-icon-btn btn-reset" title="Clear All Fields">
                        <RotateCcw size={20} color='#f59e0b' onClick={handleClear} />
                    </button>
                    <button className="action-icon-btn btn-save" title="Save User Data">
                        <Save size={20} color='#10b981' onClick={handleSave}/>
                    </button>
                     <button className="action-icon-btn btn-delete" title="Delete Account">
                        <Trash2 size={20} color='#ef4444' onClick={handleDelete}/>
                    </button>
                    <button className="action-icon-btn btn-search" title="Search for User">
                        <Search size={20} color='#3b82f6' onClick={()=>navigate('/users')} />
                    </button>
                   
                </div>
                <div className="form-master-card">
                    <div className='body-cnt'>
                        <div className="master-form-group">
                            <label>ID</label>
                            <input 
                            className='inputId'
                            type="text" 
                            name="UserID"
                            value={selectedUser.UserID || 0}
                            ref={idRef}
                            />
                        </div>
                         <div className="master-form-group">
                            <label>Academic ID</label>
                            <input 
                            type="text" 
                            name="AcademicID"
                            value={selectedUser.AcademicID || 0}
                            onChange={handleChange}
                            />
                        </div>
                        <div className="master-form-group">
                            <label>Full Name</label>
                            <input 
                            type="text" 
                            name="UserName"
                            value={selectedUser.UserName || ""}
                            onChange={handleChange}
                            ref={nameRef}  />
                        </div>
                        <div className="master-form-group">
                            <label>Email Address</label>
                            <input 
                            type="email" 
                            name="Email"
                            value={selectedUser.Email || ""}
                            onChange={handleChange}
                            />
                        </div>

                        <div className="master-form-group">
                            <label>Access Password</label>
                            <input 
                            type="password" 
                            name="Password" 
                            value={selectedUser.Password || ""}
                            onChange={handleChange}
                            />
                        </div>

                        <div className="master-form-group">
                            <label>Role</label>
                            <select 
                            name="Role"
                            value={selectedUser.Role || ""}
                            onChange={handleChange}
                            >
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