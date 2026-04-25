import {createSlice} from '@reduxjs/toolkit'
import { newUser } from '../../services/authServices';
const initialState={
    user:{
        UserID:0,
        UserName:"",
        Email:"",
        Password:"",
        Role:"autoRole"
    },
    token:sessionStorage.getItem('token') || "",
    userData:JSON.parse(sessionStorage.getItem('user'))||{}
}
const authSlice=createSlice({
    name:'auth',
    initialState,
    reducers:{
        setUserValues:(state,action)=>{
            state.user={...state.user,...action.payload};
        }
    },
    extraReducers:(builder)=>{
        builder
        .addCase(newUser.fulfilled,(state,action)=>{
            sessionStorage.setItem('token',action.payload.token);
            state.token=action.payload.token;
            sessionStorage.setItem('user',JSON.stringify(action.payload.user));
            state.userData=action.payload.user;
        })
    }
})
export const {setUserValues}=authSlice.actions;
const authReducer=authSlice.reducer;
export default authReducer;