import React from 'react';

const ImageModalFNH = ({ imageUrl, email , onClose }) => {
  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <img src={imageUrl} alt='' />
        <p>{email}</p>
        <button onClick={onClose}>Close</button>
      </div>
    </div>
  );
};

export default ImageModalFNH;
