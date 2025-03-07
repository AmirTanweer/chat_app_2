import React,{useContext,useState,useEffect} from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPaperclip, faSmile, faPaperPlane } from "@fortawesome/free-solid-svg-icons";
import ChatContext from "../context/Chat/ChatContext";
import MessageContext from "../context/Message/MessageContext";
import SocketContext from "../context/Socket/SocketContext";
const Chat = () => {
    const {oneOnOneChat}=useContext(ChatContext)
    const {setOtherUserId,allMessages,sendMessages}=useContext(MessageContext)
    const [inputMessage,setInputMessage]=useState('');
    const {sendMessage}=useContext(SocketContext)
    const handleSendMessage=async()=>{
       await sendMessage(inputMessage); // For Socket 
          await  sendMessages(inputMessage) // for Messages
    }
  return (
    <div className="col-md-6 col-lg-7 col-xl-8">
      {/* Chat Messages */}
      <div className="pt-3 pe-3" style={{ position: "relative", height: "400px", overflowY: "auto" }}>
        {allMessages.map((msg, index) => (
          <div key={index} className={`d-flex flex-row ${index % 2 === 0 ? "justify-content-start" : "justify-content-end"}`}>
            {index % 2 === 0 && (
              <img
                src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-chat/ava6-bg.webp"
                alt="avatar"
                className="rounded-circle"
                style={{ width: "45px",height: "100%" }}
              />
            )}
            <div>
              <p className={`small p-2 ${index % 2 === 0 ? "ms-3 bg-light" : "me-3 text-white bg-primary"} rounded-3`}>
               {msg.content}
              </p>
              <p className="small text-muted">{`12:00 PM | Aug 13`}</p>
            </div>
            {index % 2 !== 0 && (
              <img
                src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-chat/ava1-bg.webp"
                alt="avatar"
                className="rounded-circle"
                style={{ width: "45px" ,height: "100%" }}
              />
            )}
          </div>
        ))}
      </div>

      {/* Chat Input */}
      <div className="d-flex align-items-center p-3 border-top">
        <img
          src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-chat/ava6-bg.webp"
          alt="avatar"
          className="rounded-circle me-2"
          style={{ width:'45px',height: "100%" }}
        />
        <input
          onChange={(e)=> setInputMessage(e.target.value)}
          value={inputMessage}
          type="text"
          className="form-control form-control-lg"
          placeholder="Type a message..."
        />
        <a className="ms-2 text-muted" href="#!">
          <FontAwesomeIcon icon={faPaperclip} />
        </a>
        <a className="ms-3 text-muted" href="#!">
          <FontAwesomeIcon icon={faSmile} />
        </a>
        <a className="ms-3 text-primary" href="#!" onClick={handleSendMessage}>
          <FontAwesomeIcon icon={faPaperPlane} />
        </a>
      </div>
    </div>
  );
};

export default Chat;
