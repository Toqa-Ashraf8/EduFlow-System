import { createSlice } from "@reduxjs/toolkit";

const initialState={
    course:{
        Serial:0,
        CourseCode:0,
        CourseName:"",
        StudentsNo:0,
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
    courses:[]
}

const coursesManagementSlice=createSlice({
    name:"courseManagement",
    initialState,
    reducers:{
        setCoursesValues:(state,action)=>{
            state.course={...state.course,...action.payload};
        }
    }
})
export const {setCoursesValues}=coursesManagementSlice.actions;
const coursesManageReducer=coursesManagementSlice.reducer;
export default coursesManageReducer;