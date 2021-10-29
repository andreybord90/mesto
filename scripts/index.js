import FormValidator from "../scripts/FormValidator.js";
import Card from "../scripts/Card.js";

const initialCards = [
  {
    name: "Архыз",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg",
  },
  {
    name: "Челябинская область",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg",
  },
  {
    name: "Иваново",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg",
  },
  {
    name: "Камчатка",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg",
  },
  {
    name: "Холмогорский район",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg",
  },
  {
    name: "Байкал",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg",
  },
];

//попап редактирования профиля
const profilePopup = document.querySelector(".popup-type-edit");
const popupOpenBtn = document.querySelector(".profile__button");
const popupCloseBtn = profilePopup.querySelector(".popup__exit_type_edit");
const formEdit = document.querySelector(".popup__form");

const nameFromInput = profilePopup.querySelector(".popup__text_type_name"); //Имя в попап
const jobFromInput = profilePopup.querySelector(".popup__text_type_job");

//попап контент
const popupAdd = document.querySelector(".popup_type_add");
const popupOpenBtnAdd = document.querySelector(".profile__add-button");
const popupCloseBtnAdd = popupAdd.querySelector(".popup__exit_type_add");
const formAdd = document.querySelector(".popup__form_type_add");

const popupImage = document.querySelector(".popup_type_image");
const popupImageClose = popupImage.querySelector(".popup__exit_type_image");

const contentElements = document.querySelector(".elements");

const nameToProfile = document.querySelector(".profile__name"); //Имя на странице
const jobToProfile = document.querySelector(".profile__job");

const config = {
  formSelector: ".popup__form",
  inputSelector: ".popup__text",
  submitButtonSelector: ".popup__button",
  inactiveButtonClass: "popup__button_disabled",
  inputErrorClass: "popup__text_type_error",
  errorClass: "error",
};

const cardFormValidation = new FormValidator(config, formAdd);
const editFormValidation = new FormValidator(config, formEdit);

function renderContent(el) {
  const newCard = createCard(el);
  contentElements.prepend(newCard);
}

function createCard(data) {
  const card = new Card(data, ".element__template").generateCard();
  return card;
}

initialCards.forEach((item) => {
  const defaultCards = createCard(item);
  contentElements.append(defaultCards);
});

function addContent(event) {
  event.preventDefault();

  const newPlaceName = {};
  newPlaceName.name = event.currentTarget.querySelector(
    ".popup__text_type_sign"
  ).value;
  newPlaceName.link = event.currentTarget.querySelector(
    ".popup__text_type_url"
  ).value;

  renderContent(newPlaceName);

  event.currentTarget.reset();
  closePopup(popupAdd);
}

function openPopup(props) {
  props.classList.add("popup_opened");
  document.addEventListener("keydown", closePopupEscape);
}

function editOpen() {
  nameFromInput.value = nameToProfile.textContent;
  jobFromInput.value = jobToProfile.textContent;
  openPopup(profilePopup);
}

function closePopup(props) {
  props.classList.remove("popup_opened");
  document.removeEventListener("keydown", closePopupEscape);
}

function formSubmit(event) {
  event.preventDefault();

  nameToProfile.textContent = nameFromInput.value;
  jobToProfile.textContent = jobFromInput.value;

  closePopup(profilePopup);
}

function closePopupOverlay(event) {
  if (event.target === event.currentTarget) {
    closePopup(event.target);
  }
}

function closePopupEscape(evt) {
  if (evt.key === "Escape") {
    const popupVisible = document.querySelector(".popup_opened");
    closePopup(popupVisible);
  }
}

popupOpenBtn.addEventListener("click", editOpen);
popupCloseBtn.addEventListener("click", () => closePopup(profilePopup));
formEdit.addEventListener("submit", formSubmit);

popupOpenBtnAdd.addEventListener("click", () => openPopup(popupAdd));
popupCloseBtnAdd.addEventListener("click", () => closePopup(popupAdd));
formAdd.addEventListener("submit", addContent);

popupImageClose.addEventListener("click", () => closePopup(popupImage));

profilePopup.addEventListener("mousedown", closePopupOverlay);
popupAdd.addEventListener("mousedown", closePopupOverlay);
popupImage.addEventListener("mousedown", closePopupOverlay);

const enableValidation = (config) => {
  cardFormValidation.enableValidation();
  editFormValidation.enableValidation();
};

enableValidation(config);

export { openPopup };
