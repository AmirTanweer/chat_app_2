import { createContext, useState, useEffect, useContext } from "react";
import { io } from "socket.io-client";
import AuthContext from "../Auth/AuthContext";
import SocketContext from "./SocketContext";

const SOCKET_URL = "http://localhost:5000";

const SocketState = ({ children }) => {
  const { loggedIn, userData } = useContext(AuthContext);
  const [socket, setSocket] = useState(null);
  const [messages, setMessages] = useState([]);
  const [userName, setUserName] = useState("");
  const [loggedInUserData, setLoggedInUserData] = useState({});
  const [onlineUsers, setOnlineUsers] = useState([]);

  // Initialize socket connection when user logs in
  useEffect(() => {
    if (!loggedIn) return;

    const newSocket = io(SOCKET_URL, { autoConnect: false });
    setSocket(newSocket);

    newSocket.on("connect", () => {
      console.log("✅ Connected to server, socket ID:", newSocket.id);
    });

    // Listen for online users update
    newSocket.on("onlineUsers", (users) => {
      console.log("👥 Online Users:", users);
      setOnlineUsers(users);
    });

    newSocket.on("message", (data) => {
      setMessages((prevMessages) => [...prevMessages, data]);
    });

    return () => {
      newSocket.disconnect();
      console.log("❌ Socket disconnected");
    };
  }, [loggedIn]);

  // Send logged-in user data when `userData` is available
  useEffect(() => {
    if (userData && Object.keys(userData).length > 0) {
      setLoggedInUserData(userData);
    }
  }, [userData]);

  // Emit `loggedInUserData` when `socket` is ready and data exists
  useEffect(() => {
    if (socket && Object.keys(loggedInUserData).length > 0) {
      socket.connect();
      socket.emit("loggedInUserData", loggedInUserData);
      console.log("📡 Sent loggedInUserData:", loggedInUserData);
    }
  }, [socket, loggedInUserData]);

  const sendUserName = (name) => {
    setUserName(name);
    if (socket) {
      socket.emit("username", name);
    }
  };

  const sendLoggedInUserData = (userData) => {
    setLoggedInUserData(userData);
  };

  const sendMessage = (msg) => {
    if (socket) {
      const messageData = { name: userName, message: msg };
      socket.emit("message", messageData);
    } else {
      console.log("⚠️ Socket not connected yet");
    }
  };

  return (
    <SocketContext.Provider
      value={{ sendMessage, messages, onlineUsers, userName, sendUserName, sendLoggedInUserData }}
    >
      {children}
    </SocketContext.Provider>
  );
};

export default SocketState;
