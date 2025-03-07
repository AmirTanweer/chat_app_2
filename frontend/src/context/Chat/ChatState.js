import ChatContext from "./ChatContext";
import AuthContext from "../Auth/AuthContext";
import { useContext,useEffect,useState } from "react";
import axios from "axios";
const ChatState=({children})=>{

    const {token}=useContext(AuthContext)
    const [chats,setChats]=useState([]);
     const url='http://localhost:5000/'
const [oneOnOneChat,setOneOnOneChat]=useState({})
     useEffect(() => {
        if (token) {
            getAllChats(); // Fetch chats only when token is available
        }
    }, [token,oneOnOneChat]); // Dependency on token, runs when token changes

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
         
        
       
        
        
        
      } catch (error) {
        console.error('Error:', error.response?.data || error.message);
      }
}
//create or fetch chat of two user -not group chat
const createOrFetchChat=async(userId)=>{
  if(!token)return ; //prevent API call if token is missing
  let requestBody={
    "userId":userId
  }
  try {
    const response = await axios.post(`${url}api/chat`,requestBody,  {
      headers: {
        'Content-Type': 'application/json', // Set content type
        'authorization':`Bearer ${token}`
      }
    });
   // console.log('all Chats -> ',response.data)
   console.log('fetch chat or create chat -> ',response.data)
     setOneOnOneChat(response.data)
    
   return response.data._id
    
     
    
  } catch (error) {
    console.error('Error:', error.response?.data || error.message);
  }
}


    return(

        <ChatContext.Provider value={{getAllChats,chats,createOrFetchChat,oneOnOneChat,setOneOnOneChat}}>
      {children}
    </ChatContext.Provider>
    )
}
export default ChatState