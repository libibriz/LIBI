import React, { FC } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

interface MyModalProps {
  children: React.ReactNode;
  modalTitle: string;
  onApproveClick: () => void;
  showModal: boolean;
  onClose: () => void;
}

const My_Modal: FC<MyModalProps> = (props) => {
  const handleClose = () => {
    props.onClose();
  };

  return (
    <div className={`My_Model ${props.showModal ? 'show' : 'hide'}`}>
      <div className="modal" style={{ display: props.showModal ? 'block' : 'none', position: 'initial' }}>
        <Modal.Dialog>
          <Modal.Header closeButton onClick={handleClose}>
            <Modal.Title>{props.modalTitle}</Modal.Title>
          </Modal.Header>

          <Modal.Body>
            <p>{props.children}</p>
          </Modal.Body>

          <Modal.Footer>
            <Button variant="secondary" onClick={() => { handleClose(); }}>Cancel</Button>
            <Button variant="primary" onClick={() => { handleClose(); props.onApproveClick(); }}>Save changes</Button>
          </Modal.Footer>
        </Modal.Dialog>
      </div>
    </div>
  );
};

export default My_Modal;

