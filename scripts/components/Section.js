export default class Section {
  constructor({ items, renderer }, containerSelector) {
    this._renderItems = items;
    this._container = document.querySelector(containerSelector);
    this._renderer = renderer;
  }

  addItem(element) {
    this._container.prepend(element);
  }

  renderItems() {
    this._renderItems.forEach(item => {
      this._renderer(item);
    });
  }
  
}