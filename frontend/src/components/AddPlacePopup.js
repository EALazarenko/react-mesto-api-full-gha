import React, { useState, useEffect } from "react";
import PopupWithForm from "./PopupWithForm";

const AddPlacePopup = ({ isOpen, onClose, onAddPlace }) => {

  const [name, setName] = useState('');
  const [link, setLink] = useState('');

  function handleChangeTitle(e) {
    setName(e.target.value)
  }

  function handleChangeLink(e) {
    setLink(e.target.value)
  }

  function handleSubmit(e) {
    e.preventDefault();
    onAddPlace({
      name,
      link,
    });
  }

  useEffect(() => {
    if (isOpen) {
      setName('');
      setLink('');
    }
  }, [isOpen])

  return (
    <PopupWithForm
      name="add"
      title="Новое место"
      button="Создать"
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
    >
      <input
        type="text"
        id="title"
        name="title"
        className="popup__add-item popup__add-item_type_title popup__input"
        placeholder="Название"
        required
        minLength="2"
        maxLength="30"
        onChange={handleChangeTitle}
        value={name} />
      <span className="popup__error input-title-error"></span>
      <input
        type="url"
        id="link"
        name="link"
        className="popup__add-item popup__add-item_type_link popup__input"
        placeholder="Ссылка на картинку"
        required
        onChange={handleChangeLink}
        value={link} />
      <span className="popup__error input-link-error"></span>
    </PopupWithForm>
  )
}

export default AddPlacePopup;
