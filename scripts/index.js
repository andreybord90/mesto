const popup = document.querySelector(".popup");
const popupOpenBtn = document.querySelector(".profile__button");
const popupCloseBtn = popup.querySelector(".popup__exit");

const nameToProfile = document.querySelector(".profile__name"); //Имя на странице
const jobToProfile = document.querySelector(".profile__job");

const nameFromInput = popup.querySelector(".popup__text_name"); //Имя в попап
const jobFromInput = popup.querySelector(".popup__text_job");

const form = document.querySelector(".popup__form");

function popupOpen() {
  popup.classList.add("popup__opened");
}

function popupExit() {
  popup.classList.remove("popup__opened");
}

function formSubmit(evt) {
  evt.preventDefault();

  nameToProfile.textContent = nameFromInput.value;
  jobToProfile.textContent = jobFromInput.value;

  popupExit();  
}

popupOpenBtn.addEventListener("click", popupOpen);
popupCloseBtn.addEventListener("click", popupExit);

form.addEventListener("submit", formSubmit);
