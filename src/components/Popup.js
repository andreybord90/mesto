export default class Popup {
  constructor(popup) {
    this._popup = popup;

    this._handleEscClick = this._handleEscClose.bind(this);
  }

  open() {
    this._popup.classList.add("popup_opened");
    document.addEventListener("keydown", this._handleEscClick);
    console.log("OPEN");
  }

  close() {
    this._popup.classList.remove("popup_opened");
    document.removeEventListener("keydown", this._handleEscClick);
  }

  _handleEscClose(evt) {
    if (evt.key === "Escape") {
      this.close();
    }
  }
  setEventListeners() {
    this._popup.addEventListener("click", (e) => {
      if (
        e.target.classList.contains("popup_opened") ||
        e.target.classList.contains("popup__exit")
      ) {
        this.close();
      }
    });
  }
}
