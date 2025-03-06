
import React, { useContext } from "react";
import ChatContext from "../context/Chat/ChatContext"
import "bootstrap/dist/css/bootstrap.min.css";
const Groups = () => {
    const { chats } = useContext(ChatContext);
    console.log("chats-> ", chats);
  
    // Mock data (replace with real data from context)
    const loggedInUserId = "67c2e75d148f1357f28d38bf";
    const defaultProfilePic = "https://icon-library.com/images/default-user-icon/default-user-icon-8.jpg";
  return (
    <div className="mb-4">
    <h5 className="text-primary">Groups</h5>
    <ul className="list-group">
      {chats
        .filter(chat => chat.isGroupChat)
        .map(chat => (
          <li key={chat._id} className="list-group-item d-flex align-items-center">
            <img
              src={chat.groupAdmin?.profilePic || defaultProfilePic}
              alt="Group Admin"
              className="rounded-circle me-2"
              width="40"
              height="40"
            />
            <div>
              <p className="mb-0 fw-bold">{chat.chatName}</p>
              <small className="text-muted">
                {chat.latestMessage?.content || "No messages yet"}
              </small>
            </div>
          </li>
        ))}
    </ul>
  </div>
  )
}

export default Groups