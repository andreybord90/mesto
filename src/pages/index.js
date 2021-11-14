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
// const popupCloseBtn = popupEdit.querySelector(".popup__exit_type_edit");
const formEdit = document.querySelector(".popup__form");

// const nameFromInput = popupEdit.querySelector(".popup__text_type_name"); //Имя в попап
// const jobFromInput = popupEdit.querySelector(".popup__text_type_job");

//попап контент
const popupAdd = document.querySelector(".popup_type_add");
const popupOpenBtnAdd = document.querySelector(".profile__add-button");
// const popupCloseBtnAdd = popupAdd.querySelector(".popup__exit_type_add");
const formAdd = document.querySelector(".popup__form_type_add");

const popupImage = document.querySelector(".popup_type_image");
// const popupImageClose = popupImage.querySelector(".popup__exit_type_image");

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
const openPopup = new PopupWithImage(popupImage);

const createCard = (data) => {
  const card = new Card(
    {
      data,
      handleCardClick: () => {
        openPopup.setEventListeners();
        openPopup.open(data);
      },
    },
    ".element__template"
  ).generateCard();
  return card;
};

const openPopupAdd = new PopupWithForm({
  popupSelector: popupAdd,
  handleFormSubmit: (event) => {
    addContent(event);
  },
});

const openPopupEdit = new PopupWithForm({
  popupSelector: popupEdit,
  handleFormSubmit: (e) => {
    handleFormSubmit(e);
  },
});

const handleFormSubmit = () => {
  userInfo.setUserInfo(openPopupEdit._getInputValues);
  console.log(userInfo);
  openPopupEdit.close();
};

const openOnClickEdit = (event) => {
  event.preventDefault();
  editFormValidation.resetValidation();
  openPopupEdit.open();
  openPopupEdit.setEventListeners();
};

const addContent = (event) => {
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
  openPopupAdd.close();
};

const renderContent = (el) => {
  const newCard = createCard(el);
  newCard.addItem();
};

const openOnClickAdd = () => {
  openPopupAdd.open();
  openPopupAdd.setEventListeners();

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

defaultSection.renderItems();
