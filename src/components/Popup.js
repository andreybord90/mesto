export default class Popup {
  constructor(popupSelector) {
    this._popupSelector = popupSelector;

    this._handleEscClose = this._handleEscClose.bind(this);
  }

  open() {
    this._popupSelector.classList.add("popup_opened");
    document.addEventListener("keydown", (evt) => {
      this._handleEscClose(evt);
    });
  }

  close() {
    this._popupSelector.classList.remove("popup_opened");
    document.removeEventListener("keydown", (evt) => {
      this._handleEscClose(evt);
    });
  }

  _handleEscClose(evt) {
    if (evt.key === "Escape") {
      this.close();
    }
  }
  setEventListeners() {
    this._popupSelector.addEventListener("click", (e) => {
      // console.log("helloooo");
      if (
        e.target.classList.contains("popup_opened") ||
        e.target.classList.contains("popup__exit")
      ) {
        this.close();
      }
    });
  }
}
