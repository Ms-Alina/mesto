import Popup from "./Popup.js";

export default class PopupWithImage extends Popup {
  constructor(popupSelector, name, link) {
    super(popupSelector);
    this._popupBigImgCard = this._popup.querySelector('.popup__img');
    this._popupBigImgCardText = this._popup.querySelector('.popup__heading-img');
    this._name = name;
    this._link = link;
  }

  open() {
    this._popupBigImgCard.setAttribute('src', this._link);
    this._popupBigImgCardText.textContent = this._name;
    this._popupBigImgCard.setAttribute('alt', this._name);

    super.open();
  }
}