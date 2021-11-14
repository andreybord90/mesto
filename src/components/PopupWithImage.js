import Popup from "./Popup.js";

// const popupImage = document.querySelector(".popup_type_image");

export default class PopupWithImage extends Popup {
  constructor(popupSelector) {
    super(popupSelector);
    this._popupImageCard = this._popupSelector.querySelector(".popup__image");
    this._popupImageTitle = this._popupSelector.querySelector(
      ".popup__title_type_image"
    );
  }
  open(data) {
    super.open();
    this._popupSelector.classList.add("popup_opened");
    this._popupImageCard.src = data.link;
    this._popupImageCard.alt = data.name;
    this._popupImageTitle.textContent = data.name;
  }
}
