export default class Card {
  constructor({ data, handleCardClick }, cardSelector) {
    this._name = data.name;
    this._link = data.link;
    this.handleCardClick = handleCardClick;
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
      this.handleCardClick();
    });
  }

  _deleteElement() {
    this._element.remove();
    this._element.innerHTML = null;
  }
  _likeAdd() {
    this._likeButton.classList.toggle("element__like_active");
  }
}

export { Card };