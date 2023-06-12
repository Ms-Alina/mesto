import { 
  initialCards, 
  validationConfig,
  editProfileEditButton,
  editElementsEditButton,
  inputNamePopupProfile,
  inputCallingPopupProfile,
  editProfilePopup,
  editElementsPopup,
  editAvatarProfile,
  editAvatarEditButton,
  popupProfileInputs
} from '../utils/constants.js';
import Card from '../components/Card.js';
import { FormValidator } from '../components/FormValidator.js';
import Section from '../components/Section.js';
import PopupWithImage from '../components/PopupWithImage.js';
import UserInfo from '../components/UserInfo.js';
import PopupWithForm from '../components/PopupWithForm.js';

import './index.css';

import Api from '../components/Api.js';
import PopupWithProve from '../components/PopupWithProve.js';
import { data } from 'autoprefixer';

// Создаем экземпляр класса UserInfo
const userInfo = new UserInfo({
  userNameSelector: '.profile__name', 
  userCaptionSelector: '.profile__calling',
  userAvatarSelector: '.profile__ava'
});

// Создаем экземпляр класса PopupWithForm для редактирования профиля и добавляем слушатель событий
const popupWithFormUserEdit = new PopupWithForm('.popup_type_edit-profile', callbackSubmitUserEdit);
popupWithFormUserEdit.setEventListeners();

// Функция редактирования профиля (колбек)
function callbackSubmitUserEdit(inputsData) {
  popupWithFormUserEdit.showSaving(true);
  
  api.saveUserChanges(inputsData)
    .then((data) => {
      userInfo.setUserInfo(data);
      popupWithFormUserEdit.close();
    })
    .catch((err) => {
      console.log(err);
    })
    .finally(() => {
      popupWithFormUserEdit.showSaving(false);
    })
}

// Слушатель кнопки редактирования профиля (оставила как есть)
editProfileEditButton.addEventListener('click', () => {
  popupWithFormUserEdit.open();
  handleTextInput();
});

// Создаем экземпляр класса PopupWithForm для добавления карточки и добавляем слушатель событий
const popupWithFormAddCards = new PopupWithForm('.popup_type_add-card', callbackSubmitAddCards);
popupWithFormAddCards.setEventListeners();

// Функция добавления новых карточек от пользователя (колбек)
function callbackSubmitAddCards(inputsData) {
  popupWithFormAddCards.showSaving(true);

  api.postNewCard(inputsData)
    .then((data) => {
      section.addItem(createCard(data, data.owner._id));
      popupWithFormAddCards.close();
    })
    .catch((err) => {
      console.log(err);
    })
    .finally(() => {
      popupWithFormAddCards.showSaving(false);
    })
}

// Слушатель кнопки добавления карточки
editElementsEditButton.addEventListener('click', () => {
  popupWithFormAddCards.open();
});

// Создаем экземпляр класса PopupWithImage и добавляем слушатель событий
const popupWithImage = new PopupWithImage('.popup_type_big-img');
popupWithImage.setEventListeners();

// Функция открытия большой картинки, при клике на картинку карточки
function handleCardClick() {
  popupWithImage.open(this._name, this._link);
}

// Функция открытия попапа-подтверждения
function handleTrashClick(id, card) {
  popupWithProve.setSubmitAction(() => handlePopupProve(id, card))
  popupWithProve.open();
}

// Функция удаления карточки, добавленной пользователем
function handlePopupProve(id, card) {
  api.deleteCard(id)
    .then(() => {
      card.handleDelete();
      popupWithProve.close();
    })
    .catch((err) => {
      console.log(err);
    });
}

// Функция постановки лайка
function handleLikeClick(id, isLiked, card) {
  if(isLiked) {
    api.dislikedCard(id)
      .then((data) => {
        card.setLikes(data.likes);
      })
      .catch((err) => {
        console.log(err);
      });
  } else {
    api.likedCard(id)
      .then((data) => {
        card.setLikes(data.likes);
      })
      .catch((err) => {
        console.log(err);
      });
  }
}

// Функция заполнения полей данными из профиля
function handleTextInput() {
  const userData = userInfo.getUserInfo();
  popupProfileInputs.forEach(input => {
    input.value = userData[input.name];
  });
}

// Функция создания карточек
function createCard(dataCard, id) {
  const card = new Card({
    data: dataCard,
    handleCardClick,
    handleTrashClick,
    handleLikeClick,
  },
  '#template-element',
  id);

  const cardElement = card.generateCard();
  return cardElement;
}

// Создаем экземпляр класса Section +
const section = new Section(
  {
    renderer: (cardItem, id) => {
      section.addItem(createCard(cardItem, id));
    },
  },
  '.elements'
);

// Создаем экземпляр класса PopupWithProve и добавляем слушатель событий
const popupWithProve = new PopupWithProve('.popup_type_prove');
popupWithProve.setEventListeners();

// Создаем экземпляр класса PopupWithForm для редактирования аватара и добавляем слушатель событий
const popupWithFormChangeAvatar = new PopupWithForm('.popup_type_change-avatar', callbackSubmitChangeAvatar);
popupWithFormChangeAvatar.setEventListeners();

// Функция редактирования аватара пользователя (колбек)
function callbackSubmitChangeAvatar(inputsData) {
popupWithFormChangeAvatar.showSaving(true);

  api.changedAvatar(inputsData)
    .then((data) => {
      userInfo.setUserInfo(data);
      popupWithFormChangeAvatar.close();
    })
    .catch((err) => {
      console.log(err);
    })
    .finally(() => {
      popupWithFormChangeAvatar.showSaving(false);
    })
}

// Слушатель кнопки редактирования аватара
editAvatarEditButton.addEventListener('click', () => {
  popupWithFormChangeAvatar.open();
})

// Валидация
const editProfileValidation = new FormValidator(validationConfig, editProfilePopup);
const editElementsValidation = new FormValidator(validationConfig, editElementsPopup);
const editAvatarProfileValidation = new FormValidator(validationConfig, editAvatarProfile);

editProfileValidation.enableValidation();
editElementsValidation.enableValidation();
editAvatarProfileValidation.enableValidation();

// Создаем экземпляр класса Api
const api = new Api({
  baseUrl: 'https://mesto.nomoreparties.co/v1/cohort-68',
  headers: {
    authorization: '04191f74-b685-4000-9654-e8e43ee7e193',
    'Content-Type': 'application/json'
  }
});

// Передаем массив промисов, которые нужно выполнить
Promise.all([
  api.getUserData(),
  api.getInitialCards()
])
.then((values) => {
  userInfo.setUserInfo(values[0])
  section.renderItems(values[1], values[0]._id);
})
.catch((err) => {
  console.log(err);
});