const editProfileEditButton = document.querySelector('.profile__button-edit');
const editProfilePopup = document.querySelector('.popup_type_edit-profile');
const editProfilePopupCloseButton = editProfilePopup.querySelector('.popup__close-icon');
const nameInput = editProfilePopup.querySelector('.popup__input_info_name');
const nameProfile = document.querySelector('.profile__name');
const callingInput = editProfilePopup.querySelector('.popup__input_info_calling');
const callingProfile = document.querySelector('.profile__calling');
const editProfilePopupForm = editProfilePopup.querySelector('.popup__form');

function closePopupForm() {
  editProfilePopup.classList.remove('popup_opened');
}

editProfileEditButton.addEventListener('click', function() {
  editProfilePopup.classList.add('popup_opened');
  nameInput.value = nameProfile.textContent;
  callingInput.value = callingProfile.textContent;
});

editProfilePopupCloseButton.addEventListener('click', function() {
  closePopupForm();
});

editProfilePopupForm.addEventListener('submit', function(event) {
  event.preventDefault();
  nameProfile.textContent = nameInput.value;
  callingProfile.textContent = callingInput.value;
  closePopupForm();
});