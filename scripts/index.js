const editProfileEditButton = document.querySelector('.profile__button-edit');
const editProfilePopup = document.querySelector('.popup_type_edit-profile');
const editProfilePopupCloseButton = editProfilePopup.querySelector('.popup__close-icon');
const nameInput = editProfilePopup.querySelector('.popup__input_info_name');
const nameProfile = document.querySelector('.profile__name');
const callingInput = editProfilePopup.querySelector('.popup__input_info_calling');
const callingProfile = document.querySelector('.profile__calling');
const editProfilePopupForm = editProfilePopup.querySelector('.popup__form');

const initialCards = [
  {
    name: 'Архыз',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
  },
  {
    name: 'Челябинская область',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
  },
  {
    name: 'Иваново',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
  },
  {
    name: 'Камчатка',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
  },
  {
    name: 'Холмогорский район',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
  },
  {
    name: 'Байкал',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
  }
]; 

const openPopupForm = (popup) => {
  popup.classList.add('popup_opened');
  popup.classList.add('popup_active_open');
};

const closePopupForm = (popup) => {
  popup.classList.remove('popup_opened');
  popup.classList.remove('popup_active_open');
};

editProfileEditButton.addEventListener('click', () => {
  openPopupForm(editProfilePopup);
  nameInput.value = nameProfile.textContent;
  callingInput.value = callingProfile.textContent;
});

editProfilePopupCloseButton.addEventListener('click', () => {
  closePopupForm(editProfilePopup);
});

editProfilePopupForm.addEventListener('submit', (event) => {
  event.preventDefault();
  nameProfile.textContent = nameInput.value;
  callingProfile.textContent = callingInput.value;
  closePopupForm(editProfilePopup);
});


const templateElement = document.querySelector('#template-element');
const gridElements = document.querySelector('.elements');
const editElementsPopup = document.querySelector('.popup_type_add-card');
const editElementsEditButton = document.querySelector('.profile__button-add');
const editElementsPopupForm = editElementsPopup.querySelector('.popup__form');
const headingCard = editElementsPopup.querySelector('.popup__input_info_heading-card');
const linkCard = editElementsPopup.querySelector('.popup__input_info_url-img');
const editElementsPopupCloseButton = editElementsPopup.querySelector('.popup__close-icon');

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

  const bigImgPopup = document.querySelector('.popup_type_big-img');
  const bigImgPopupPicture = bigImgPopup.querySelector('.popup__img');
  const bigImgPopupHeadingPicture = bigImgPopup.querySelector('.popup__heading-img');
  const bigImgPopupCloseButton = bigImgPopup.querySelector('.popup__close-icon');
 
  cardImg.addEventListener('click', () => {
    openPopupForm(bigImgPopup);
    bigImgPopupPicture.src = cardData.link;
    bigImgPopupHeadingPicture.textContent = cardData.name;
    bigImgPopupPicture.alt = cardData.name;
  });

  bigImgPopupCloseButton.addEventListener('click', () => {
    closePopupForm(bigImgPopup);
  });

  return cardElement;
};

const renderCardElement = (cardElement) => {
  gridElements.prepend(cardElement);
}

initialCards.forEach((card) => {
  renderCardElement(createCardElement(card));
});

editElementsEditButton.addEventListener('click', () => {
  openPopupForm(editElementsPopup);
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

  editElementsPopup.classList.remove('popup_opened');
  editElementsPopup.classList.remove('popup_active_open');
};

editElementsPopupForm.addEventListener('submit', addNewCard);

editElementsPopupCloseButton.addEventListener('click', () => {
  closePopupForm(editElementsPopup);
});