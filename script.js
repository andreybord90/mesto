let popup = document.querySelector(".popup");
let popupOpenBtn = document.querySelector(".profile__button");
let popupCloseBtn = popup.querySelector(".popup__exit");
let nameToPopup = document.querySelector(".profile__name");

console.log (nameToPopup);

function popupOpen() {
  popup.classList.add("popup__opened");
}

function popupExit() {
  popup.classList.remove("popup__opened");
}

popupOpenBtn.addEventListener("click", popupOpen);



popupCloseBtn.addEventListener("click", popupExit);



