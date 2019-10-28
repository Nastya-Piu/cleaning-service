import React, { useState } from 'react';
import Modal from 'react-bootstrap/Modal';
import PropTypes from 'prop-types';


const Popup = (props) => {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <>
      <div onClick={handleShow}>{props.children}</div>

      <Modal show={show} onHide={handleClose} animation={false}>
        <Modal.Header closeButton>
          <Modal.Title>{props.title}</Modal.Title>
        </Modal.Header>
        <Modal.Body>{props.content}</Modal.Body>
        <Modal.Footer>
          {props.actions}
        </Modal.Footer>
      </Modal>
    </>
  );
}

Popup.propTypes = {
  title: PropTypes.string.isRequired,
  content: PropTypes.isRequired
}

export default Popup;