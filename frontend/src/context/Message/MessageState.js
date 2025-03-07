import MessageContext from "./MessageContext";
import {useState,useContext, useEffect} from 'react'
import axios from "axios";
import AuthContext from "../Auth/AuthContext";
const url='http://localhost:5000/'
const MessageState=({children})=>{
    const {token}=useContext(AuthContext)
    const [otherUserId,setOtherUserId]=useState('')
    const [allMessages,setAllMessages]=useState([])
    const [msgChatId,setMsgChatId]=useState('')
    const [sendMsg,setSendMsg]=useState({})
    const [msgUserId,setMsgUserId]=useState('')
    
    useEffect(()=>{
        if(msgChatId){

          fetchMessage(msgChatId)
        }
    },[sendMsg])

      const fetchMessage=async(userId)=>{
        console.log("userId -> ",userId)
        if(!token)return ; //prevent API call if token is missing
        
        try {
          const response = await axios.get(`${url}api/message/allmessages/${userId}`,  {
          headers: {
            'Content-Type': 'application/json', // Set content type
            'authorization':`Bearer ${token}`
          }
        });
        console.log('messages -> ', response.data)
       setAllMessages(response.data)
       
       
       
       
       
       
       
      } catch (error) {
        console.error('Error:', error.response?.data || error.message);
      }
    }
 
  const sendMessages=async(content)=>{
    if(!token)return ; //prevent API call if token is missing
    let requestBody={
      "chatId":msgChatId,
      "content":content
    }
      try {
        const response = await axios.post(`${url}api/message/sendMessage`,requestBody,  {
          headers: {
            'Content-Type': 'application/json', // Set content type
            'authorization':`Bearer ${token}`
          }
        });
        console.log('messages -> ', response.data)
       setSendMsg(response.data)

       
         
        
       
        
        
        
      } catch (error) {
        console.error('Error:', error.response?.data || error.message);
      }
  }
  return( 
     <MessageContext.Provider value={{setOtherUserId,allMessages,fetchMessage,msgChatId,setMsgChatId,sendMessages,setMsgUserId,sendMsg}}>
    {children}
    </MessageContext.Provider>
  )
}
export default MessageState