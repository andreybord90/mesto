import { openPopup } from "../scripts/index.js";

const popup = document.querySelector(".popup_type_image");

export default class Card {
  constructor(data, cardSelector) {
    this._name = data.name;
    this._link = data.link;
    this._cardSelector = cardSelector;
  }

  _getTemplate() {
    const cardElement = document
      .querySelector(this._cardSelector)
      .content.querySelector(".element")
      .cloneNode(true);

    return cardElement;
  }
  generateCard() {
    this._element = this._getTemplate();

    this._cardImage = this._element.querySelector(".element__image");
    this._cardImage.src = this._link;
    this._cardImage.alt = this._name;

    this._likeButton = this._element.querySelector(".element__like");

    this._element.querySelector(".element__name").textContent = this._name;

    this._setEventListeners();
    return this._element;
  }

  _setEventListeners() {
    this._element
      .querySelector(".element__trash")
      .addEventListener("click", () => this._deleteElement());
    this._likeButton.addEventListener("click", () => this._likeAdd());
    this._cardImage.addEventListener("click", () => {
      this._openImage();
    });
  }

  _deleteElement() {
    this._element.remove();
    this._element.innerHTML = null;
  }
  _likeAdd() {
    this._likeButton.classList.toggle("element__like_active");
  }
  _openImage() {
    const popupImage = popup.querySelector(".popup__image");

    popupImage.src = this._link;
    popupImage.alt = this._name;
    popup.querySelector(".popup__title").textContent = this._name;

    openPopup(popup);
  }
}

export { Card };
