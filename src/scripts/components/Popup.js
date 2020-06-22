export default class Popup {
  constructor(popupSelector) {
    this._popupSelector = popupSelector;
    this._popup = document.querySelector(`.${this._popupSelector}`);
    this._button = this._popup.querySelector('.btn-close');
    this._handleEscClose = this._handleEscClose.bind(this);
    this.close = this.close.bind(this);
    this._targetOverlayClose = this._targetOverlayClose.bind(this);
  }

  open() {
    this._setEventListeners();
    document.querySelector(`.${this._popupSelector}`).classList.remove('popup_hidden');
  }

  close() {
    document.querySelector(`.${this._popupSelector}`).classList.add('popup_hidden');
    document.removeEventListener('keydown', this._handleEscClose);
    this._popup.removeEventListener('mousedown', this._targetOverlayClose);
    this._button.removeEventListener('click', this.close);
  }

  _handleEscClose(evt) {
    if (evt.key === 'Escape') {
      this.close();
    }
  }

  _targetOverlayClose(evt) {
    const target = evt.target;
    if (target.classList.contains('popup')) {
      this.close();
    }
  }

  _setEventListeners() {
    document.addEventListener('keydown', this._handleEscClose);
    this._popup.addEventListener('mousedown', this._targetOverlayClose);
    this._button.addEventListener('click', this.close);
  }
}