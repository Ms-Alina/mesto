export const initialCards = [
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

export const validationConfig = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  errorPlaceSelector: '.popup__input-error-place',
  submitButtonSelector: '.popup__button-submit',
  inactiveButtonClass: 'popup__button-submit_type_noactive',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__input-error'
};

export const editProfileEditButton = document.querySelector('.profile__button-edit');
export const editElementsEditButton = document.querySelector('.profile__button-add');

export const inputNamePopupProfile = document.querySelector('.popup__input_info_name');
export const inputCallingPopupProfile = document.querySelector('.popup__input_info_calling');

export const editProfilePopup = document.querySelector('.popup_type_edit-profile');
export const editElementsPopup = document.querySelector('.popup_type_add-card');