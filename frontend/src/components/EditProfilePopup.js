import React, { useContext, useState, useEffect } from "react";
import { CurrentUserContext } from "../contexts/CurrentUserContext";
import PopupWithForm from "./PopupWithForm";

const EditProfilePopup = ({ isOpen, onClose, onUpdateUser }) => {
  const currentUser = useContext(CurrentUserContext);
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');

  function handleSubmit(e) {
    e.preventDefault();
    onUpdateUser({
      name,
      about: description,
    });
  }

  useEffect(() => {
    setName(currentUser.name);
    setDescription(currentUser.about);
  }, [currentUser, isOpen]);

  function handleChangeName(e) {
    setName(e.target.value)
  }

  function handleChangeDecription(e) {
    setDescription(e.target.value)
  }

  return (
    <PopupWithForm
      name="edit"
      title="Редактировать профиль"
      button="Сохранить"
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
    >
      <input
        type="text"
        id="name"
        name="name"
        className="popup__add-item popup__add-item_type_name popup__input"
        placeholder="Имя"
        required
        minLength="2"
        maxLength="40"
        value={name || ''}
        onChange={handleChangeName} />
      <span className="popup__error input-name-error"></span>
      <input
        type="text"
        id="about"
        name="about"
        className="popup__add-item popup__add-item_type_status popup__input"
        placeholder="Вид деятельность"
        required
        minLength="2"
        maxLength="200"
        value={description || ''}
        onChange={handleChangeDecription} />
      <span className="popup__error input-status-error"></span>
    </PopupWithForm>
  )
}

export default EditProfilePopup;
