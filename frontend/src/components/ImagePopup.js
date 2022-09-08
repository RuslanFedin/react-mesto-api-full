import React from 'react';

function ImagePopup({card, onClose}) {
  return (
    <div className={`popup popup_type_image-full ${card && "popup_opened"}`}>
      <div className="popup__container popup__container_image">
        <button aria-label="Закрыть" className="popup__close-button" onClick={onClose}></button>
        <img className="popup__image-full" src={card?.link} alt={card?.name}/>
        <p className="popup__image-tittle">{card?.name}</p>
      </div>
    </div>
  );
}

export default ImagePopup;
