import Popup from "./Popup.js";

export default class PopupWithForm extends Popup {
  constructor(popupSelector, callbackSubmit) {
    super(popupSelector);
    this._callbackSubmit = callbackSubmit;
    this._popupForm = this._popup.querySelector('.popup__form');

    // для показа, что идет сохранение
    this._submitButton = this._popupForm.querySelector('.popup__button-submit');
    this._submitButtonText = this._submitButton.textContent;
  }

  // собираем все из инпутов
  _getInputValues() {
    this._inputList = this._popupForm.querySelectorAll('.popup__input');
    this._formInputValues = {};
    this._inputList.forEach((input) => {
      this._formInputValues[input.name] = input.value;
    });
    return this._formInputValues;
  }

  setEventListeners() {
    super.setEventListeners();

    this._popupForm.addEventListener('submit', (evt) => {
      evt.preventDefault();
      this._callbackSubmit(this._getInputValues());
    })
  }

  close() {
    super.close();
    this._popupForm.reset();
  }

  // показываем, что идет сохранение
  showSaving(status) {
    if(status) {
      this._submitButton.textContent = `Сохранение...`;
    }
    else {
      this._submitButton.textContent = this._submitButtonText;
    }
  }
}