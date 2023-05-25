import React, { useRef } from "react";
import PopupWithForm from "./PopupWithForm";

const EditAvatarPopup = ({ isOpen, onClose, onUpdateAvatar }) => {

  const avatar = useRef();

  function handleSubmit(e) {
    e.preventDefault();

    onUpdateAvatar({
      avatar: avatar.current.value
    });
    e.target.reset()
  }

  return (
    <PopupWithForm
      name="avatar"
      title="Обновить аватар"
      button="Сохранить"
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
    >
      <input
        type="url"
        id="avatar"
        name="avatar"
        className="popup__add-item popup__add-item_type_avatar popup__input"
        placeholder="Ссылка на картинку"
        required
        ref={avatar} />
      <span className="popup__error input-avatar-error"></span>
    </PopupWithForm>
  )
}

export default EditAvatarPopup;
