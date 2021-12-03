import Popup from "./Popup.js";

export default class PopupWithSubmit extends Popup {
  constructor(popup) {
    super(popup);
    this._form = this._popup.querySelector(".popup__form");

    this._handleFormSubmit = null;
  }

  setActionSubmit(action) {
    this._handleFormSubmit = action;
  }

  setEventListeners() {
    super.setEventListeners();
    this._form.addEventListener("submit", (e) => {
      e.preventDefault();

      this._handleFormSubmit();
    });
  }
}
