import React from 'react';

function ImagePopup({ card, onClose }) {
  return (
    <div className={`popup popup_for_card ${card.link ? "popup_opened" : ""}`}>
      <div className="popup__full-image">
        <img className="popup__card-image" src={card.link} alt={card.name} />
        <button className="popup__close popup__close_full-image" type="button" onClick={onClose}></button>
        <h2 className="popup__card-title">{card.name}</h2>
      </div>
    </div>
  );
}

export default ImagePopup;
