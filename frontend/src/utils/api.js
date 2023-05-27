import { BASE_URL } from "./auth";

class Api {
  constructor(options) {
    this._baseUrl = options.baseUrl;
    this._headers = options.headers;
  }

  _headersData = () => {
    this._token = localStorage.getItem('token');
    this._headers.authorization = `Bearer ${this._token}`
    return this._headers;
  }

  // проверка на ошибку
  _getResponse(res) {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Ошибка: ${res.status}`)
  }

  // получение всех карточек
  getInitialCards() {
    return fetch(`${this._baseUrl}/cards`, {
      headers: this._headersData(),
    })
      .then(res => this._getResponse(res));
  }

  // создание карточки
  addCard(data) {
    return fetch(`${this._baseUrl}/cards`, {
      method: "POST",
      headers: this._headersData(),
      body: JSON.stringify({
        name: data.name,
        link: data.link,
      }),
    }).then(res => this._getResponse(res));
  }

  //получение инфы о пользователе
  getUserInfo() {
    return fetch(`${this._baseUrl}/users/me`, {
      headers: this._headersData(),
    })
      .then(res => this._getResponse(res));
  }

  // Лайк
  setLike(id) {
    return fetch(`${this._baseUrl}/cards/${id}/likes`, {
      method: 'PUT',
      headers: this._headersData(),
    })
      .then(res => this._getResponse(res));
  }

  // снятие лайка
  deleteLike(id) {
    return fetch(`${this._baseUrl}/cards/${id}/likes`, {
      method: 'DELETE',
      headers: this._headersData(),
    })
      .then(res => this._getResponse(res));
  }

  changeLikeCardStatus(id, isLiked) {
    return fetch(`${this._baseUrl}/cards/${id}/likes`, {
      method: `${!isLiked ? 'DELETE' : 'PUT'}`,
      headers: this._headersData(),
    })
      .then(res => this._getResponse(res));
  }

  // Удаление
  deleteCard(id) {
    return fetch(`${this._baseUrl}/cards/${id}`, {
      method: 'DELETE',
      headers: this._headersData(),
    })
      .then(res => this._getResponse(res));
  }

  //редактирование информации о пользователе
  editUserInfo(name, about) {
    return fetch(`${this._baseUrl}/users/me`, {
      method: 'PATCH',
      headers: this._headersData(),
      body: JSON.stringify({
        name,
        about,
      })
    })
      .then(res => this._getResponse(res));
  }

  // смена аватара
  changeAvatar(data) {
    return fetch(`${this._baseUrl}/users/me/avatar`, {
      method: 'PATCH',
      headers: this._headersData(),
      body: JSON.stringify({
        avatar: data.avatar
      })
    })
      .then(res => this._getResponse(res));
  }
}

export const api = new Api({
  baseUrl: BASE_URL,
  headers: {
    "Content-Type": "application/json",
    'Accept': 'application/json',
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
