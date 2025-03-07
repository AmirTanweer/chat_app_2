import React, { useState ,useContext} from "react";
import { Modal, Button } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import ChatContext from "../context/Chat/ChatContext";
import MessageContext from "../context/Message/MessageContext";
const ModalComponent = ({show,setShow,modalUserName,modalUserId}) => {
  const {fetchMessage}=useContext(MessageContext)
  const {createOrFetchChat}=useContext(ChatContext);
  const handleCreateChat=()=>{

    createOrFetchChat(modalUserId)
    fetchMessage(modalUserId)
      setShow(false)
  }
     
  return (
    <div>
      {/* <Button  variant="primary" onClick={() => setShow(true)}>
        Launch Modal
      </Button> */}

      <Modal show={show} onHide={() => setShow(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Add to friend</Modal.Title>
        </Modal.Header>
        <Modal.Body  >Are you sure want to Chat with : {modalUserName}</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShow(false)}>
            Close
          </Button>
          <Button variant="primary" onClick={handleCreateChat}>Send Request</Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default ModalComponent;
