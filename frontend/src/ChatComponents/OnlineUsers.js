
import React, { useContext } from "react";
import ChatContext from "../context/Chat/ChatContext";
import "bootstrap/dist/css/bootstrap.min.css";
const OnlineUsers = () => {
    const { chats } = useContext(ChatContext);
    console.log("chats-> ", chats);
  
    // Mock data (replace with real data from context)
    const loggedInUserId = "67c2e75d148f1357f28d38bf";
    const defaultProfilePic = "https://icon-library.com/images/default-user-icon/default-user-icon-8.jpg";
  return (
    <div className="mb-4">
          <h5 className="text-success">Online Users</h5>
          <ul className="list-group">
            {chats
              .flatMap(chat => chat.users)
              .filter(user => user._id !== loggedInUserId) // Exclude logged-in user
              .map(user => (
                <li key={user._id} className="list-group-item d-flex align-items-center">
                  <img
                    src={user.profilePic || defaultProfilePic}
                    alt="User"
                    className="rounded-circle me-2"
                    width="40"
                    height="40"
                  />
                  <div className="d-flex align-items-center">
                  <span
  className="bg-success d-inline-block me-2"
  style={{
    width: "10px",
    height: "10px",
    borderRadius: "50%",
  }}
></span>
                    {user.name}
                  </div>
                </li>
              ))}
          </ul>
        </div>
  )
}

export default OnlineUsers