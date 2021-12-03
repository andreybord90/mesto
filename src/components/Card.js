export default class Card {
  constructor(
    { data, handleCardClick, handleLikeClick, handleCardDelete },
    cardSelector
  ) {
    this._likes = data.likes;
    this._name = data.name;
    this._link = data.link;
    this._ownerId = data.owner._id;
    this.id = data._id;
    this._currentUserId = data.currentUserId;

    this._handleCardClick = handleCardClick;
    this._handleLikeClick = handleLikeClick;
    this._handleCardDelete = handleCardDelete;

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

    this._deleteButtomCard();
    this._setEventListeners();
    this._updateLikes();
    this._element.querySelector(".element__count-like").textContent =
      this._likes.length;

    return this._element;
  }

  _setEventListeners() {
    this._element
      .querySelector(".element__delete")
      .addEventListener("click", () => this._handleCardDelete(this));
    this._likeButton.addEventListener("click", () =>
      this._handleLikeClick(this)
    );
    this._cardImage.addEventListener("click", () => {
      this._handleCardClick();
    });
  }

  _deleteButtomCard() {
    if (this._currentUserId !== this._ownerId) {
      {
        this._element
          .querySelector(".element__delete")
          .classList.add("element__delete_none");
      }
    }
  }

  deleteElement() {
    this._element.remove();
    this._element.innerHTML = null;
  }

  isLiked() {
    return this._likes.some((user) => user._id === this._currentUserId);
  }

  setLikes(dataLikes) {
    this._likes = dataLikes;
    this._updateLikes();
  }

  _updateLikes() {
    if (!this.isLiked()) {
      this._likeButton.classList.remove("element__like_active");
    } else {
      this._likeButton.classList.add("element__like_active");
    }
    this._element.querySelector(".element__count-like").textContent =
      this._likes.length;
  }
  // _likeAdd() {
  //   this._likeButton.classList.toggle("element__like_active");
  // }
}

export { Card };
