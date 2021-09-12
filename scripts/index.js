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

let memoryName = nameToProfile.textContent;
let memoryjob = jobToProfile.textContent;

function SendinfoFromInput() {
  popup.classList.remove("popup__opened");
  nameFromInput.placeholder = nameToProfile.textContent;
  jobFromInput.placeholder = jobToProfile.textContent;
  nameFromInput.value = "";
  jobFromInput.value = "";
  memoryName = nameToProfile.textContent;
  memoryjob = jobToProfile.textContent;
}

function popupOpen() {
  popup.classList.add("popup__opened");
}

function popupExit() {
  nameFromInput.placeholder = nameToProfile.textContent = memoryName;
  jobFromInput.placeholder = jobToProfile.textContent = memoryjob;

  nameFromInput.value = "";
  jobFromInput.value = "";

  popup.classList.remove("popup__opened");
}

function updateValueName(e) {
  nameToProfile.textContent = e.target.value;
}

function updateValueJob(e) {
  jobToProfile.textContent = e.target.value;
}

popupOpenBtn.addEventListener("click", popupOpen);
popupCloseBtn.addEventListener("click", popupExit);

nameFromInput.addEventListener("change", updateValueName);
jobFromInput.addEventListener("change", updateValueJob);

saveBnt.addEventListener("click", SendinfoFromInput);
