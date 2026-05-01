import { createSlice } from "@reduxjs/toolkit";
import { deleteCourseAction, fetchCourses, saveCourses } from "../../services/CoursesManagementService";

const initialState={
    course:{
        Serial:0,
        CourseCode:"",
        CourseName:"",
        MaxStudents:0,
        Instructors:{
            PrimaryDoctor:"",
            Assistant1:"",
            Assistant2:""
        },
        Schedule:{
            Days:"",
            Lectures:""
        }
    },
    courses:[],
    pagination: {
        currentPage: 1,
        pageSize: 10,
        coursesCount:0,
    },
   isDeleteModalOpen: false,
}

const coursesManagementSlice=createSlice({
    name:"courseManagement",
    initialState,
    reducers:{
        setCoursesValues:(state,action)=>{
          const { nested, value } = action.payload;
            if (nested === 0) {
                state.course = { ...state.course, ...value };
            } else if (nested === 1) {
                state.course.Instructors = { ...state.course.Instructors, ...value };
            } else if (nested === 2) { 
                state.course.Schedule = { ...state.course.Schedule, ...value };
            }
        },
        resetForm:(state,action)=>{
            state.course=initialState.course;
        },
        setCurrentCoursePage: (state, action) => {
            state.pagination.currentPage = action.payload;
        },
     editCourse: (state, action) => {
      const index = action.payload;
      const selectedCourse = state.courses[index];
        if (selectedCourse) {
            state.course = {
                Serial: selectedCourse.Serial,
                CourseCode: selectedCourse.CourseCode,
                CourseName: selectedCourse.CourseName,
                MaxStudents: selectedCourse.MaxStudents,
                Instructors: {
                    PrimaryDoctor: selectedCourse.PrimaryDoctor || "",
                    Assistant1: selectedCourse.Assistant1 || "",
                    Assistant2: selectedCourse.Assistant2 || ""
                },
                Schedule:{
                    Days:selectedCourse.Days || "",
                    Lectures:selectedCourse.Lectures || "" 
                }
            };
        }
      },
      toggleDeleteModal:(state,action)=>{
        state.isDeleteModalOpen=action.payload;
      }
    },
    extraReducers:(builder)=>{
        builder
        .addCase(saveCourses.fulfilled,(state,action)=>{
            state.course.Serial=action.payload.id;
        })
         .addCase(fetchCourses.fulfilled,(state,action)=>{
            state.courses=action.payload.courses;
            state.pagination.coursesCount=action.payload.totalCount;
        }) 
    }
})
export const {
    setCoursesValues,
    resetForm,
    setCurrentCoursePage,
    editCourse,
    toggleDeleteModal
}=coursesManagementSlice.actions;
const coursesManageReducer=coursesManagementSlice.reducer;
export default coursesManageReducer;