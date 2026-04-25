import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../features/Auth/authSlice";
import uiReducer from "../features/global/uiSlice";
export const store=configureStore({
    reducer:{
      auth:authReducer,
      ui:uiReducer
    }
   
})