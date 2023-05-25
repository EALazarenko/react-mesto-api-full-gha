import React from 'react';

function PopupWithForm(props) {
  return (
    <div className={`popup popup_for_${props.name} ${props.isOpen ? "popup_opened" : ""}`}>
      <div className="popup__container">
        <button type="button" className="popup__close" title="Закрыть" onClick={props.onClose}></button>
        <h2 className="popup__title">{props.title}</h2>
        <form
          className="popup__inputs popup__form"
          name={`${props.name}`}
          onSubmit={props.onSubmit} >
          {props.children}
          {<button type="submit" className="popup__button">{props.button}</button>}
        </form>
      </div>
    </div>
  );
}

export default PopupWithForm;
