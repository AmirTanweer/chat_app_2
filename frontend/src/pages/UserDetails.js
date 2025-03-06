import React from 'react'
import AuthContext from '../context/Auth/AuthContext'
import { useContext } from 'react'
const UserDetails = () => {
    const {userData}=useContext(AuthContext)
    console.log("userData in details ->",userData)
    
  return (
   userData &&  <div style={{
      display:'flex',justifyContent:'center',flexDirection:'column' ,alignItems:'center'
    }}>
        <h3>UserDetails</h3>
        <div>
          <h5>Id : {userData._id}</h5>
          <p><strong>Name : </strong>{userData.name}</p>
          <p><strong>Email : </strong>{userData.email}</p>
          
        </div>

    </div>
  )
}

export default UserDetails