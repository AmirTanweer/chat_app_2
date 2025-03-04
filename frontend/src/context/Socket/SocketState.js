import SocketContext from "./SocketContext";
import { io } from "socket.io-client";
import { useState, useEffect } from "react";

const SOCKET_URL = "http://localhost:5000/";

const SocketState = ({ children }) => {
  const [socket, setSocket] = useState(null);
  const [message,setMessage]=useState('')
  const [messages,setMessages]=useState([])
  const [userName,setUserName]=useState('');
  const [userData,setUserData]=useState({name:"",message:""})

  useEffect(() => {
    if(userName){

      // Initialize socket connection only once
      const newSocket = io(SOCKET_URL);

      newSocket.on("connect", () => {
      console.log("Connected to server, socket ID:", newSocket.id);
      // newSocket.emit("joinRoom", { room: "General" });
    });
    newSocket.emit("username", userName);



    newSocket.on("message", (data) => {
      setMessages((prevMessages)=>[...prevMessages,data])
      console.log("New message: ", data);
    });
    
    setSocket(newSocket);
    
    // Cleanup function to disconnect on unmount
    return () => {
      newSocket.disconnect();
      console.log("Socket disconnected");
    };
  }
  }, [userName]);

const sendUserName=(name)=>{
  setUserName(name)
  
}

  const sendMessage =async (msg) => {
    if (socket) {
     let messageData={name:userName,message:msg}
      socket.emit("message", messageData);
    } else {
      console.log("Socket not connected yet");
    }
  };

  return (
    <SocketContext.Provider value={{ sendMessage,message,setMessage,messages ,sendMessage,userName,setUserName,sendUserName}}>
      {children}
    </SocketContext.Provider>
  );
};

export default SocketState;
