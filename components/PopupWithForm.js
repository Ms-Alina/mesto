import Popup from "./Popup.js";

export default class PopupWithForm extends Popup {
  constructor(popupSelector, callbackSubmit) {
    super(popupSelector);
    this._callbackSubmit = callbackSubmit;
    this._popupForm = this._popup.querySelector('.popup__form');
  }

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
      this.close();
    })
  }

  close() {
    super.close();
    this._popupForm.reset();
  }
}