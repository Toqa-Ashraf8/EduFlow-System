import React, { useState } from 'react';
import './ManageUsers.css';
import { Save, Search, Trash2, RotateCcw } from 'lucide-react';

const ManageUsers = () => {
    
    return (
        <div className="manage-users-page">

            <h4 className="page-main-title">User Management Center</h4>

            <div className="content-wrapper">
                <div className="side-actions-bar">
                    <button className="action-icon-btn btn-save" title="Save User Data">
                        <Save size={18} />
                    </button>
                    <button className="action-icon-btn btn-search" title="Search for User">
                        <Search size={18} />
                    </button>
                    <button className="action-icon-btn btn-delete" title="Delete Account">
                        <Trash2 size={18} />
                    </button>
                    <button className="action-icon-btn btn-reset" title="Clear All Fields">
                        <RotateCcw size={18} />
                    </button>
                </div>

                <div className="form-master-card">
                    <div className='body-cnt'>
                        <div className="master-form-group">
                            <label>ID</label>
                            <input type="text" name="userName"  />
                        </div>
                        <div className="master-form-group">
                            <label>Full Name</label>
                            <input type="text" name="userName"  />
                        </div>

                        <div className="master-form-group">
                            <label>Email Address</label>
                            <input type="email" name="email"/>
                        </div>

                        <div className="master-form-group">
                            <label>Access Password</label>
                            <input type="password" name="password" />
                        </div>

                        <div className="master-form-group">
                            <label>System Privilege</label>
                            <select name="role">
                                <option value="Doctor">Academic Doctor</option>
                                <option value="Staff">Administrative Staff</option>
                                <option value="Admin">Master Admin</option>
                                <option value="Student">Regular Student</option>
                            </select>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ManageUsers;