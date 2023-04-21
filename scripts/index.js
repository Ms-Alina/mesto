import { initialCards } from './constants.js';

const editProfileEditButton = document.querySelector('.profile__button-edit');
const editProfilePopup = document.querySelector('.popup_type_edit-profile');
const editProfilePopupCloseButton = editProfilePopup.querySelector('.popup__close-icon');
const nameInput = editProfilePopup.querySelector('.popup__input_info_name');
const nameProfile = document.querySelector('.profile__name');
const callingInput = editProfilePopup.querySelector('.popup__input_info_calling');
const callingProfile = document.querySelector('.profile__calling');
const editProfilePopupForm = editProfilePopup.querySelector('.popup__form');

const openPopup = (popup) => {
  popup.classList.add('popup_opened');

  document.addEventListener('keydown', closePopupByEsc);
  document.addEventListener('mousedown', closePopupClickSpaceAround);
};

const closePopup = (popup) => {
  popup.classList.remove('popup_opened');

  document.removeEventListener('keydown', closePopupByEsc);
  document.removeEventListener('mousedown', closePopupClickSpaceAround);
};

editProfileEditButton.addEventListener('click', () => {
  openPopup(editProfilePopup);
  nameInput.value = nameProfile.textContent;
  callingInput.value = callingProfile.textContent;
});

editProfilePopupCloseButton.addEventListener('click', () => {
  closePopup(editProfilePopup);
});

editProfilePopupForm.addEventListener('submit', (event) => {
  event.preventDefault();
  nameProfile.textContent = nameInput.value;
  callingProfile.textContent = callingInput.value;
  closePopup(editProfilePopup);
});

const templateElement = document.querySelector('#template-element');
const gridElements = document.querySelector('.elements');
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

const createCardElement = (cardData) => {
  const cardElement = templateElement.content
  .querySelector('.element')
  .cloneNode(true);
  
  const cardHeading = cardElement.querySelector('.element__heading');
  const cardImg = cardElement.querySelector('.element__img');

  cardHeading.textContent = cardData.name;
  cardImg.src = cardData.link;
  cardImg.alt = cardData.name;

  const deleteButton = cardElement.querySelector('.element__button-trash');
  const likeButton = cardElement.querySelector('.element__like');
  const handleDelete = () => {
    cardElement.remove();
  }
    const handleLike = () => {
    likeButton.classList.toggle('element__like_active');
  }

  deleteButton.addEventListener('click', handleDelete);
  likeButton.addEventListener('click', handleLike);
 
  cardImg.addEventListener('click', () => {
    openPopup(bigImgPopup);
    bigImgPopupPicture.src = cardData.link;
    bigImgPopupHeadingPicture.textContent = cardData.name;
    bigImgPopupPicture.alt = cardData.name;
  });

  return cardElement;
};

bigImgPopupCloseButton.addEventListener('click', () => {
  closePopup(bigImgPopup);
});

const renderCardElement = (cardElement) => {
  gridElements.prepend(cardElement);
}

initialCards.forEach((card) => {
  renderCardElement(createCardElement(card));
});

editElementsEditButton.addEventListener('click', () => {
  openPopup(editElementsPopup);
});

const addNewCard = (event) => {
  event.preventDefault();

  const name = headingCard.value;
  const link = linkCard.value;

  const cardData = {
    name,
    link,
  };
  renderCardElement(createCardElement(cardData));

  closePopup(editElementsPopup);

  editElementsPopupForm.reset();
};

editElementsPopupForm.addEventListener('submit', addNewCard);

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