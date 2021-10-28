const showError = (errorElement, inputElement, config) => {
  errorElement.textContent = inputElement.validationMessage;
  inputElement.classList.add(config.inputErrorClass);
};

const hideError = (errorElement, inputElement, config) => {
  errorElement.textContent = inputElement.validationMessage;
  inputElement.classList.remove(config.inputErrorClass);
};

const checkInputValidity = (formElement, inputElement, config) => {
  const isInputNotValid = !inputElement.validity.valid;
  const errorElement = formElement.querySelector(`#${inputElement.id}-error`);

  if (isInputNotValid) {
    showError(errorElement, inputElement, config);
  } else {
    hideError(errorElement, inputElement, config);
  }
};

const toggleButtonState = (button, isActive, config) => {
  if (isActive) {
    button.classList.remove(config.inactiveButtonClass);
    button.disabled = false;
  } else {
    button.classList.add(config.inactiveButtonClass);
    button.disabled = "disabled";
  }
};

const setEventListeners = (formElement, config) => {
  const inputList = formElement.querySelectorAll(config.inputSelector);
  const submitButton = formElement.querySelector(config.submitButtonSelector);
  const isFormValid = formElement.checkValidity();
  toggleButtonState(submitButton, isFormValid, config);

  Array.from(inputList).forEach((inputElement) => {
    inputElement.addEventListener("input", () => {
      const isFormValid = formElement.checkValidity();

      checkInputValidity(formElement, inputElement, config);
      toggleButtonState(submitButton, isFormValid, config);
    });
  });

  formElement.addEventListener("submit", (evt) => {
    evt.preventDefault();
    toggleButtonState(submitButton, false, config);
  });
};

const enableValidation = (config) => {
  const forms = document.querySelectorAll(config.formSelector);

  Array.from(forms).forEach((formElement) => {
    setEventListeners(formElement, config);
  });
};

const validationConfig = {
  formSelector: ".popup__form",
  inputSelector: ".popup__text",
  submitButtonSelector: ".popup__button",
  inactiveButtonClass: "popup__button_disabled",
  inputErrorClass: "popup__text_type_error",
  //   errorClass: "popup__text-error",
};

enableValidation(validationConfig);
