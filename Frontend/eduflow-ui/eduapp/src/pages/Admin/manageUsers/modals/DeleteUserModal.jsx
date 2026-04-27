import React from 'react';
import './DeleteUserModal.css';
import { FaTrashAlt } from 'react-icons/fa'; 
import { IoClose } from 'react-icons/io5'; 
import { useDispatch, useSelector } from 'react-redux';
import { toggleDeleteuserModal } from '../../../../features/Admin/usersManagementSlice';
import { deleteUsers } from '../../../../services/UserManagementService';
import { toast } from 'react-toastify';

const DeleteUserModal = () => {
  const {selectedUser}=useSelector((state)=>state.usersManagement);
  const dispatch=useDispatch();

const confirmDeleteUser=async()=>{
    try {
        const result=await dispatch(deleteUsers(selectedUser.UserID)).unwrap();
        if(result.deleted){
            toast.error("User has been Deleted !",{
                theme:'colored',
                position:'top-right'
            })
        }
    } catch (error) {}  
}

    return (
        <div className="delete-overlay">
            <div className="delete-card">
                <button className="close-x-btn" onClick={()=>dispatch(toggleDeleteuserModal(false))}>
                    <IoClose size={24} />
                </button>
                
                <div className="delete-content">
                    <div className="delete-icon-wrapper">
                        <FaTrashAlt size={35} />
                    </div>
                    <h3>Delete User</h3>
                    <p>
                        Are you sure you want to delete this user? 
                    </p>
                </div>

                <div className="delete-actions">
                    <button className="action-btn confirm-btn" onClick={()=>confirmDeleteUser()}>
                        Yes
                    </button>
                    <button className="action-btn cancel-btn" onClick={()=>dispatch(toggleDeleteuserModal(false))}>
                        No
                    </button>
                </div>
            </div>
        </div>
    );
};

export default DeleteUserModal;