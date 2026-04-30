import './App.css'
import 'react-toastify/dist/ReactToastify.css';
import MainHeader from './components/layouts/MainHeader'
import { Navigate, Route,Routes } from 'react-router-dom'
import Register from './pages/Auth/Register'
import Login from './pages/Auth/Login'
import { toast, ToastContainer } from 'react-toastify';
import { useEffect } from 'react'
import {useDispatch, useSelector} from 'react-redux'
import { clearGlobalError } from './features/global/uiSlice'
import AdminDashboard from './pages/dashboard/AdminDashboard'
import ProtectedRoute from './components/protectedRoute'
import ManageUsers from './pages/Admin/manageUsers/ManageUsers'
import UsersTable from './pages/Admin/manageUsers/UsersTable'
import ManageCourses from './pages/Admin/manageCourses/ManageCourses';

function App() {
  const {globalMessage,globalError}=useSelector((state)=>state.ui);
  const {token}=useSelector((state)=>state.auth);
  const dispatch=useDispatch();
  useEffect(() => {
    if (globalError) {
      toast.error(globalMessage || "Server error occurred",{
        theme:'colored',
      });
      dispatch(clearGlobalError());
    }
  }, [globalError, globalMessage, dispatch]);
  return (
    <div>
      <ToastContainer 
        position="top-left"
        autoClose={1500}
        hideProgressBar={false}
        newestOnTop={true}
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light" 
      />
    {token && <MainHeader/> }
    <Routes>
      <Route path="/" element={<Navigate to="/login" replace />} /> 
      <Route path='/register' element={<Register/>}/>
      <Route path='/login' element={<Login/>}/>
      <Route path='/admin-dashboard' element={
        <ProtectedRoute>
            <AdminDashboard/>   
        </ProtectedRoute>
        }/>
        <Route path='/manageusers' element={
        <ProtectedRoute>
            <ManageUsers/>   
        </ProtectedRoute>
        }/>
        <Route path='/users' element={
        <ProtectedRoute>
            <UsersTable/>   
        </ProtectedRoute>
        }/>
        <Route path='/addcourses' element={
        <ProtectedRoute>
            <ManageCourses/>   
        </ProtectedRoute>
        }/>
    </Routes>
    
    </div>
  )
}

export default App
