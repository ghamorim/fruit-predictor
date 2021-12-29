import React from "react";

import './styles.css';

const Modal = ({ open, onClose, children }) => {
 
  return (
    open && (
      <div className="modal-container" onClick={onClose}>
        <div className="modal-content" onClick={e => e.stopPropagation()}>
          { children }
        </div>      
      </div>
    )
  )
}

export default Modal;