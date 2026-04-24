import React, { useState } from 'react';
import './Register.css';

const Register = () => {

    return (
        <div className="register-page">
            <div className="register-card">
                <div className="register-header">
                    <h2>Create <span>Account</span></h2>
                    <p>Enter your details to join EduFlow</p>
                </div>

                <div className="register-form">
                    <div className="data-group">
                        <label>Full Name</label>
                        <input 
                            type="text" 
                            name="fullName" 
                            required 
                        />
                    </div>

                    <div className="data-group">
                        <label>Email Address</label>
                        <input 
                            type="email" 
                            name="email" 
                            required 
                        />
                    </div>

                    <div className="data-group">
                        <label>Password</label>
                        <input 
                            type="password" 
                            name="password" 
                            required 
                        />
                    </div>

                    <div className="data-group">
                        <label>Confirm Password</label>
                        <input 
                            type="password" 
                            name="confirmPassword" 
                            required 
                        />
                    </div>

                    <div className="form-actions">
                        <button type="submit" className="btn-main">Create Account</button>
                    </div>
                </div>

                <div className="register-footer">
                    <p>Already have an account? <a href="/login">Login here</a></p>
                </div>
            </div>
        </div>
    );
};

export default Register;