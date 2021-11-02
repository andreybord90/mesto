import Popup from "./popup.js";

export default class PopupWithImage extends Popup {
  open(props) {
    props.classList.add("popup_opened");
    document.addEventListener("keydown", this._handleEscClose);
  }
}
