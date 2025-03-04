import { useState ,useEffect} from "react";
import AuthContext from "./AuthContext";
import axios from 'axios'
const AuthState=({children})=>{
    const url='http://localhost:5000/'
   
    const [userData,setUserData]=useState(null)
   const [loading,setLoading]=useState(true)
   const [token,setToken]=useState(sessionStorage.getItem('token') || "") 

      const [loggedIn, setLoggedIn] = useState(false)
    
    const SignUp=async(formData)=>{
        
       
        const requestBody = {
            username: formData.name,
            email: formData.email,
            password: formData.password
          };
      
          try {
            const response = await axios.post(`${url}api/auth/register`, requestBody, {
              headers: {
                'Content-Type': 'application/json' // Set content type
              }
            });
             
            return response.data.message
          } catch (error) {
            console.error('Error:', error.response?.data || error.message);
          }
    }
    const Logging=async(formData)=>{
        const requestBody = {
            
            email: formData.email,
            password: formData.password
          };
      
          try {
            const response = await axios.post(`${url}api/auth/login`, requestBody, {
              headers: {
                'Content-Type': 'application/json' // Set content type
              }
            });
             if(response.data.token){
              sessionStorage.setItem('token',response.data.token)
                setLoggedIn(true)
                setToken(response.data.token)
               
               
             }
            return response.data.token;
          } catch (error) {
            console.error('Error:', error.response?.data || error.message);
          }
    }
    const LogOut=async()=>{
        sessionStorage.removeItem('token')
        setLoggedIn(false)
        setUserData(null)
        setToken('');
        setLoading(false)
    }
    const getUserDetails=async()=>{
      if(!token)return ; //prevent API call if token is missing

      try {
        const response = await axios.get(`${url}api/auth/getdetails`,  {
          headers: {
            'Content-Type': 'application/json', // Set content type
            'authorization':`Bearer ${token}`
          }
        });
         
         setUserData(response.data.user)
         console.log("userdata -> ",userData)
         setLoading(false)
         
        
      } catch (error) {
        console.error('Error:', error.response?.data || error.message);
      }
    }
    
    
    
    return (
    <AuthContext.Provider value={{SignUp,Logging,LogOut,loggedIn,getUserDetails,userData,token}}>
        {children}
    </AuthContext.Provider>
    )
}
export default AuthState