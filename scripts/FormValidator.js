export class FormValidator {
  constructor(config, formElement) { // параметы: 1 - весь объект, 2 - нужная нам форма
    this._config = config; // весь объект
    this._formElement = formElement; // форма попап

    this._buttonElement = formElement.querySelector(this._config.submitButtonSelector); // кнопка сохранения
    this._inputList = Array.from(formElement.querySelectorAll(this._config.inputSelector)); // все интупы формы
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
    this._toggleButtonState();

    this._inputList.forEach((inputElement) => {
      inputElement.addEventListener('input', () => {
        this._isValid(inputElement);
        this._toggleButtonState();
      });
    });

    this._formElement.addEventListener('submit', () => {
      this._disalbleButton();
    });
  };

  // Кнопка не активна
  _disalbleButton() {
    this._buttonElement.setAttribute('disabled', '');
    this._buttonElement.classList.add(this._config.inactiveButtonClass);
  }

  // Кнопка активна
  _enableButton() {
    this._buttonElement.removeAttribute('disabled');
    this._buttonElement.classList.remove(this._config.inactiveButtonClass);
  }

  // Проверка невалидного поля
  _hasInvalidInput() {
    return this._inputList.some((inputElement) => {
      return !inputElement.validity.valid;
    })
  }

  // Измененяе состояния кнопки
  _toggleButtonState() {
    if (this._hasInvalidInput()) {
      this._disalbleButton();
    } else {
      this._enableButton();
    }
  }

  // Проверка валидации формы
  enableValidation() {
    this._setEventListeners();
  }
}