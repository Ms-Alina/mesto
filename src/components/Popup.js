export default class Popup {
  constructor(popupSelector) {
    this._popupSelector = popupSelector;
    this._popup = document.querySelector(this._popupSelector);
    this._closeButton = this._popup.querySelector('.popup__close-icon');
  }

  open() {
    this._popup.classList.add('popup_opened');

    document.addEventListener('keydown', this._handleEscClose.bind(this));

    document.addEventListener('mousedown', this._handleSpaceAroundClose.bind(this));
  }

  close() {
    this._popup.classList.remove('popup_opened');

    document.removeEventListener('keydown', this._handleEscClose.bind(this));
    document.removeEventListener('mousedown', this._handleSpaceAroundClose.bind(this));
  }

  _handleEscClose(evt) {
    if (evt.key === 'Escape') {
      this.close();
    }
  }

  _handleSpaceAroundClose(evt) {
    if (evt.target.classList.contains('popup_opened')) {
      this.close();
    }
  }

  setEventListeners() {
    this._closeButton.addEventListener('click', () => {
      this.close();
    });
  }
}