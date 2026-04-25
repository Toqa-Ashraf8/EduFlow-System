import React, { useState } from 'react';
import './Register.css';
import {useDispatch,useSelector} from 'react-redux'
import { newUser } from '../../services/authServices';
import {toast} from 'react-toastify'
import { setUserValues } from '../../features/Auth/authSlice';
import { useNavigate } from 'react-router-dom';
const Register = () => {
    const {user,userData}=useSelector((state)=>state.auth);
    const dispatch=useDispatch();
    const navigate=useNavigate();
const handleChange=(e)=>{
const {name,value}=e.target;
dispatch(setUserValues({[name]:value}));
}

const registerNewUser=async()=>{
    try {
    const result=await dispatch(newUser(user)).unwrap();
    if(result.token){
        toast.success("Account created successfully!",{
            theme:'colored',
            position:'top-right'
        })
        navigate('/admin-dashboard');
    }
    } catch (error) {}  
   
}
console.log("user",user)
console.log("userData",userData);
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
                            name="UserName" 
                            value={user.UserName || ""}
                            onChange={handleChange}
                            required 
                        />
                    </div>

                    <div className="data-group">
                        <label>Email Address</label>
                        <input 
                            type="email" 
                            name="Email" 
                            value={user.Email || ""}
                            onChange={handleChange}
                            required 
                        />
                    </div>

                    <div className="data-group">
                        <label>Password</label>
                        <input 
                            type="password" 
                            name="Password" 
                            value={user.Password || ""}
                            onChange={handleChange}
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
                        <button 
                        className="btn-main" 
                        onClick={()=>registerNewUser()}>
                            Create Account
                        </button>
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