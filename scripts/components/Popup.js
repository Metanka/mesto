export default class Popup {
  constructor (popupSelector) {
    this._popupSelector = popupSelector;
    this._listeners = [];
  }

  _addListener(element, event, callback) {
    element.addEventListener(event, callback);
    this._listeners.push({element, event, callback});
  }
  _removeListeners() {
    this._listeners.forEach(({element, event, callback}) => {
      element.removeEventListener(event, callback);
    });
    this._listeners = [];
  }

  open() {
    this._setEventListeners();
    document.querySelector(`.${this._popupSelector}`).classList.remove('popup_hidden');
    }
  
  close() {
    document.querySelector(`.${this._popupSelector}`).classList.add('popup_hidden');
    this._removeListeners();
  }

  _handleEscClose(evt) {
    if (evt.key === 'Escape') {
      this.close();
    }
  }

  _setEventListeners() {
    this._addListener(document, 'keydown', (evt) => this._handleEscClose(evt));
    this._addListener(document.querySelector(`.${this._popupSelector}`), 'mousedown', (evt) => {
      const target = evt.target;
      if (target.classList.contains('popup')) {
        this.close();
      }
    });
   this._addListener(document.querySelector(`.${this._popupSelector}`).querySelector('.btn-close'), 'click', () => this.close());
  }
}