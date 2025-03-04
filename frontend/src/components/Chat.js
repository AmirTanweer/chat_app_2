import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPaperclip, faSmile, faPaperPlane } from "@fortawesome/free-solid-svg-icons";

const Chat = () => {
  return (
    <div className="col-md-6 col-lg-7 col-xl-8">
      {/* Chat Messages */}
      <div className="pt-3 pe-3" style={{ position: "relative", height: "400px", overflowY: "auto" }}>
        {[1, 2, 3, 4].map((msg, index) => (
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
                Lorem ipsum dolor sit amet, consectetur adipiscing elit.
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
        <a className="ms-3 text-primary" href="#!">
          <FontAwesomeIcon icon={faPaperPlane} />
        </a>
      </div>
    </div>
  );
};

export default Chat;
