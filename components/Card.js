export default class Card {
  constructor(data, templateSelector, handleCardClick) {
    this._data = data;
    this._name = data.name;
    this._link = data.link;
    this._alt = data.name;
    this._templateSelector = templateSelector;
    this._handleCardClick = handleCardClick;
    
    this._element = this._getTemplate(); // сразу добавляем разметку
    this._imgElement = this._element.querySelector('.element__img'); // запомнили картинку карточки
    this._likeButton = this._element.querySelector('.element__like'); // запомнили кнопку лайка
  }

  _getTemplate() { // Получаем разметку для карточки
    const cardElement = document
    .querySelector(this._templateSelector)
    .content
    .querySelector('.element')
    .cloneNode(true);

    return cardElement; // Вернули dom-элемент карточки
  }

  generateCard() {
    this._setEventListeners(); // Подключили все слушатели

    // Добавили данные
    this._element.querySelector('.element__heading').textContent = this._name;
    this._imgElement.src = this._link;
    this._imgElement.alt = this._alt;

    return this._element; // Вернули элемент во вне
  }

  _setEventListeners() {
    // Слушатель лайка
    this._likeButton.addEventListener('click', () => {
      this._handleLike();
    });

    // Слушатель удаления карточки
    this._element.querySelector('.element__button-trash').addEventListener('click', () => {
      this._handleDelete();
    });

    // Слушатель увеличения картинки
    this._imgElement.addEventListener('click', () => {
      this._handleCardClick(/*this._data*/);
    });
  }

  // Функция удаления карточки
  _handleDelete() {
    this._element.remove();
    this._element = null;
  }

  // Функция добавления лайка
  _handleLike() {
    this._likeButton.classList.toggle('element__like_active');
  }
}

