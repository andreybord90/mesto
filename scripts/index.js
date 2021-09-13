const popup = document.querySelector(".popup");
const popupOpenBtn = document.querySelector(".profile__button");
const popupCloseBtn = popup.querySelector(".popup__exit");

const nameToProfile = document.querySelector(".profile__name"); //Имя на странице
const jobToProfile = document.querySelector(".profile__job");

const nameFromInput = popup.querySelector(".popup__name"); //Имя в попап
const jobFromInput = popup.querySelector(".popup__job");

const saveBnt = popup.querySelector(".popup__button"); //кнопка "Сохранить"

nameFromInput.placeholder = nameToProfile.textContent;
jobFromInput.placeholder = jobToProfile.textContent;

// let memoryName = nameToProfile.textContent;
// let memoryjob = jobToProfile.textContent;

// function SendinfoFromInput() {
//   popup.classList.remove("popup__opened");
//   nameFromInput.placeholder = nameToProfile.textContent;
//   jobFromInput.placeholder = jobToProfile.textContent;
//   nameFromInput.value = "";
//   jobFromInput.value = "";
//   memoryName = nameToProfile.textContent;
//   memoryjob = jobToProfile.textContent;

// }

function popupOpen() {
  popup.classList.add("popup__opened");
}

function popupExit() {
  popup.classList.remove("popup__opened");
}

function SendinfoFromInput() {
  if (nameFromInput.value && jobFromInput.value) {
    nameToProfile.textContent = nameFromInput.value;
    nameFromInput.value = "";
    nameFromInput.placeholder = nameToProfile.textContent;
    jobToProfile.textContent = jobFromInput.value;
    jobFromInput.value = "";
    jobFromInput.placeholder = jobToProfile.textContent;

    popup.classList.remove("popup__opened");
  } else if (nameFromInput.value) {
    nameToProfile.textContent = nameFromInput.value;
    nameFromInput.value = "";
    nameFromInput.placeholder = nameToProfile.textContent;

    popup.classList.remove("popup__opened");
  } else if (jobFromInput.value) {
    jobToProfile.textContent = jobFromInput.value;
    jobFromInput.value = "";
    jobFromInput.placeholder = jobToProfile.textContent;

    popup.classList.remove("popup__opened");
  } else popup.classList.remove("popup__opened");
  
}

popupOpenBtn.addEventListener("click", popupOpen);
popupCloseBtn.addEventListener("click", popupExit);

saveBnt.addEventListener("click", SendinfoFromInput);
