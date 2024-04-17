import React from 'react';

const ImageModalID = ({ imageUrl, caption, onClose  }) => {
  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <img src={imageUrl} alt={caption} />
        <p>{caption}</p>
        <button onClick={onClose}>Close</button>
      </div>
    </div>
  );
};

export default ImageModalID;