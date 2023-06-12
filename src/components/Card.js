export default class Card {
  constructor({data, 
    handleCardClick, 
    handleTrashClick, 
    handleLikeClick}, 
    templateSelector, 
    userId) {
    this._data = data;
    this._name = data.name;
    this._link = data.link;
    this._alt = data.name;
    this._templateSelector = templateSelector;
    this._handleCardClick = handleCardClick;
    
    this._element = this._getTemplate(); // сразу добавляем разметку
    this._imgElement = this._element.querySelector('.element__img'); // запомнили картинку карточки
    this._likeButton = this._element.querySelector('.element__like'); // запомнили кнопку лайка
    this._trashButton = this._element.querySelector('.element__button-trash'); // запомнили кнопку удаления

    this._handleTrashClick = handleTrashClick;
    this._handleLikeClick = handleLikeClick;
    this._userId = userId;
    this._idOwner = data.owner._id;
    this._cardId = data._id;
    this._likes = data.likes;
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
    
    // показываем кнопку удаления карточки только у добавленных пользователем
    if(this._userId !== this._idOwner) {
      this._trashButton.remove();
    }

    this.setLikes(this._likes);

    return this._element; // Вернули элемент во вне
  }

  _setEventListeners() {
    // Слушатель лайка
    this._likeButton.addEventListener('click', () => {
      this._handleLikeClick(this._cardId, this._checkLike(), this);
    });

    // Слушатель удаления карточки
    this._trashButton.addEventListener('click', () => {
      this._handleTrashClick(this._cardId, this);
    });

    // Слушатель увеличения картинки
    this._imgElement.addEventListener('click', () => {
      this._handleCardClick(this._name, this._link);
    });
  }

  // Функция удаления карточки
  handleDelete() {
    this._element.remove();
    this._element = null;
  }

  _checkLike() {
    return this._likes.some(like => {
      return like._id === this._userId;
    });
  }

  // Принимаем данные лайков карточки и обновляем
  setLikes(arr) {
    this._element.querySelector('.element__like-sum').textContent = arr.length;
    this._likes = arr;
    if (this._checkLike()) {
      this._likeButton.classList.add('element__like_active');
    } else {
      this._likeButton.classList.remove('element__like_active');
    }
  }
}

