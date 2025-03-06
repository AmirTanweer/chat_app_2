import React from 'react'
import { useContext } from 'react'
import SocketContext from './context/Socket/SocketContext'
import Home from './pages/Home'
import Login from './pages/Login'
import SignUp from './pages/SignUp'
import {BrowserRouter as Router ,Routes,Route} from 'react-router-dom'
import NavBar from './components/NavBar'
import UserDetails from './pages/UserDetails'
const App = () => {
 
 
  return (
    <div style={{background:'grey'}}>
      <Router>
        <NavBar/>
      <Routes>
     <Route path='/' element={<Home/>}/>
     <Route path='/login' element={<Login/>}/>
     <Route path='/signup' element={<SignUp/>}/>
     <Route path='/user' element={<UserDetails/>}/>
     
      
      

      </Routes>
      </Router>
    </div>
  )
}

export default App