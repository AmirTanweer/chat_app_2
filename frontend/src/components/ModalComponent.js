import React, { useState } from "react";
import { Modal, Button } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";

const ModalComponent = ({show,setShow,modalUserName}) => {
  
     
  return (
    <div>
      {/* <Button  variant="primary" onClick={() => setShow(true)}>
        Launch Modal
      </Button> */}

      <Modal show={show} onHide={() => setShow(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Add to friend</Modal.Title>
        </Modal.Header>
        <Modal.Body>Are you sure want to be friend with : {modalUserName}</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShow(false)}>
            Close
          </Button>
          <Button variant="primary">Send Request</Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default ModalComponent;
