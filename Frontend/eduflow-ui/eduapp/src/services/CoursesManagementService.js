import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from 'axios'
import { variables } from "../components/variables";

export const saveCourses = createAsyncThunk("courseManagement/saveCourses", async (course) => {
        const token = sessionStorage.getItem("token");
        const resp = await axios.post(variables.COURSE_API+"UpsertCourses", course, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      return resp.data; 
  }
);
export const fetchCourses = createAsyncThunk("courseManagement/fetchCourses", async (params) => {
      const token = sessionStorage.getItem("token");
      const url = `${variables.COURSE_API}GetAllCourses?pageNumber=${params.pageNumber}&pageSize=${params.pageSize}`;
      const resp = await axios.post(url, {}, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      return resp.data; 
  }
);
export const deleteCourseAction = createAsyncThunk("courseManagement/deleteCourseAction", async (id) => {
      const token = sessionStorage.getItem("token");
      const url = `${variables.COURSE_API}DeleteCourses?courseId=${id}`;
      const resp = await axios.delete(url, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      return resp.data; 
  }
);