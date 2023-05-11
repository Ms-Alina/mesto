import { initialCards } from './constants.js';
import { Card } from './Card.js';
import { FormValidator } from './FormValidator.js';
import { validationConfig } from './constants.js';

// Функция зума картинки у карточки
const openBigImgCard = (data) => {
  openPopup(bigImgPopup);
  bigImgPopupPicture.setAttribute('src', data.link);
  bigImgPopupHeadingPicture.textContent = data.name;
  bigImgPopupPicture.setAttribute('alt', data.name);
};

// Функция добавления новой карточки
const showNewCard = (item) => {
  const card = new Card(item, '#template-element', openBigImgCard); // Создали экземпляр карточки
  
  const cardElement = card.generateCard(); // Создали карточку и вернули во вне
  
  // Нашли куда добавлять и добавили карточку перед первым дочерним элементом
  document.querySelector('.elements').prepend(cardElement);
};

// Добавление новых карточек из готовых данных
initialCards.forEach((item) => {
  showNewCard(item);
});

const editProfileEditButton = document.querySelector('.profile__button-edit');
const editProfilePopup = document.querySelector('.popup_type_edit-profile');
const editProfilePopupCloseButton = editProfilePopup.querySelector('.popup__close-icon');
const nameInput = editProfilePopup.querySelector('.popup__input_info_name');
const nameProfile = document.querySelector('.profile__name');
const callingInput = editProfilePopup.querySelector('.popup__input_info_calling');
const callingProfile = document.querySelector('.profile__calling');
const editProfilePopupForm = editProfilePopup.querySelector('.popup__form');

// Открытие попапа
export const openPopup = (popup) => {
  popup.classList.add('popup_opened');

  document.addEventListener('keydown', closePopupByEsc);
  document.addEventListener('mousedown', closePopupClickSpaceAround);
};

// Закрытие попапа
const closePopup = (popup) => {
  popup.classList.remove('popup_opened');

  document.removeEventListener('keydown', closePopupByEsc);
  document.removeEventListener('mousedown', closePopupClickSpaceAround);
};

// Слушатель кнопки редактирования профиля
editProfileEditButton.addEventListener('click', () => {
  openPopup(editProfilePopup);
  nameInput.value = nameProfile.textContent;
  callingInput.value = callingProfile.textContent;
});

// Слушатель кнопки закрытия попапа редактирования профиля по крестику
editProfilePopupCloseButton.addEventListener('click', () => {
  closePopup(editProfilePopup);
});

// Слушатель отправки формы, после редактирования профиля
editProfilePopupForm.addEventListener('submit', (event) => {
  event.preventDefault();
  nameProfile.textContent = nameInput.value;
  callingProfile.textContent = callingInput.value;
  closePopup(editProfilePopup);
});

//const templateElement = document.querySelector('#template-element');
//const gridElements = document.querySelector('.elements');
const editElementsPopup = document.querySelector('.popup_type_add-card');
const editElementsEditButton = document.querySelector('.profile__button-add');
const editElementsPopupForm = editElementsPopup.querySelector('.popup__form');
const headingCard = editElementsPopup.querySelector('.popup__input_info_heading-card');
const linkCard = editElementsPopup.querySelector('.popup__input_info_url-img');
const editElementsPopupCloseButton = editElementsPopup.querySelector('.popup__close-icon');
const bigImgPopup = document.querySelector('.popup_type_big-img');
const bigImgPopupCloseButton = bigImgPopup.querySelector('.popup__close-icon');
const bigImgPopupPicture = bigImgPopup.querySelector('.popup__img');
const bigImgPopupHeadingPicture = bigImgPopup.querySelector('.popup__heading-img');

// Слушатель закрытия большого попапа по крестику
bigImgPopupCloseButton.addEventListener('click', () => {
  closePopup(bigImgPopup);
});

// Слушатель кнопки добавления новой карточки
editElementsEditButton.addEventListener('click', () => {
  openPopup(editElementsPopup);
});

// Добавление новой карточки из введенный данных в попап
const addNewCard = (event) => {
  event.preventDefault();

  const name = headingCard.value;
  const link = linkCard.value;

  showNewCard({name, link});

  closePopup(editElementsPopup);

  editElementsPopupForm.reset();
};

// Слушатель формы по дабавлению новой карточки
editElementsPopupForm.addEventListener('submit', addNewCard);

// Слушатель для кнопки закрытия по крестику для формы добавления карточек
editElementsPopupCloseButton.addEventListener('click', () => {
  closePopup(editElementsPopup);
});

// Закрытие по Esc
const closePopupByEsc = (evt) => {
  if (evt.key === 'Escape') {
    const openedPopup = document.querySelector('.popup_opened');
    if (openedPopup) {
      closePopup(openedPopup);
    }
  }
};

// Закрытие по щелчку вне блока
const closePopupClickSpaceAround = (evt) => {
  if (evt.target.classList.contains('popup_opened')) {
    closePopup(evt.target);
  }
};

const editProfileValidation = new FormValidator(validationConfig, editProfilePopup);
const editElementsValidation = new FormValidator(validationConfig, editElementsPopup);

editProfileValidation.enableValidation();
editElementsValidation.enableValidation();