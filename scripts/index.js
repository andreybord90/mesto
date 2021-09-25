//попап редактирования профиля
const popup = document.querySelector(".popup_type_edit");
const popupOpenBtn = document.querySelector(".profile__button");
const popupCloseBtn = popup.querySelector(".popup__exit");
const formEdit = document.querySelector(".popup__form");

const nameFromInput = popup.querySelector(".popup__text_type_name"); //Имя в попап
const jobFromInput = popup.querySelector(".popup__text_type_job");

//попап контент
const popupAdd = document.querySelector(".popup_type_add");
const popupOpenBtnAdd = document.querySelector(".profile__add-button");
const popupCloseBtnAdd = popupAdd.querySelector(".popup__exit_type_add");
const formAdd = document.querySelector(".popup__form_type_add");

const popupImage = document.querySelector(".popup_type_image");
const popupImageClose = popupImage.querySelector(".popup__exit_type_image");

const contentElements = document.querySelector(".elements");
const contentTamplateElement =
  document.querySelector(".element__template").content;

const nameToProfile = document.querySelector(".profile__name"); //Имя на странице
const jobToProfile = document.querySelector(".profile__job");
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

function renderContent(el) {
  const newContent = contentTamplateElement.cloneNode(true);

  newContent.querySelector(".element__name").textContent = el.name;
  newContent.querySelector(".element__image").src = el.link;

  setListenerToElement(newContent);
  setListenerLike(newContent);
  setListererImage(newContent);

  contentElements.prepend(newContent);
}

function AddContent(event) {
  event.preventDefault();

  let newPlaceName = {};
  newPlaceName.name = event.currentTarget.querySelector(
    ".popup-add__text_type_sign"
  ).value;
  newPlaceName.link = event.currentTarget.querySelector(
    ".popup__text_type_url"
  ).value;

  renderContent(newPlaceName);

  event.currentTarget.reset();
  popupExitAdd();
}

function popupOpenAdd() {
  popupAdd.classList.add("popup_opened");
  console.log(popupAdd.classList);
}

function popupExitAdd() {
  popupAdd.classList.remove("popup_opened");
}

function popupOpen() {
  popup.classList.add("popup_opened");
  nameFromInput.value = nameToProfile.textContent;
  jobFromInput.value = jobToProfile.textContent;
}

function popupExit() {
  popup.classList.remove("popup_opened");
}

function formSubmit(event) {
  event.preventDefault();

  nameToProfile.textContent = nameFromInput.value;
  jobToProfile.textContent = jobFromInput.value;

  popupExit();
}

function deleteElement(event) {
  const element = event.currentTarget.closest(".element");
  element.remove();
}

function setListenerToElement(element) {
  element
    .querySelector(".element__trash")
    .addEventListener("click", deleteElement);
}

function setListenerLike(e) {
  e.querySelector(".element__like").addEventListener("click", LikeAdd);
}

function setListererImage(e) {
  e.querySelector(".element__image").addEventListener("click", openImage);
}

function closeImage() {
  popupImage.classList.remove("popup_opened");
}

function openImage(e) {
  popupImage.classList.add("popup_opened");

  popupImage.querySelector(".popup__image").src = e.currentTarget.src;
  popupImage.querySelector(".popup__title_type_image").textContent =
    e.currentTarget.parentElement.querySelector(".element__name").textContent;
}

function LikeAdd(e) {
  if (e.target.classList.length > 1) {
    e.target.classList.remove("element__like_active");
  } else e.target.classList.add("element__like_active");
}

popupOpenBtn.addEventListener("click", popupOpen);
popupCloseBtn.addEventListener("click", popupExit);
formEdit.addEventListener("submit", formSubmit);

popupOpenBtnAdd.addEventListener("click", popupOpenAdd);
popupCloseBtnAdd.addEventListener("click", popupExitAdd);
formAdd.addEventListener("submit", AddContent);

popupImageClose.addEventListener("click", closeImage);

initialCards.map(renderContent);
