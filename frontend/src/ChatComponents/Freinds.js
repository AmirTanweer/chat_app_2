import React, { useContext } from "react";
import ChatContext from "../context/Chat/ChatContext";
import "bootstrap/dist/css/bootstrap.min.css";
import AuthContext from "../context/Auth/AuthContext";
import SocketContext from "../context/Socket/SocketContext";
import MessageContext from "../context/Message/MessageContext";
const Friends = () => {
  const { onlineUsers } = useContext(SocketContext);
  const { loggedInUserId } = useContext(AuthContext);
  const { chats ,createOrFetchChat} = useContext(ChatContext);
  const {fetchMessage,msgChatId,setMsgChatId,setMsgUserId}=useContext(MessageContext)

  console.log("chats-> ", chats);

  const defaultProfilePic = "https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-chat/ava6-bg.webp";
  
  
  const handleFetchChat=async(otheruserId)=>{
    try{

      const chatId=  await  createOrFetchChat(otheruserId)
      
      setMsgChatId(chatId);
      await fetchMessage(chatId)
    }
     catch (error) {
      console.error("Error fetching messages:", error);
    }
  }
  return (
    <div className="mb-4">
      <h5 className="text-primary">Friends</h5>
      <ul className="list-group">
        {chats
          .filter((chat) => !chat.isGroupChat) // Only show one-on-one chats
          .map((chat) => {
            const otherUser = chat.users.find((user) => user._id !== loggedInUserId);
            
            // Check if the friend is online
            const isOnline = onlineUsers.some((user) => user._id === otherUser?._id);
                        
            return (
              <li onClick={()=>handleFetchChat(otherUser._id)} key={chat._id} className="list-group-item d-flex align-items-center">
                {/* Show green dot only if user is online */}
                {isOnline ?<span className="dot bg-success me-2"></span>:<span className="dot bg-danger me-2"></span>}

                <img
                  // src={otherUser?.profilePic || defaultProfilePic}
                  src={defaultProfilePic}
                  alt="User"
                  className="rounded-circle me-2"
                  width="40"
                  height="40"
                />
                <div>
                  <p className="mb-0 fw-bold">{otherUser?.name || "Unknown User"}</p>
                  <small className="text-muted">
                    {chat.latestMessage?.content || "No messages yet"}
                  </small>
                </div>
              </li>
            );
          })}
      </ul>

      {/* CSS Styles */}
      <style>{`
        .dot {
          width: 10px;
          height: 10px;
          border-radius: 50%;
          display: inline-block;
        }
      `}</style>
    </div>
  );
};

export default Friends;
