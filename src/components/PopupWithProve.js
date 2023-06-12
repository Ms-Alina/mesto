import Popup from "./Popup";

export default class PopupWithProve extends Popup {
  constructor(popupSelector) {
    super(popupSelector);
    this._buttonProve = this._popup.querySelector('.popup__form');
  }

  setSubmitAction(submitAction) {
    this._handleSubmitCallback = submitAction;
  }

  setEventListeners() {
    super.setEventListeners();
    this._buttonProve.addEventListener('submit', (evt) => {
      evt.preventDefault();
      this._handleSubmitCallback();
    });
  }
}