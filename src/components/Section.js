export default class Section {
  constructor({renderer}, selector) {
    this._renderer = renderer;
    this._container = document.querySelector(selector);
  }

  // Метод отрисовки всех элементов
  renderItems(arr, id) {
    arr.forEach((item) => this._renderer(item, id));
  }

  addItem(cardElement) { // Нашли куда добавлять и добавили карточку перед первым дочерним элементом
    this._container.prepend(cardElement);
  }
}