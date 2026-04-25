import {createSlice} from '@reduxjs/toolkit'
import { loginUser, newUser } from '../../services/authServices';
const initialState={
    user:{
        UserID:0,
        UserName:"",
        Email:"",
        Password:"",
        Role:"auto"
    },
    token:sessionStorage.getItem('token') || "",
    userData:JSON.parse(sessionStorage.getItem('user'))||{},
}
const authSlice=createSlice({
    name:'auth',
    initialState,
    reducers:{
        setUserValues:(state,action)=>{
            state.user={...state.user,...action.payload};
        },
      
    },
    extraReducers:(builder)=>{
        builder
        .addCase(newUser.fulfilled,(state,action)=>{
          if(action.payload.token){
             sessionStorage.setItem('token',action.payload.token);
             state.token=action.payload.token;
            }
            if(action.payload.user){
             sessionStorage.setItem('user',JSON.stringify(action.payload.user));
             state.userData=action.payload.user;
            }
 
        }) 
        .addCase(loginUser.fulfilled,(state,action)=>{
            if(action.payload.token){
             sessionStorage.setItem('token',action.payload.token);
             state.token=action.payload.token;
            }
            if(action.payload.user){
             sessionStorage.setItem('user',JSON.stringify(action.payload.user));
             state.userData=action.payload.user;
            }
            
        })
    }
})
export const {setUserValues}=authSlice.actions;
const authReducer=authSlice.reducer;
export default authReducer;