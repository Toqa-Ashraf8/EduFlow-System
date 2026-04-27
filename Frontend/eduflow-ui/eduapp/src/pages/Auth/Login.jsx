import React, { useEffect, useRef, useState } from 'react';
import './Login.css';
import { useDispatch, useSelector } from 'react-redux';
import { loginUser } from '../../services/authServices';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { setUserValues } from '../../features/Auth/authSlice';

const Login = () => {
 const {user,userData}=useSelector((state)=>state.auth);
 const dispatch=useDispatch();
 const navigate=useNavigate();
 const emailRef=useRef();

const handleChange=(e)=>{
    const {name,value}=e.target;
    dispatch(setUserValues({[name]:value}));
}
useEffect(()=>{
    if(emailRef) emailRef.current.focus();
},[])

 const confirmLogin=async()=>{
    if (!user.Email || !user.Password) {
        toast.error("Please enter both email and password");
        return;
    }
    try {
         const result=await dispatch(loginUser(user)).unwrap();
         if(result.token){
            toast.success("Welcome Back To EduFlow!",{
                theme:'colored',
                position:'top-right'
            })
            navigate('/admin-dashboard');
         }
    } 
    catch (error) {}
 }
const handleLogin=(e)=>{
    if(e.key==='Enter'){
        confirmLogin();
    }
}

    return (
        <div className="login-page">
            <div className="login-card">
                <div className="login-header">
                    <h2>Welcome</h2>
                    <p>Login to access your EduFlow dashboard</p>
                </div>

                <div className="login-form" onKeyDown={handleLogin}>
                    <div className="horizontal-group">
                        <label>Email Address</label>
                        <input 
                            type="email" 
                            name="Email"
                            ref={emailRef} 
                            value={user.Email || ""}
                            onChange={handleChange}
                            required 
                        />
                    </div>

                    <div className="horizontal-group">
                        <label>Password</label>
                        <input 
                            type="password" 
                            name="Password" 
                            value={user.Password || ""}
                            onChange={handleChange}
                            required 
                        />
                    </div>

                    <div className="form-actions">
                    <button 
                        className="btn-main"
                        onClick={()=>confirmLogin()}
                        >Login 
                    </button>
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