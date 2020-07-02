export default class Section {
  constructor({renderer}, containerSelector) {
    this._container = document.querySelector(containerSelector);
    this._renderer = renderer;
    this._items = [];
  }

  addItem(element) {
    this._container.prepend(element);
  }

  renderItems(items) {
    // this._items.forEach(item => {
    //   item.removeCard();
    // });
    // this._items = items.map(item => {
    //   return this._renderer(item);
    // }
    // );
    items.forEach(item => {
      this._renderer(item);
    }
    );
  }
}
