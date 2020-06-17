import EventListener from './EventListener';

export default class Popup extends EventListener {
  constructor(popupSelector) {
    super();
    this._popupSelector = popupSelector;
    this._popup = document.querySelector(`.${this._popupSelector}`);
    this._button = this._popup.querySelector('.btn-close');
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
    this._addListener(this._popup, 'mousedown', (evt) => {
      const target = evt.target;
      if (target.classList.contains('popup')) {
        this.close();
      }
    });
    this._addListener(this._button, 'click', () => this.close());
  }
}