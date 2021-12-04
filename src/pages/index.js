import "./index.css";
import FormValidator from "../components/FormValidator.js";
import Card from "../components/Card.js";
// import { initialCards, config, cardListSelector } from "../utils/constants.js";
import { config, cardListSelector } from "../utils/constants.js";
import Section from "../components/Section.js";
import PopupWithImage from "../components/PopupWithImage.js";
import PopupWithForm from "../components/PopupWithForm.js";
import PopupWithSubmit from "../components/PopupWithSubmit.js";
import UserInfo from "../components/UserInfo.js";
import Api from "../components/Api.js";

//попап редактирования профиля
const popupEdit = document.querySelector(".popup-type-edit");
const popupOpenBtnEdit = document.querySelector(".profile__button");
const formEdit = document.querySelector(".popup__form");

const formAvatar = document.querySelector(".popup__form_type_avatar");

//попап контент
const popupAdd = document.querySelector(".popup_type_add");
const popupOpenBtnAdd = document.querySelector(".profile__add-button");
const formAdd = document.querySelector(".popup__form_type_add");

const popupAvatar = document.querySelector(".popup_type_avatar");
const popupOpenBtnAvatar = document.querySelector(".profile__edit-avatar");

const popupDelete = document.querySelector(".popup_type_submit");
const popupDeleteBtn = document.querySelector(".element__delete");

const popupImage = document.querySelector(".popup_type_image");

const contentElements = document.querySelector(".elements");

const nameEditProfile = document.querySelector(".profile__name");
const jobEditProfile = document.querySelector(".profile__job");
const avatarEditProfile = document.querySelector(".profile__avatar");

const nameInput = popupEdit.querySelector("[name=name]");
const jobInput = popupEdit.querySelector("[name=about]");

const cardName = document.querySelector(".popup__text_type_sign");
const cardLink = document.querySelector(".popup__text_type_url");
const newPlaceName = {
  name: cardName.value,
  link: cardLink.value,
};

const cardFormValidation = new FormValidator(config, formAdd);
const editFormValidation = new FormValidator(config, formEdit);
const avatarFormValidation = new FormValidator(config, formAvatar);

const userInfo = new UserInfo(
  nameEditProfile,
  jobEditProfile,
  avatarEditProfile
);
let initialCards;

const openPopupEdit = new PopupWithForm({
  popup: popupEdit,
  handleFormSubmit: (data) => {
    handleFormSubmit(data);
  },
});
openPopupEdit.setEventListeners();

const handleFormSubmit = (data) => {
  api.changeUserInfo(data);
  api
    .getUserInfo()
    .then((dataUser) => {
      userInfo.setUserInfo(dataUser);
    })
    .catch((err) => {
      console.log(err);
    });

  openPopupEdit.close();
};

const openOnClickEdit = (event) => {
  event.preventDefault();
  editFormValidation.resetValidation();
  openPopupEdit.open();
};

//открытие попапа
popupOpenBtnEdit.addEventListener("click", (e) => {
  const getUserInfo = userInfo.getUserInfo();

  nameInput.value = getUserInfo.name;
  jobInput.value = getUserInfo.about;
  openOnClickEdit(e);
});

// function submitAvatarForm(data) {}

const createCard = (data) => {
  const card = new Card(
    {
      data: { ...data, currentUserId: userId },
      handleCardClick: () => {
        openPopup.open(data);
      },
      handleLikeClick: (card) => {
        if (card.isLiked()) {
          api
            .removeCardLike(card.id)
            .then((dataCard) => card.setLikes(dataCard.likes))
            .catch((err) => {
              console.log(err);
            });
        } else {
          api
            .setCardLike(card.id)
            .then((dataCard) => card.setLikes(dataCard.likes))
            .catch((err) => {
              console.log(err);
            });
        }
      },
      handleCardDelete,
    },
    ".element__template"
  ).generateCard();
  return card;
};

const openPopupAdd = new PopupWithForm({
  //попап добавления карточки
  popup: popupAdd,
  handleFormSubmit: (event) => {
    openPopupAdd.loading(true);
    event.owner = userId;
    event.likes = [];
    api
      .insertCard(event)
      .then((res) => {
        const addCard = createCard(res);
        defaultSection.prependItem(addCard);
        // defaultSection.renderItems(addCard);
        openPopupAdd.close();
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(openPopupAdd.loading(false));
    // api
    //   .getCards()
    //   .then((dataCards) => defaultSection.renderItems(dataCards))
    //   .catch((err) => {
    //     console.log(err);
    //   });
    // addContent(event);
  },
});
openPopupAdd.setEventListeners();

const openPopupAvatar = new PopupWithForm({
  popup: popupAvatar,
  handleFormSubmit: (data) => {
    openPopupAvatar.loading(true);
    api
      .updateUserAvatar(data)
      .then((data) => {
        userInfo.setAvatar(data);
        openPopupAvatar.close();
      })
      .catch((err) => console.log(err))
      .finally(() => openPopupAvatar.loading(false));
  },
});

openPopupAvatar.setEventListeners();

function handleCardDelete(data) {
  cardDelete.open(data);
  cardDelete.setActionSubmit(() => {
    api
      .deleteCard(data.id)
      .then(() => {
        cardDelete.close();
        data.deleteElement();
      })
      .catch((err) => {
        console.log(err);
      });
  });
}

let userId = null;
const api = new Api({
  url: "https://mesto.nomoreparties.co/v1/cohort-30",
  headers: {
    authorization: "328ef2cf-f132-4d2f-959f-88c97b356965",
    "Content-Type": "application/json",
  },
});
Promise.all([api.getCards(), api.getUserInfo()])
  .then(([dataCards, dataUser]) => {
    userId = dataUser._id;
    defaultSection.renderItems(dataCards);
    userInfo.setUserInfo(dataUser);
    userInfo.setAvatar(dataUser);
  })
  .catch((err) => {
    console.log(err);
  });

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

const cardDelete = new PopupWithSubmit(popupDelete);
cardDelete.setEventListeners();

const openPopup = new PopupWithImage(popupImage); //попап изображения
openPopup.setEventListeners();

const addContent = (data) => {
  const newCard = createCard(data);
  defaultSection.prependItem(newCard);

  openPopupAdd.close();
  // event.currentTarget.reset();
};

const openOnClickEditAvatar = () => {
  openPopupAvatar.open();
  avatarFormValidation.resetValidation;
};

popupOpenBtnAvatar.addEventListener("click", openOnClickEditAvatar);

const openOnClickAdd = () => {
  openPopupAdd.open();

  cardFormValidation.resetValidation();
};

popupOpenBtnAdd.addEventListener("click", openOnClickAdd);

const enableValidation = (config) => {
  cardFormValidation.enableValidation();
  editFormValidation.enableValidation();
  avatarFormValidation.enableValidation;
};

enableValidation(config);
