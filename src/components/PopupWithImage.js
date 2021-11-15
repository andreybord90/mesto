import Popup from "./Popup.js";

export default class PopupWithImage extends Popup {
  constructor(popup) {
    super(popup);
    this._popupImageCard = this._popup.querySelector(".popup__image");
    this._popupImageTitle = this._popup.querySelector(
      ".popup__title_type_image"
    );
  }
  open(data) {
    super.open();
    this._popupImageCard.src = data.link;
    this._popupImageCard.alt = data.name;
    this._popupImageTitle.textContent = data.name;
  }
}
