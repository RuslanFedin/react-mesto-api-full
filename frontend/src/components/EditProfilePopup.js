import { useState, useEffect, useContext } from 'react';
import PopupWithForm from './PopupWithForm';
import { CurrentUserContext } from '../contexts/CurrentUserContext';

function EditProfilePopup({isOpen, onClose, onUpdateUser}) {
  const currentUser = useContext(CurrentUserContext);
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');

  useEffect(() => {
    setName(currentUser.name);
    setDescription(currentUser.about);
  }, [currentUser, isOpen]);

  function handleChangeName(e) {
    setName(e.target.value);
  }

  function handleChangeDescription(e) {
    setDescription(e.target.value);
  }

  function handleSubmit(e) {
    e.preventDefault();
    onUpdateUser({
      name: name,
      about: description,
    });
  }

  return (
    <PopupWithForm
      title="Редактировать профиль"
      submitButtonText="Сохранить"
      name={"profile-edit"}
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
      >
      <input
        type="text"
        id="username"
        name="name"
        className="popup__input popup__input_name"
        required
        placeholder="Имя"
        minLength="2"
        maxLength="40"
        value={name || ''}
        onChange={handleChangeName}
      />
      <span id="username-error" className="popup__error popup__error_visible"></span>
      <input
        type="text"
        id="about-text"
        name="about"
        className="popup__input popup__input_profession"
        required
        placeholder="О себе"
        minLength="2"
        maxLength="200"
        value={description || ''}
        onChange={handleChangeDescription}
      />
      <span id="about-text-error" className="popup__error popup__error_visible"></span>
    </PopupWithForm>
  );
}

export default EditProfilePopup;
