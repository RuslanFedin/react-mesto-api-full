import React, { useContext } from 'react';
import { CurrentUserContext } from '../contexts/CurrentUserContext.js';

function Card({card, onCardClick, onCardLike, onCardDelete}) {
  const currentUser = useContext(CurrentUserContext);
  const isOwn = card.owner === currentUser._id;
  const cardDeleteButtonVisible = (
    `${isOwn ? 'element-item__remove' : 'element-item__remove element-item__remove-hidden'}`
  );
  const isLiked = card.likes.some(_id => _id === currentUser._id);
  const cardLikeButtonClassName = (
    `${isLiked ? 'element-item__like element-item__like_active' : 'element-item__like'}`
  );

  function handleCardClick() {
    onCardClick(card);
  }

  function handleCardLike() {
    onCardLike(card);
  }

  function handleCardDelete() {
    onCardDelete(card);
  }

  return (
    <li className="element-item">
      <article className="element-item__article">
        <button
          aria-label="Удалить"
          className={cardDeleteButtonVisible}
          onClick = {handleCardDelete}
        ></button>
        <div
          className="element-item__image"
          style={{backgroundImage: `url(${card.link})`}}
          onClick = {handleCardClick}
        />
        <div className="element-item__footer">
          <h2 className="element-item__title">{card.name}</h2>
          <div className ="element-item__like-section">
            <button
              aria-label="Нравится"
              className={cardLikeButtonClassName}
              onClick = {handleCardLike}
            ></button>
            <p className="element-item__counter">{card.likes.length}</p>
          </div>
        </div>
      </article>
    </li>
  )
}

export default Card;
