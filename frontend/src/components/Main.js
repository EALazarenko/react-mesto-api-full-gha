import React, { useContext } from 'react';
import Card from './Card';
import { CurrentUserContext } from '../contexts/CurrentUserContext';


function Main({ onEditProfile, onAddPlace, onEditAvatar, onCardClick, onCardLike, onCardDelete, cards }) {

  const currentUser = useContext(CurrentUserContext);
  const { name, about, avatar } = currentUser;

  return (
    <main className="content">
      <section className="profile">
        <div className="profile__list">
          <div className="profile__box-avatar">
            <img className="profile__avatar" alt="Аватар" src={avatar} />
            <button type="button" className="profile__avatar-button" onClick={onEditAvatar} />
          </div>
          <div className="profile__info">
            <h1 className="profile__name">{name}</h1>
            <button type="button" className="profile__edit" title="Кнопка редактирования профиля" onClick={onEditProfile}></button>
            <p className="profile__status">{about}</p>
          </div>
        </div>
        <button type="button" className="profile__add" title="Добавить" onClick={onAddPlace} />
      </section>
      <section className="elements-place">
        <ul className="elements">
          {cards.map((card) => {
            return (
              <Card
                key={card._id}
                card={card}
                link={card.link}
                name={card.name}
                likes={card.likes}
                onCardClick={onCardClick}
                onCardLike={onCardLike}
                onCardDelete={onCardDelete}
              />
            );
          })}
        </ul>
      </section>
    </main>
  );
}

export default Main;
