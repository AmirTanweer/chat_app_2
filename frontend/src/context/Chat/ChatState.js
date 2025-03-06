import ChatContext from "./ChatContext";
import AuthContext from "../Auth/AuthContext";
import { useContext,useEffect,useState } from "react";
import axios from "axios";
const ChatState=({children})=>{

    const {token}=useContext(AuthContext)
    const [chats,setChats]=useState([]);
     const url='http://localhost:5000/'

     useEffect(() => {
        if (token) {
            getAllChats(); // Fetch chats only when token is available
        }
    }, [token]); // Dependency on token, runs when token changes

// get all chat of loggedIn user

const getAllChats=async()=>{
    console.log('token in ChatState ->',token)
    if(!token)return ; //prevent API call if token is missing

      try {
        const response = await axios.get(`${url}api/chat`,  {
          headers: {
            'Content-Type': 'application/json', // Set content type
            'authorization':`Bearer ${token}`
          }
        });
       // console.log('all Chats -> ',response.data)
       setChats(response.data)
         
        
       
        
         return;
        
      } catch (error) {
        console.error('Error:', error.response?.data || error.message);
      }
}



    return(

        <ChatContext.Provider value={{getAllChats,chats}}>
      {children}
    </ChatContext.Provider>
    )
}
export default ChatState