import {useState, useEffect} from "react";
import PopupWithForm from "./PopupWithForm";

function AddPlacePopup({isOpen, onClose, onAddPlace}) {
  const [name, setName] = useState('');
  const [link, setLink] = useState('');

  useEffect(() => {
    if (isOpen) {
      setName('');
      setLink('');
    }
  }, [isOpen]);

  function handleSetName(e) {
    setName(e.target.value);
  }

  function handleSetLink(e) {
    setLink(e.target.value);
  }

  function handleSubmit(e) {
    e.preventDefault();
    onAddPlace({
      name: name,
      link: link,
    });
  }

  return (
    <PopupWithForm
      title="Новое место"
      submitButtonText="Создать"
      isOpen={isOpen}
      name={"place-add"}
      onClose={onClose}
      onSubmit={handleSubmit}
    >
      <input
        type="text"
        id="nameplace"
        name="name"
        className="popup__input popup__input_place-tittle"
        required
        placeholder="Название места"
        minLength="2"
        maxLength="30"
        value={name}
        onChange={handleSetName}
      />
      <span
        id="nameplace-error"
        className="popup__error popup__error_visible"
      ></span>
      <input
        type="url"
        id="link"
        name="link"
        className="popup__input popup__input_place-photo"
        required
        placeholder="Ссылка на картинку"
        value={link}
        onChange={handleSetLink}
      />
      <span
        id="link-error"
        className="popup__error popup__error_visible"
      ></span>
    </PopupWithForm>
  )
}

export default AddPlacePopup;
