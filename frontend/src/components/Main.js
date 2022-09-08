import { useContext } from 'react';
import Card from './Card.js';
import { CurrentUserContext } from '../contexts/CurrentUserContext.js';
import Footer from './Footer.js';
import Header from './Header.js';

function Main({onEditAvatar, onEditProfile, onAddPlace, onCardClick, onCardLike, onCardDelete, cards}) {
  const currentUser = useContext(CurrentUserContext);

  return (
    <main className="content">
      <section className="profile">
        <div className="profile__avatar-container">
          <div
            className="profile__avatar avatar"
            id="avatar"
            style={{ backgroundImage: `url(${currentUser.avatar})` }}
            alt="Аватар"
          />
          <button
            aria-label="Изменить аватар"
            className="profile__change-avatar-button"
            onClick={onEditAvatar}
          ></button>
        </div>
        <div className="profile__info">
          <div className="profile__username">
            <h1 className="profile__name" id="name">{currentUser.name}</h1>
            <p className="profile__profession" id="about">{currentUser.about}</p>
          </div>
          <button
            aria-label="Редактировать профиль"
            className="profile__edit-button"
            onClick={onEditProfile}
          ></button>
        </div>
        <button
          aria-label="Добавить публикацию"
          className="profile__add-button"
          onClick={onAddPlace}
        ></button>
      </section>
      <section aria-label="Фотогалерея пользователя" className="elements">
        <ul className="elements__photo-grid">
          { cards.map(card => (
            <Card
              card = {card}
              key = {card._id}
              id = {card._id}
              link = {card.link}
              name = {card.name}
              onCardClick = {onCardClick}
              onCardLike = {onCardLike}
              onCardDelete = {onCardDelete}
            />
          ))}
        </ul>
      </section>
      <Footer/>
    </main>
  );
}

export default Main;
