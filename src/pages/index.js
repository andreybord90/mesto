import "./index.css";
import FormValidator from "../components/FormValidator.js";
import Card from "../components/Card.js";
import { initialCards, config, cardListSelector } from "../utils/constants.js";
import Section from "../components/Section.js";
import PopupWithImage from "../components/PopupWithImage.js";
import PopupWithForm from "../components/PopupWithForm.js";
import UserInfo from "../components/UserInfo.js";

//попап редактирования профиля
const popupEdit = document.querySelector(".popup-type-edit");
const popupOpenBtnEdit = document.querySelector(".profile__button");
const formEdit = document.querySelector(".popup__form");

// const nameFromInput = popupEdit.querySelector(".popup__text_type_name"); //Имя в попап
// const jobFromInput = popupEdit.querySelector(".popup__text_type_job");

//попап контент
const popupAdd = document.querySelector(".popup_type_add");
const popupOpenBtnAdd = document.querySelector(".profile__add-button");
const formAdd = document.querySelector(".popup__form_type_add");

const popupImage = document.querySelector(".popup_type_image");

const contentElements = document.querySelector(".elements");

// const nameToProfile = document.querySelector(".profile__name"); //Имя на странице
// const jobToProfile = document.querySelector(".profile__job");

const nameEditProfile = document.querySelector(".profile__name");
const jobEditProfile = document.querySelector(".profile__job");

const nameInput = popupEdit.querySelector("[name=popup__name]");
const jobInput = popupEdit.querySelector("[name=popup__job]");

const cardFormValidation = new FormValidator(config, formAdd);
const editFormValidation = new FormValidator(config, formEdit);

const userInfo = new UserInfo(nameEditProfile, jobEditProfile);

const createCard = (data) => {
  const card = new Card(
    {
      data,
      handleCardClick: () => {
        openPopup.open(data);
      },
    },
    ".element__template"
  ).generateCard();
  return card;
};

const defaultSection = new Section(
  {
    data: initialCards,
    renderer: (item) => {
      const card = createCard(item);
      defaultSection.addItem(card);
    },
  },
  cardListSelector
);
defaultSection.renderItems();

const openPopup = new PopupWithImage(popupImage);
openPopup.setEventListeners();

const openPopupAdd = new PopupWithForm({
  popup: popupAdd,
  handleFormSubmit: (event) => {
    addContent(event);
  },
});
openPopupAdd.setEventListeners();

const openPopupEdit = new PopupWithForm({
  popup: popupEdit,
  handleFormSubmit: (e) => {
    handleFormSubmit(e);
  },
});
openPopupEdit.setEventListeners();

const handleFormSubmit = () => {
  userInfo.setUserInfo(openPopupEdit._getInputValues);
  openPopupEdit.close();
};

const openOnClickEdit = (event) => {
  event.preventDefault();
  editFormValidation.resetValidation();
  openPopupEdit.open();
};

const cardName = document.querySelector(".popup__text_type_sign");
const cardLink = document.querySelector(".popup__text_type_url");
const newPlaceName = {
  name: cardName.value,
  link: cardLink.value,
};
const addContent = (event) => {
  const newCard = createCard(newPlaceName);
  renderContent(newCard);
  // event.currentTarget.reset();
  openPopupAdd.close();
  event.currentTarget.reset();
};
const newSection = new Section(
  {
    data: newPlaceName,
    renderer: (item) => {
      const card = createCard(item);
      newSection.prependItem(card);
    },
  },
  cardListSelector
);
const renderContent = (newPlaceName) => {
  const newCard = createCard(newPlaceName);
  // newCard.addItem();
  console.log("newPlaceName", newPlaceName);
  newSection.prependItem(newCard);
};

const openOnClickAdd = () => {
  openPopupAdd.open();

  cardFormValidation.resetValidation();
};

popupOpenBtnAdd.addEventListener("click", openOnClickAdd);
popupOpenBtnEdit.addEventListener("click", (e) => {
  const getUserInfo = userInfo.getUserInfo();
  nameInput.value = getUserInfo.name;
  jobInput.value = getUserInfo.job;
  cardFormValidation.resetValidation();
  openOnClickEdit(e);
});

const enableValidation = (config) => {
  cardFormValidation.enableValidation();
  editFormValidation.enableValidation();
};

enableValidation(config);
