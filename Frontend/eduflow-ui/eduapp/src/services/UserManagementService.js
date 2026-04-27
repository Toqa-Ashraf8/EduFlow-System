import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from 'axios'
import { variables } from "../components/variables";

 
export const fetchUsers = createAsyncThunk("usersManagement/fetchUsers", async (params) => {
      const token = sessionStorage.getItem("token");
      const url = `${variables.MANAGE_API}GetAllUsers?pageNumber=${params.pageNumber}&pageSize=${params.pageSize}`;
      const resp = await axios.post(url, {}, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      return resp.data; 
  }
);
export const saveUsers = createAsyncThunk("usersManagement/saveUsers", async (user) => {
      const token = sessionStorage.getItem("token");
      const resp = await axios.post(variables.MANAGE_API+"UpsertUsers", user, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      return resp.data; 
  }
);
export const deleteUsers = createAsyncThunk("usersManagement/deleteUsers", async (id) => {
      const token = sessionStorage.getItem("token");
      const url = `${variables.MANAGE_API}DeleteUsers?userId=${id}`;
      const resp = await axios.delete(url, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      return resp.data; 
  }
);