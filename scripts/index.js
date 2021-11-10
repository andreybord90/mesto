import FormValidator from "../scripts/FormValidator.js";
import Card from "../scripts/Card.js";
import { initialCards } from "../scripts/array.js";
import Section from "./components/Section.js";
import PopupWithImage from "./components/PopupWithImage.js";
import PopupWithForm from "./components/PopupWithForm.js";
import UserInfo from "./components/UserInfo.js";

//попап редактирования профиля
const popupEdit = document.querySelector(".popup-type-edit");
const popupOpenBtn = document.querySelector(".profile__button");
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

const userInfo = new UserInfo(nameEditProfile, jobEditProfile);

const defaultSection = new Section(
  {
    data: initialCards,
    renderer: (item) => {
      const card = new Card(
        {
          data: item,
          handleCardClick: () => {
            const openPopup = new PopupWithImage(item, popupImage);
            openPopup.open();
          },
        },
        ".element__template"
      );
      const cardElement = card.generateCard();
      defaultSection.addItem(cardElement);
    },
  },
  cardListSelector
);

const openPopupAdd = new PopupWithForm({
  popupSelector: popupAdd,
  handleFormSubmit: (event) => {
    addContent(event);
  },
});

const openPopupEdit = new PopupWithForm({
  popupSelector: popupEdit,
  handleFormSubmit: (event) => {
    openOnClickEdit(event);
  },
});

const openOnClickEdit = (event) => {
  event.preventDefault();
  userInfo.setUserInfo(nameInput.value, jobInput.value);
  userInfo.updateUserInfo();
  openPopupEdit.open();
};

function createCard(data) {
  console.log(data);
  const card = new Card(
    {
      data,
      handleCardClick: () => {
        const openPopup = new PopupWithImage(data, popupImage);
        openPopup.open();
      },
    },
    ".element__template"
  ).generateCard();
  return card;
}
function renderContent(el) {
  const newCard = createCard(el);
  contentElements.prepend(newCard);
}

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
  openPopupAdd.close();
}

const openOnClickAdd = () => {
  openPopupAdd.open();
};

popupOpenBtnAdd.addEventListener("click", () => {
  const getUserInfo = UserInfo.getUserInfo();
  nameInput.value = getUserInfo.name;
  jobInput.value = getUserInfo.job;
  openOnClickAdd;
});
popupOpenBtn.addEventListener("click", openOnClickEdit);

// formEdit.addEventListener("submit", submitFormEdit);

// popupOpenBtnAdd.addEventListener("click", handleOpenAddPopup);

// formAdd.addEventListener("submit", addContent);

// popupImageClose.addEventListener("click", () => closePopup(popupImage));

// popupEdit.addEventListener("mousedown", closePopupOverlay);
// popupAdd.addEventListener("mousedown", closePopupOverlay);
// popupImage.addEventListener("mousedown", closePopupOverlay);
// popupCloseBtnAdd.addEventListener("click", closeOnClickAdd);

const enableValidation = (config) => {
  cardFormValidation.enableValidation();
  editFormValidation.enableValidation();
};

enableValidation(config);

defaultSection.renderItems();

// const closeOnClickAdd = () => {
//   // console.log("hello");
//   openPopupAdd.close();
// };
// initialCards.forEach((item) => {
//   const defaultCards = createCard(item);
//   contentElements.append(defaultCards);
// });

// function editOpen() {
//   nameFromInput.value = nameToProfile.textContent;
//   jobFromInput.value = jobToProfile.textContent;
//   openPopup(popupEdit);
// }
// function openPopup(props) {
//   props.classList.add("popup_opened");
//   document.addEventListener("keydown", closePopupEscape);
// }

// function closePopup(props) {
//   props.classList.remove("popup_opened");
//   document.removeEventListener("keydown", closePopupEscape);
// }
// function closePopupEscape(evt) {
//   if (evt.key === "Escape") {
//     const popupVisible = document.querySelector(".popup_opened");
//     closePopup(popupVisible);
//   }
// }

// function closePopupOverlay(event) {
//   if (event.target === event.currentTarget) {
//     closePopup(event.target);
//   }
// }

// function handleOpenAddPopup() {
//   cardFormValidation.resetValidation();
//   openPopup(popupAdd);
// }
// export { openPopup };
