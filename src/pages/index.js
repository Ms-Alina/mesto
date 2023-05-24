import { 
  initialCards, 
  validationConfig,
  editProfileEditButton,
  editElementsEditButton,
  editProfilePopup,
  editElementsPopup
} from '../utils/constants.js';
import Card from '../components/Card.js';
import { FormValidator } from '../components/FormValidator.js';
import Section from '../components/Section.js';
import PopupWithImage from '../components/PopupWithImage.js';
import UserInfo from '../components/UserInfo.js';
import PopupWithForm from '../components/PopupWithForm.js';

import './index.css';

const userInfo = new UserInfo({userNameSelector: '.profile__name', userCaptionSelector:'.profile__calling'}/*'.popup__input_info_name', '.popup__input_info_calling'*/);

const popupWithFormUserEdit = new PopupWithForm('.popup_type_edit-profile', callbackSubmitUserEdit);
popupWithFormUserEdit.setEventListeners();

function callbackSubmitUserEdit(data) {
  const user = {
    name : data.nameProfile,
    calling : data.callingProfile,
  };
  userInfo.setUserInfo(user);
}

// Слушатель кнопки редактирования профиля
editProfileEditButton.addEventListener('click', () => {
  popupWithFormUserEdit.open();

  userInfo.getUserInfo();
  document.querySelector('.popup__input_info_name').value = userInfo.getUserInfo().name;
  document.querySelector('.popup__input_info_calling').value = userInfo.getUserInfo().calling;
});

const popupWithFormAddCards = new PopupWithForm('.popup_type_add-card', callbackSubmitAddCards);
popupWithFormAddCards.setEventListeners();

function callbackSubmitAddCards(data) {
  const itemInfo = {
    name: data.nameCard,
    link: data.callingCard,
  };
  renderCardElement(itemInfo);
}

// Слушатель кнопки добавления карточки
editElementsEditButton.addEventListener('click', () => {
  popupWithFormAddCards.open();
});

const popupWithImage = new PopupWithImage('.popup_type_big-img');
popupWithImage.setEventListeners();

function handleCardClick() {
  popupWithImage.open(this._name, this._link);
}

const renderCardElement = (card) => {
  const cardElement = createCard(card);
  section.addItem(cardElement);
};

function createCard(data) {
  const card = new Card(data, '#template-element', handleCardClick);
  const cardElement = card.generateCard();
  return cardElement;
}

const section = new Section(
  {
    items: initialCards,
    renderer: (item) => {
      renderCardElement(item);
    },
  },
  '.elements'
);
section.renderItems();

// Валидация
const editProfileValidation = new FormValidator(validationConfig, editProfilePopup);
const editElementsValidation = new FormValidator(validationConfig, editElementsPopup);

editProfileValidation.enableValidation();
editElementsValidation.enableValidation();
