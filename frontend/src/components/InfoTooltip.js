import React from "react";

function InfoTooltip ({ onCLose, isOpen, message, image }) {

  return (
    <div className={`popup ${isOpen && "popup_opened"}`}>
      <div className="popup__container">
        <button aria-label="Закрыть" className="popup__close-button" onClick={onCLose}></button>
        <img className="popup__image" src={image} />
        <p className="popup__message">{message}</p>
      </div>
    </div>
  )
}

export default InfoTooltip;
