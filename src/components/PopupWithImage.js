import Popup from "./Popup.js";

export default class PopupWithImage extends Popup {
  constructor(popupSelector) {
    super(popupSelector);
    this._popupBigImgCard = this._popup.querySelector('.popup__img');
    this._popupBigImgCardText = this._popup.querySelector('.popup__heading-img');
  }

  open(name, link) {
    this._popupBigImgCard.setAttribute('src', link);
    this._popupBigImgCardText.textContent = name;
    this._popupBigImgCard.setAttribute('alt', name);

    super.open();
  }
}