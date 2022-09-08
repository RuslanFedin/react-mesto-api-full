import React from 'react';

function PopupWithForm({title, children, isOpen, name, onClose, submitButtonText, onSubmit}) {

  return (
    <div className={`popup popup_type_${name} ${isOpen && "popup_opened"}`}>
      <div className="popup__container">
        <button
          aria-label="Закрыть"
          className="popup__close-button"
          type="button"
          onClick={onClose}
        />
        <form
          className={`popup__form popup__form_${name}`}
          noValidate
          name={name}
          onSubmit={onSubmit}
        >
          <h3 className="popup__title">{title}</h3>
          {children}
          <button
            aria-label="Сохранить"
            type="submit"
            className="popup__save-button"
          >
            {submitButtonText}
          </button>
        </form>
      </div>
     </div>
  );
}

export default PopupWithForm;
