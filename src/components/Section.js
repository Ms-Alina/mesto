export default class Section {
  constructor({items, renderer}, selector) {
    this._renderedCards = items;
    this._renderer = renderer;
    this._container = document.querySelector(selector);
  }

  renderItems() {
    this._renderedCards.forEach((item) => this._renderer(item));
  }

  addItem(cardElement) { // Нашли куда добавлять и добавили карточку перед первым дочерним элементом
    this._container.prepend(cardElement);
  }
}