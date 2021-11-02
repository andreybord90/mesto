export default class Popup {
  constructor(popupSelector) {
    this._popupSelector = popupSelector;
  }

  open() {
    _popupSelector.classList.add("popup_opened");
    document.addEventListener("keydown", this._handleEscClose);
  }

  close() {
    _popupSelector.classList.remove("popup_opened");
    document.removeEventListener("keydown", this._handleEscClose);
  }
  _handleEscClose(evt) {
    if (evt.key === "Escape") {
      const popupVisible = document.querySelector(".popup_opened");
      this.close(popupVisible);
    }
  }
  setEventListeners() {
    this.addEventListener("click", () => this.close(popupImage));
    // this.addEventListener("mousedown", closePopupOverlay);
  }
}
