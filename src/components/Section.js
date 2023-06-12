export default class Section {
  constructor({items, renderer}, selector) {
    this._renderedCards = items;
    this._renderer = renderer;
    this._container = document.querySelector(selector);
  }

  renderItems(arr, id) {
    arr.forEach((item) => this._renderer(item, id));
  }

  addItem(cardElement) { // Нашли куда добавлять и добавили карточку перед первым дочерним элементом
    this._container.prepend(cardElement);
  }
}