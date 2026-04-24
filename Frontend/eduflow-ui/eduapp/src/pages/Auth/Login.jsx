import React, { useState } from 'react';
import './Login.css';

const Login = () => {
 

    return (
        <div className="login-page">
            <div className="login-card">
                <div className="login-header">
                    <h2>Welcome</h2>
                    <p>Login to access your EduFlow dashboard</p>
                </div>

                <div className="login-form">
                    <div className="horizontal-group">
                        <label>Email Address</label>
                        <input 
                            type="email" 
                            name="email" 
                            required 
                        />
                    </div>

                    <div className="horizontal-group">
                        <label>Password</label>
                        <input 
                            type="password" 
                            name="password" 
                            required 
                        />
                    </div>

                    <div className="form-actions">
                        <button type="submit" className="btn-main">Login Now</button>
                    </div>
                </div>

                <div className="login-footer">
                    <p>Don't have an account? <a href="/register">Register here</a></p>
                </div>
            </div>
        </div>
    );
};

export default Login;