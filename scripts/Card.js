export class Card {
  constructor(data, templateSelector, callBigImg) {
    this.data = data;
    this._name = data.name;
    this._link = data.link;
    this._alt = data.name;
    this._templateSelector = templateSelector;
    this._callBigImg = callBigImg;
  }

  _getTemplate() { // Получаем разметку для карточки
    const cardElement = document
    .querySelector(this._templateSelector)
    .content
    .querySelector('.element')
    .cloneNode(true);

    return cardElement; // Внернули dom-элемент карточки
  }

  generateCard() {
    this._element = this._getTemplate(); // У _element есть разметка
    this._setEventListeners(); // Подключили все слушатели

    // Добавили данные
    this._element.querySelector('.element__heading').textContent = this._name;
    this._element.querySelector('.element__img').src = this._link;
    this._element.querySelector('.element__img').alt = this._alt;

    return this._element; // Вернули элемент во вне
  }

  _setEventListeners() {
    // Слушатель лайка
    this._element.querySelector('.element__like').addEventListener('click', () => {
      this._handleLike();
    });

    // Слушатель удаления карточки
    this._element.querySelector('.element__button-trash').addEventListener('click', () => {
      this._handleDelete();
    });

    // Слушатель увеличения картинки
    this._element.querySelector('.element__img').addEventListener('click', () => {
      this._callBigImg(this.data);
    });
  }

  // Функция удаления карточки
  _handleDelete() {
    this._element.remove();
  }

  // Функция добавления лайка
  _handleLike() {
    this._element.querySelector('.element__like').classList.toggle('element__like_active');
  }
}

