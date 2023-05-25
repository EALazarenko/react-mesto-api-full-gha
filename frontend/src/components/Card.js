import React, { useContext } from "react";
import { CurrentUserContext } from '../contexts/CurrentUserContext';

function Card({ card, onCardClick, onCardLike, onCardDelete }) {
  const currentUser = useContext(CurrentUserContext);

  // Определяем, являемся ли мы владельцем текущей карточки
  const isOwn = card.owner._id === currentUser._id;


  // Определяем, есть ли у карточки лайк, поставленный текущим пользователем
  /* const isLiked = card.likes.some(i => i._id === currentUser._id); */
  const isLiked = card.likes.some((user) => user._id === currentUser._id);

  // Создаём переменную, которую после зададим в `className` для кнопки лайка
  const cardLikeButtonClassName = (
    `element__like ${isLiked && 'element_active'}`
  );;

  const handleClick = () => {
    onCardClick(card);
  };

  const handleLikeClick = () => {
    onCardLike(card);
  };

  const handleDeleteClick = () => {
    onCardDelete(card._id);
  };

  return (
    <li className="element">
      <img className="element__image" src={card.link} alt={card.name} onClick={handleClick} />
      {isOwn && <button
        type="button"
        className='element__delete'
        onClick={handleDeleteClick} />}
      <div className="element__info">
        <h2 className="element__title">{card.name}</h2>
        <div className="element__likes-group">
          <button
            type="button"
            className={cardLikeButtonClassName}
            title="Нравится"
            onClick={handleLikeClick}
          />
          <span className="element__number-likes">{card.likes.length}</span>
        </div>

      </div>
    </li>
  );
}

export default Card;
