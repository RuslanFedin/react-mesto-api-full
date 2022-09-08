import { useRef, useEffect } from 'react';
import PopupWithForm from './PopupWithForm';

function EditAvatarPopup({isOpen, onClose, onUpdateAvatar}) {
  const avatarRef = useRef(null);

  useEffect(() => {
    if (isOpen) {
      avatarRef.current.value = "";
    }
  }, [isOpen]);


  function handleChangeAvatar() {
    return avatarRef.current.value;
  }

  function handleSubmit(e) {
    e.preventDefault();

    onUpdateAvatar({
      avatar: avatarRef.current.value,
    });
  }

  return (
    <PopupWithForm
      title="Обновить аватар"
      submitButtonText="Сохранить"
      isOpen={isOpen}
      name={"change-avatar"}
      onClose={onClose}
      onSubmit={handleSubmit}
    >
      <input
        type="url"
        id="avatar-link"
        name="avatar"
        className="popup__input popup__input_avatar"
        required
        placeholder="Ссылка на картинку"
        ref={avatarRef}
        onChange={handleChangeAvatar}
      />
      <span id="avatar-link-error" className="popup__error popup__error_visible"></span>
    </PopupWithForm>
  );
}

export default EditAvatarPopup;
