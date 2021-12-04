function onResponce(res) {
  return res.ok ? res.json() : Promise.reject(`Ошибка: ${res}`);
}

export default class Api {
  constructor({ url, headers }) {
    this._url = url;
    this._headers = headers;
  }
  getCards() {
    return fetch(`${this._url}/cards`, { headers: this._headers })
      .then(onResponce)
      .catch((err) => {
        console.log(err);
      });
  }

  getUserInfo() {
    return fetch(`${this._url}/users/me`, { headers: this._headers })
      .then(onResponce)
      .catch((err) => {
        console.log(err);
      });
  }

  setCardLike(cardId) {
    return fetch(`${this._url}/cards/likes/${cardId}`, {
      method: "PUT",
      headers: this._headers,
    })
      .then(onResponce)
      .catch((err) => {
        console.log(err);
      });
  }

  removeCardLike(cardId) {
    return fetch(`${this._url}/cards/likes/${cardId}`, {
      method: "DELETE",
      headers: this._headers,
    })
      .then(onResponce)
      .catch((err) => {
        console.log(err);
      });
  }
  changeUserInfo(data) {
    return fetch(`${this._url}/users/me`, {
      method: "PATCH",
      headers: this._headers,
      body: JSON.stringify({
        name: data.name,
        about: data.about,
      }),
    })
      .then(onResponce)
      .catch((err) => {
        console.log(err);
      });
  }
  //Добавление карточки
  insertCard(data) {
    return fetch(`${this._url}/cards `, {
      method: "POST",
      headers: this._headers,
      body: JSON.stringify({
        name: data.name,
        link: data.link,
      }),
    })
      .then(onResponce)
      .catch((err) => {
        console.log(err);
      });
  }
  //Удаление карточки
  deleteCard(cardId) {
    return fetch(`${this._url}/cards/${cardId}`, {
      method: "DELETE",
      headers: this._headers,
    })
      .then(onResponce)
      .catch((err) => {
        console.log(err);
      });
  }
  updateUserAvatar(data) {
    return fetch(`${this._url}/users/me/avatar`, {
      method: "PATCH",
      headers: this._headers,
      body: JSON.stringify({
        avatar: data.avatar,
      }),
    })
      .then(onResponce)
      .catch((err) => {
        console.log(err);
      });
  }
}
