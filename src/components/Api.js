function onResponce(res) {
  return res.ok ? res.json() : Promise.reject(`Ошибка: ${res}`);
}

export default class Api {
  constructor({ url, headers }) {
    this._url = url;
    this._headers = headers;
  }
  getCards() {
    return fetch(`${this._url}/cards`, { headers: this._headers }).then(
      onResponce
    );
  }

  getUserInfo() {
    return fetch(`${this._url}/users/me`, { headers: this._headers }).then(
      onResponce
    );
  }

  setCardLike(cardId) {
    return fetch(`${this._url}/cards/likes/${cardId}`, {
      method: "PUT",
      headers: this._headers,
    }).then(onResponce);
  }

  removeCardLike(cardId) {
    return fetch(`${this._url}/cards/likes/${cardId}`, {
      method: "DELETE",
      headers: this._headers,
    }).then(onResponce);
  }
  changeUserInfo(data) {
    return fetch(`${this._url}/users/me`, {
      method: "PATCH",
      headers: this._headers,
      body: JSON.stringify({
        name: data.name,
        about: data.about,
      }),
    }).then(onResponce);
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
    }).then(onResponce);
  }
  //Удаление карточки
  deleteCard(cardId) {
    return fetch(`${this._url}/cards/${cardId}`, {
      method: "DELETE",
      headers: this._headers,
    }).then(onResponce);
  }
  updateUserAvatar(data) {
    return fetch(`${this._url}/users/me/avatar`, {
      method: "PATCH",
      headers: this._headers,
      body: JSON.stringify({
        avatar: data.avatar,
      }),
    }).then(onResponce);
  }

  // getInitialCards() {
  //   return fetch("https://mesto.nomoreparties.co/v1/cohort-30/cards", {
  //     method: "GET",
  //     headers: {
  //       authorization: "328ef2cf-f132-4d2f-959f-88c97b356965",
  //       "Content-Type": "application/json",
  //     },
  //   }).then((res) => {
  //     if (res.ok) {
  //       return res.json();
  //     }
  //     return Promise.reject(`Ошибка!!!!!!!: ${res.status}`, res);
  //   });
  // }
}
