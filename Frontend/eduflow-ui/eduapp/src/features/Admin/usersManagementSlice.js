import { createSlice } from "@reduxjs/toolkit";
import { deleteUsers, fetchUsers, saveUsers } from "../../services/UserManagementService";

const initialState={
    selectedUser: {
        UserID:0,
        AcademicID:0,
        UserName:"",
        Email:"",
        Password:"",
        Role:""
    }, 
    allUsers: [],
    pagination: {
        currentPage: 1,
        pageSize: 10,
        totalCount: 0 ,
        studentsCount:0,
        instructorsCount:0
    },
    isDeleteUserModal:false

}
const usersManagementSlice=createSlice({
    name:'usersManagement',
    initialState,
    reducers:{
        setUserFormData:(state,action)=>{
            state.selectedUser={...state.selectedUser,...action.payload};
        },
        resetForm:(state,action)=>{
            state.selectedUser=initialState.selectedUser;
        },
        setCurrentPage: (state, action) => {
            state.pagination.currentPage = action.payload;
        },
        editUser:(state,action)=>{
            state.selectedUser=state.allUsers[action.payload];
            state.selectedUser.UserID=state.allUsers[action.payload].UserID;
        },
        toggleDeleteuserModal:(state,action)=>{
            state.isDeleteUserModal=action.payload;
        }, 
    },
    extraReducers:(builder)=>{
        builder
        .addCase(fetchUsers.fulfilled, (state, action) => {
        state.allUsers = action.payload.users; 
        state.pagination.totalCount = action.payload.totalCount;
        state.pagination.studentsCount = action.payload.studentsCount;
        state.pagination.instructorsCount = action.payload.instructorsCount;
      }) 
      .addCase(saveUsers.fulfilled, (state, action) => {
        state.selectedUser.UserID = action.payload.id; 
      })
      .addCase(deleteUsers.fulfilled, (state, action) => {
        state.isDeleteUserModal=false;
        state.selectedUser=initialState.selectedUser;
      })
    }
})
export const {
    setUserFormData,
    resetForm,
    setCurrentPage,
    editUser,
    toggleDeleteuserModal
}=usersManagementSlice.actions;
const usersManageReducer=usersManagementSlice.reducer;
export default usersManageReducer;