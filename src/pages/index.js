import { 
  initialCards, 
  validationConfig,
  editProfileEditButton,
  gridElements,
  editElementsEditButton
} from '../utils/constants.js';
import Card from '../components/Card.js';
import { FormValidator } from '../components/FormValidator.js';
import Section from '../components/Section.js';
import PopupWithImage from '../components/PopupWithImage.js';
import UserInfo from '../components/UserInfo.js';
import PopupWithForm from '../components/PopupWithForm.js';

import './index.css';

const userInfo = new UserInfo('.popup__input_info_name', '.popup__input_info_calling');

const popupWithFormUserEdit = new PopupWithForm('.popup_type_edit-profile', callbackSubmitUserEdit);
popupWithFormUserEdit.setEventListeners();

function callbackSubmitUserEdit() {
  userInfo.setUserInfo();
}

// Слушатель кнопки редактирования профиля
editProfileEditButton.addEventListener('click', () => {
  popupWithFormUserEdit.open();
  const userInfo = new UserInfo('.popup__input_info_name', '.popup__input_info_calling');
  userInfo.getUserInfo();
});

const popupWithFormAddCards = new PopupWithForm('.popup_type_add-card', callbackSubmitAddCards);
popupWithFormAddCards.setEventListeners();

function callbackSubmitAddCards(data) {
  const itemInfo = {
    name: data.nameCard,
    link: data.callingCard,
  };
  createCard(itemInfo);
}

// Слушатель кнопки добавления карточки
editElementsEditButton.addEventListener('click', () => {
  popupWithFormAddCards.open();
});

function handleCardClick() {
  const popupWithImage = new PopupWithImage('.popup_type_big-img', this._name, this._link);
  popupWithImage.open();
  popupWithImage.setEventListeners();
}

const renderCardElement = (card) => {
  gridElements.prepend(card);
};

function createCard(data) {
  const card = new Card(data, '#template-element', handleCardClick);
  const cardElement = card.generateCard();
  renderCardElement(cardElement);
}

const section = new Section(
  {
    items: initialCards,
    renderer: (item) => {
      const card = new Card(item, '#template-element', handleCardClick);
      const cardElement = card.generateCard();
      section.addItem(cardElement);
    },
  },
  '.elements'
);
section.renderItems();

// Валидация
const editProfilePopup = document.querySelector('.popup_type_edit-profile');
const editElementsPopup = document.querySelector('.popup_type_add-card');

const editProfileValidation = new FormValidator(validationConfig, editProfilePopup);
const editElementsValidation = new FormValidator(validationConfig, editElementsPopup);

editProfileValidation.enableValidation();
editElementsValidation.enableValidation();
