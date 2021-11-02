import FormValidator from "../scripts/FormValidator.js";
import Card from "../scripts/Card.js";
import { initialCards } from "../scripts/array.js";
import Section from "./components/Section.js";
import PopupWithImage from "./components/PopupWithImage.js";

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

const cardListSelector = ".elements";

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

const defaultSection = new Section(
  {
    data: initialCards,
    renderer: (item) => {
      const card = new Card(item, ".element__template");
      const cardElement = card.generateCard();
      defaultSection.addItem(cardElement);
    },
  },
  cardListSelector
);

const newPopup = new PopupWithImage({ popupImage });

// function createCard(data) {
//   const card = new Card(data, ".element__template").generateCard();
//   return card;
// }

// initialCards.forEach((item) => {
//   const defaultCards = createCard(item);
//   contentElements.append(defaultCards);
// });

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

// function editOpen() {
//   nameFromInput.value = nameToProfile.textContent;
//   jobFromInput.value = jobToProfile.textContent;
//   openPopup(profilePopup);
// }
// function openPopup(props) {
//   props.classList.add("popup_opened");
//   document.addEventListener("keydown", closePopupEscape);
// }

function closePopup(props) {
  props.classList.remove("popup_opened");
  document.removeEventListener("keydown", closePopupEscape);
}
function closePopupEscape(evt) {
  if (evt.key === "Escape") {
    const popupVisible = document.querySelector(".popup_opened");
    closePopup(popupVisible);
  }
}
function closePopupOverlay(event) {
  if (event.target === event.currentTarget) {
    closePopup(event.target);
  }
}

function submitFormEdit(event) {
  event.preventDefault();

  nameToProfile.textContent = nameFromInput.value;
  jobToProfile.textContent = jobFromInput.value;

  closePopup(profilePopup);
}

function handleOpenAddPopup() {
  cardFormValidation.resetValidation();
  this.Open(popupAdd);
}

// popupOpenBtn.addEventListener("click", this.Open);
popupCloseBtn.addEventListener("click", () => closePopup(profilePopup));
formEdit.addEventListener("submit", submitFormEdit);

popupOpenBtnAdd.addEventListener("click", handleOpenAddPopup);
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

defaultSection.renderItems();

// export { openPopup };
