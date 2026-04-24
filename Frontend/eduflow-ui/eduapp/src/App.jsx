import './App.css'
import Header from './components/layouts/Header'
import { Route,Routes } from 'react-router-dom'
import Register from './pages/Auth/Register'
import Login from './pages/Auth/Login'
function App() {
  return (
    <div>
    <Header/>
    <Routes>
      <Route path='/register' element={<Register/>}/>
      <Route path='/login' element={<Login/>}/>
    </Routes>
    </div>
  )
}

export default App
