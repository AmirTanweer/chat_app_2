import React, { useContext, useState } from "react";
import { motion } from "framer-motion"; // Animation library
import SocketContext from "../context/Socket/SocketContext";
import AuthContext from "../context/Auth/AuthContext";
import "bootstrap/dist/css/bootstrap.min.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUserGroup } from "@fortawesome/free-solid-svg-icons"; // Import specific icon
import ModalComponent from "../components/ModalComponent";
import ChatContext from "../context/Chat/ChatContext";

const OnlineUsers = () => {
  const { onlineUsers } = useContext(SocketContext);
  const { loggedInUserId } = useContext(AuthContext);
  const { chats } = useContext(ChatContext);
  const [show, setShow] = useState(false);
  const [modalUserName, setModalUserName] = useState("");
  const [modalUserId, setModalUserId] = useState("");

  // Function to open modal and set the user's name
  const showModal = (name, userId) => {
    setModalUserId(userId);
    setModalUserName(name);
    setShow(true);
  };

  // Get IDs of existing friends (one-on-one chats)
  const friendIds = chats
    .filter((chat) => !chat.isGroupChat)
    .flatMap((chat) => chat.users)
    .map((user) => user._id);

  return (
    <div className="mb-4">
      {/* Render Modal */}
      <ModalComponent
        show={show}
        setShow={setShow}
        modalUserName={modalUserName}
        modalUserId={modalUserId}
      />

      <h5 className="text-success mb-3">👥 Online Users</h5>
      <ul className="list-group">
        {onlineUsers?.length > 0 ? (
          onlineUsers
            .filter(
              (user) =>
                user._id !== loggedInUserId && !friendIds.includes(user._id) // Exclude logged-in user & friends
            )
            .map((user) => (
              <motion.li
                key={user._id}
                className="list-group-item d-flex align-items-center"
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
              >
                {/* Green dot indicator */}
                <span className="dot bg-success me-2"></span>
                <strong>{user.name}</strong>

                {/* Clickable Icon to Open Modal */}
                <FontAwesomeIcon
                  onClick={() => showModal(user.name, user._id)}
                  style={{
                    color: "green",
                    marginLeft: "auto",
                    cursor: "pointer",
                  }}
                  icon={faUserGroup}
                />
              </motion.li>
            ))
        ) : (
          <motion.li
            className="list-group-item text-muted text-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            No users online
          </motion.li>
        )}
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

export default OnlineUsers;
