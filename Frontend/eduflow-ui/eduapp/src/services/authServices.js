import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from 'axios'
import { variables } from "../components/variables";

export const newUser=createAsyncThunk("newUser/auth",async(user)=>{
    const resp=await axios.post(variables.AUTH_API+"Register",user)
    .then((res)=>res.data);
    return resp;
})
export const loginUser=createAsyncThunk("loginUser/auth",async(userinfo)=>{
    const resp=await axios.post(variables.AUTH_API+"Login",userinfo)
    .then((res)=>res.data);
    return resp;
})