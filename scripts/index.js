//попап редактирования профиля
const popup = document.querySelector(".popup-type-edit");
const popupOpenBtn = document.querySelector(".profile__button");
const popupCloseBtn = popup.querySelector(".popup__exit_type_edit");
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

function renderContent(el) {
  const newCard = createCard(el);
  contentElements.prepend(newCard);
}

function createCard(el) {
  const newContent = contentTamplateElement.cloneNode(true);
  newContent.querySelector(".element__name").textContent = el.name;
  newContent.querySelector(".element__image").src = el.link;
  setElementListener(newContent);
  return newContent;
}

function addCardsDefault(el) {
  const defaultCards = el.map(createCard);
  contentElements.append(...defaultCards);
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
  popupExitAdd();
}

function popupOpen(props) {
  if (props === "edit") {
    popup.classList.add("popup_opened");
    nameFromInput.value = nameToProfile.textContent;
    jobFromInput.value = jobToProfile.textContent;
  }
  if (props === "add") {
    popupAdd.classList.add("popup_opened");
  }
}

function popupExit(props) {
  props.classList.remove("popup_opened");
}


function openImage(e) {
  popupImage.querySelector(".popup__image").src = e.currentTarget.src;
  popupImage.querySelector(".popup__title_type_image").textContent =
    e.currentTarget.parentElement.querySelector(".element__name").textContent;
}

function showImg(e) {
  e.classList.add("popup_opened");
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

function setElementListener(element) {
  element
    .querySelector(".element__trash")
    .addEventListener("click", (e) => deleteElement(e));
  element
    .querySelector(".element__like")
    .addEventListener("click", (e) => LikeAdd(e));
  element.querySelector(".element__image").addEventListener("click", (e) => {
    openImage(e);
    showImg(popupImage);
  });
}

function LikeAdd(e) {
  e.target.classList.toggle("element__like_active");
}

popupOpenBtn.addEventListener("click", () => popupOpen("edit"));
popupCloseBtn.addEventListener("click", () => popupExit(popup));
formEdit.addEventListener("submit", formSubmit);

popupOpenBtnAdd.addEventListener("click", () => popupOpen("add"));
popupCloseBtnAdd.addEventListener("click", () => popupExit(popupAdd));
formAdd.addEventListener("submit", addContent);

popupImageClose.addEventListener("click", () => popupExit(popupImage));

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

addCardsDefault(initialCards);
