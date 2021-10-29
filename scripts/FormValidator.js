export default class FormValidator {
  constructor(config, formElement) {
    this._formElement = formElement;
    this._config = config;
    this._submitButton = formElement.querySelector(config.submitButtonSelector);
    this._inputList = formElement.querySelectorAll(config.inputSelector);
  }

  _showError(errorElement, inputElement) {
    errorElement.textContent = inputElement.validationMessage;
    inputElement.classList.add(this._config.inputErrorClass);
  }
  _hideError(errorElement, inputElement) {
    errorElement.textContent = inputElement.validationMessage;
    inputElement.classList.remove(this._config.inputErrorClass);
  }

  _checkInputValidity(inputElement) {
    const isInputNotValid = !inputElement.validity.valid;
    const errorElement = this._formElement.querySelector(
      `#${inputElement.id}-error`
    );

    if (isInputNotValid) {
      this._showError(errorElement, inputElement);
    } else {
      this._hideError(errorElement, inputElement);
    }
  }
  _toggleButtonState() {
    const isFormValid = this._formElement.checkValidity();

    if (isFormValid) {
      this._submitButton.classList.remove(this._config.inactiveButtonClass);
      this._submitButton.disabled = false;
    } else {
      this._submitButton.classList.add(this._config.inactiveButtonClass);
      this._submitButton.disabled = "disabled";
    }
  }

  _setEventListeners() {
    Array.from(this._inputList).forEach((inputElement) => {
      inputElement.addEventListener("input", (evt) => {
        this._checkInputValidity(inputElement);
        this._toggleButtonState();
      });
    });

    this._formElement.addEventListener("submit", (evt) => {
      evt.preventDefault();
    });
  }

  enableValidation() {
    this._setEventListeners();
  }

  resetValidation() {
    this._toggleButtonState();

    this._inputList.forEach((inputElement) => {
      const errorElement = this._formElement.querySelector(
        `#${inputElement.id}-${this._config.errorClass}`
      );
      this._hideError(errorElement, inputElement);
    });
  }
}
