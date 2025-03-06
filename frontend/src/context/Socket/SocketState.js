import { createContext, useState, useEffect, useContext } from "react";
import { io } from "socket.io-client";
import AuthContext from "../Auth/AuthContext";
import SocketContext from "./SocketContext";

const SOCKET_URL = "http://localhost:5000";

const SocketState = ({ children }) => {
  const { loggedIn,userData } = useContext(AuthContext); // Get user data from AuthContext
  const [socket, setSocket] = useState(null);
  
  const [messages, setMessages] = useState([]);
  const [userName, setUserName] = useState("");
  const [loggedInUserData,setLoggedInUserData]=useState({});

  useEffect(() => {
    if (!loggedIn || !userData) return; // Only run if user is logged in
    console.log("🔄 Setting logged-in user data from AuthContext...");

    sendLoggedInUserData(userData)
  }, [loggedIn, userData]); // Run when `loggedIn` or `userData` changes

  useEffect(() => {
    console.log('loggeIn check -> ',loggedIn)
    if(!loggedIn) return ;

      // Initialize socket connection only once
      const newSocket = io(SOCKET_URL, { autoConnect: false });
    setSocket(newSocket);

    newSocket.on("connect", () => {
      console.log("Connected to server, socket ID:", newSocket.id);
    });

    newSocket.on("message", (data) => {
      setMessages((prevMessages) => [...prevMessages, data]);
      console.log("New message received: ", data);
    });
    
    // Cleanup function to disconnect socket on unmount
    return () => {
      newSocket.disconnect();
      console.log("Socket disconnected");
    }
    
  }, [loggedIn]);

  // Emit username once socket is connected
  useEffect(() => {
    console.log('socket ->',socket , ' & ', ' loggedInUserData -> ',loggedInUserData)
    if (socket && loggedInUserData) {
      socket.connect();
      socket.emit("loggedInUserData", loggedInUserData);
    }
  }, [socket, loggedInUserData]);

  const sendUserName = (name) => {
    setUserName(name);
    if (socket) {
      socket.emit("username", name);
    }
  };
  
  const sendLoggedInUserData=(userData)=>{
    console.log('userdetails in socket State -> ',userData)
     setLoggedInUserData(userData);
     if(socket){
      socket.emit('loggedInUserData',loggedInUserData)
     }
  }

  const sendMessage = (msg) => {
    if (socket) {
      const messageData = { name: userName, message: msg };
      socket.emit("message", messageData);
    } else {
      console.log("Socket not connected yet");
    }
  };

  return (
    <SocketContext.Provider value={{ sendMessage, messages, userName, sendUserName,sendLoggedInUserData }}>
      {children}
    </SocketContext.Provider>
  );
};

export default SocketState;
