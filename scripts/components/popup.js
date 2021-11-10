export default class Popup {
  constructor(popupSelector) {
    this._popupSelector = popupSelector;
    this._closeButton = this._popupSelector.querySelector(".popup__exit");
  }

  open() {
    this._popupSelector.classList.add("popup_opened");
    this.setEventListeners();
  }

  close() {
    this._popupSelector.classList.remove("popup_opened");
    document.removeEventListener("keydown", this._handleEscClose);
  }

  _handleEscClose(evt) {
    if (evt.key === "Escape") {
      this.close();
    }
  }
  setEventListeners() {
    this._closeButton.addEventListener("click", () => this.close());
    this._popupSelector.addEventListener("click", (e) => {
      if (e.target === e.currentTarget) {
        this.close();
      }
    });
    window.addEventListener("keydown", (e) => {
      this._handleEscClose(e);
    });
  }
}
