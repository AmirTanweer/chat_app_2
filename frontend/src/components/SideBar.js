import React, { useContext } from "react";
import ChatContext from "../context/Chat/ChatContext";
import "bootstrap/dist/css/bootstrap.min.css";
import Groups from "../ChatComponents/Groups";
import Freinds from "../ChatComponents/Freinds";
import OnlineUsers from "../ChatComponents/OnlineUsers";

const SideBar = () => {
  const { chats } = useContext(ChatContext);
  console.log("chats-> ", chats);

  // Mock data (replace with real data from context)
  const loggedInUserId = "67c2e75d148f1357f28d38bf";
  const defaultProfilePic = "https://icon-library.com/images/default-user-icon/default-user-icon-8.jpg";

  return (
    <div className="col-md-6 col-lg-5 col-xl-4">
      <div className="p-3 bg-white shadow rounded" style={{ height: "500px", overflowY: "auto", scrollbarWidth: "thin" }}>
        {/* Search Bar */}
        <div className="input-group rounded mb-3">
          <input type="search" className="form-control rounded" placeholder="Search" aria-label="Search" />
          <span className="input-group-text border-0">
            <i className="fas fa-search"></i>
          </span>
        </div>

        {/* Groups Section */}
       {/* <Groups/> */}

        {/* Friends/Private Chats Section */}
        <Freinds/>

        {/* Online Users Section */}
        <OnlineUsers/>

        {/* Create Group Button */}
        <div className="text-center">
          <button className="btn btn-primary">Create Group</button>
        </div>
      </div>
    </div>
  );
};

export default SideBar;
