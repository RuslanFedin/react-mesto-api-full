import { data } from "autoprefixer";

const token = localStorage.getItem('token');

class Api {
  constructor(options) {
    this.baseUrl = options.baseUrl;
    this.headers = options.headers;
  }

   // Проверяем ответ от сервера
  _handleResponse(resolve) {
    return resolve.ok? resolve.json() : Promise.reject(`ERROR: ${data.status}`);
  }

  // Загрузка информации о пользователе с сервера
  getUserInfo() {
    return fetch(`${this.baseUrl}/users/me`, {
      headers: this.headers
    })
    .then(this._handleResponse);
  }

  // Загрузка карточек с сервера
  getCards() {
    return fetch(`${this.baseUrl}/cards`,{
      headers: this.headers
    })
    .then(this._handleResponse);
  }

  // Редактирование данных профиля
  editUserInfo(data) {
    return fetch(`${this.baseUrl}/users/me`,{
      method: 'PATCH',
      headers: this.headers,
      body: JSON.stringify(data),
    })
    .then(this._handleResponse);
  }

    // Добавление новой карточки
    createCard(data) {
      return fetch(`${this.baseUrl}/cards`,{
        method: 'POST',
        headers: this.headers,
        body: JSON.stringify(data),
      })
      .then(this._handleResponse);
    }

  // Изменение аватара пользователя
  editUserAvatar(data) {
    return fetch(`${this.baseUrl}/users/me/avatar`,{
      method: 'PATCH',
      headers: this.headers,
      body: JSON.stringify(data),
    })
    .then(this._handleResponse);
  }

  // Удаление карточки
  deleteCard(_id) {
    const cardId = _id;
    return fetch(`${this.baseUrl}/cards/${cardId}`,{
      method: 'DELETE',
      headers: this.headers,
    })
    .then(this._handleResponse);
  }

  // Лайкнуть карточку
  setLike(_id) {
    const cardId = _id;
    return fetch(`${this.baseUrl}/cards/${cardId}/likes`,{
      method: 'PUT',
      headers: this.headers,
    })
    .then(this._handleResponse);
  }

  // Убрать лайк
  removeLike(_id) {
    const cardId = _id;
    return fetch(`${this.baseUrl}/cards/${cardId}/likes`,{
      method: 'DELETE',
      headers: this.headers,
    })
    .then(this._handleResponse);
  }

  changeCardLike(_id, isLiked) {
    if (isLiked) {
      return this.setLike(_id);
    } else {
      return this.removeLike(_id);
    }
  }
}

const api = new Api({
  baseUrl: 'http://mestobknd.nomoredomains.sbs',
  headers: {
    authorization: `Bearer ${token}`,
    'Content-Type': 'application/json'
}
});

export default api;
