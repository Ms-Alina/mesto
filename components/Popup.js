export default class Popup {
  constructor(popupSelector) {
    this._popupSelector = popupSelector;
    this._popup = document.querySelector(this._popupSelector);
    this._closeButton = this._popup.querySelector('.popup__close-icon');
  }

  open() {
    this._popup.classList.add('popup_opened');
  }

  close() {
    this._popup.classList.remove('popup_opened');

    document.removeEventListener('keydown', (evt) => {
      this._handleEscClose(evt);
    });
    document.removeEventListener('mousedown', (evt) => {
      this._handleSpaceAroundClose(evt);
    });
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

    document.addEventListener('keydown', (evt) => {
      this._handleEscClose(evt);
    });

    document.addEventListener('mousedown', (evt) => {
      if (evt.target.classList.contains('popup_opened')) {
        this._handleSpaceAroundClose(evt);
      }
    });
  }
}