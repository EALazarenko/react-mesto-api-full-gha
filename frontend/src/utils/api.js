import { BASE_URL } from "./auth";

class Api {
  constructor(options) {
    this._baseUrl = options.baseUrl;
  }

  // проверка на ошибку
  _getResponse(res) {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Ошибка: ${res.status}`)
  }

  // получение всех карточек

  getInitialCards(token) {
    return fetch(`${this._baseUrl}/cards`, {
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`
      },
    })
      .then(res => this._getResponse(res));
  }

  // создание карточки
  addCard(data, token) {
    return fetch(`${this._baseUrl}/cards`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`
      },
      body: JSON.stringify({
        name: data.name,
        link: data.link,
      }),
    }).then(res => this._getResponse(res));
  }

  //получение инфы о пользователе
  getUserInfo() {
    return fetch(`${this._baseUrl}/users/me`, {
      credentials: 'include',
      headers: this._headers
    })
      .then(res => this._getResponse(res));
  }

  // Лайк
  setLike(id, token) {
    return fetch(`${this._baseUrl}/cards/${id}/likes`, {
      method: 'PUT',
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`
      },
    })
      .then(res => this._getResponse(res));
  }

  // снятие лайка
  deleteLike(id, token) {
    return fetch(`${this._baseUrl}/cards/${id}/likes`, {
      method: 'DELETE',
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`
      },
    })
      .then(res => this._getResponse(res));
  }

  changeLikeCardStatus(id, isLiked, token) {
    return fetch(`${this._baseUrl}/cards/${id}/likes`, {
      method: `${!isLiked ? 'DELETE' : 'PUT'}`,
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`
      },
    })
      .then(res => this._getResponse(res));
  }

  // Удаление
  deleteCard(id, token) {
    return fetch(`${this._baseUrl}/cards/${id}`, {
      method: 'DELETE',
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`
      },
    })
      .then(res => this._getResponse(res));
  }

  //редактирование информации о пользователе
  editUserInfo(name, about, token) {
    return fetch(`${this._baseUrl}/users/me`, {
      method: 'PATCH',
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`
      },
      body: JSON.stringify({
        name,
        about,
      })
    })
      .then(res => this._getResponse(res));
  }

  // смена аватара
  changeAvatar(data, token) {
    return fetch(`${this._baseUrl}/users/me/avatar`, {
      method: 'PATCH',
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`
      },
      body: JSON.stringify({
        avatar: data.avatar
      })
    })
      .then(res => this._getResponse(res));
  }
}

const api = new Api({
  baseUrl: BASE_URL,
  headers: {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${localStorage.getItem('jwt')}`,
  },
});

/* const api = new Api({
  baseUrl: 'https://mesto.nomoreparties.co/v1/cohort-59',
  headers: {
    authorization: '872631fc-34b5-4c0e-9953-de36451ae843',
    'Content-Type': 'application/json'
  }
}); */

export default api;
