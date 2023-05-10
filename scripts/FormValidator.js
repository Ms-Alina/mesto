const validationConfig = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  errorPlaceSelector: '.popup__input-error-place',
  submitButtonSelector: '.popup__button-submit',
  inactiveButtonClass: 'popup__button-submit_type_noactive',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__input-error'
};

export class FormValidator {
  constructor(config, formElement) { // параметы: 1 - весь объект, 2 - нужная нам форма
    this._config = config; // весь объект
    this._formElement = formElement; // форма попап
  }

  // Добавление ошибки
  _showInputError(inputElement, errorMessage) {
    const errorElement = this._formElement.querySelector(`.${inputElement.id}-error`);
    inputElement.classList.add(this._config.inputErrorClass);
    errorElement.textContent = errorMessage;
    errorElement.classList.remove(this._config.errorPlaceSelector);
    errorElement.classList.add(this._config.errorClass);
  }

  // Удаление ошибки
  _hideInputError(inputElement) {
    const errorElement = this._formElement.querySelector(`.${inputElement.id}-error`);
    inputElement.classList.remove(this._config.inputErrorClass);
    errorElement.classList.remove(this._config.errorClass);
    errorElement.classList.add(this._config.errorPlaceSelector);
    errorElement.textContent = '';
  }

  // Проверка валидации
  _isValid(inputElement) {
    if (!inputElement.validity.valid) {
      this._showInputError(inputElement, inputElement.validationMessage);
    } else {
      this._hideInputError(inputElement);
    }
  }

  // Слушатель для всех инпутов в форме
  _setEventListeners() {
    const inputList = Array.from(this._formElement.querySelectorAll(this._config.inputSelector));
    const buttonElement = this._formElement.querySelector(this._config.submitButtonSelector);

    this._toggleButtonState(inputList, buttonElement);

    inputList.forEach((inputElement) => {
      inputElement.addEventListener('input', () => {
        this._isValid(inputElement);
        this._toggleButtonState(inputList, buttonElement);
      });
    });

    this._formElement.addEventListener('submit', () => {
      this._disalbleButton(this._formElement.querySelector(this._config.submitButtonSelector));
    });
  };

  // Кнопка не активна
  _disalbleButton(buttonElement) {
    buttonElement.setAttribute('disabled', '');
    buttonElement.classList.add(this._config.inactiveButtonClass);
  }

  // Кнопка активна
  _enableButton(buttonElement) {
    buttonElement.removeAttribute('disabled');
    buttonElement.classList.remove(this._config.inactiveButtonClass);
  }

  // Проверка невалидного поля
  _hasInvalidInput(inputList) {
    return inputList.some((inputElement) => {
      return !inputElement.validity.valid;
    })
  }

  // Измененяе состояния кнопки
  _toggleButtonState(inputList, buttonElement) {
    if (this._hasInvalidInput(inputList)) {
      this._disalbleButton(buttonElement);
    } else {
      this._enableButton(buttonElement);
    }
  }

  // Проверка валидации формы
  enableValidation() {
    this._setEventListeners();
  }
}

const editProfilePopup = document.querySelector('.popup_type_edit-profile');
const editProfileValidation = new FormValidator(validationConfig, editProfilePopup);

const editElementsPopup = document.querySelector('.popup_type_add-card');
const editElementsValidation = new FormValidator(validationConfig, editElementsPopup);

editProfileValidation.enableValidation();
editElementsValidation.enableValidation();