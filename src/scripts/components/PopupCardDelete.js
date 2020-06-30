import Popup from './Popup';

export default class PopupCardDelete extends Popup {
  constructor(popupSelector, callbackFunc) {
    super(popupSelector);
    this._callbackFunc = callbackFunc;
    this._form = document.querySelector(`.${this._popupSelector}`).querySelector('.popup__container');
    this._submitClose = this._submitClose.bind(this);
  }

  open(submitCallback) {
    super.open();
    this._submitCallback = submitCallback;
  }

  close() {
    super.close();
  }

  _submitClose(evt) {
    evt.preventDefault();
    this._submitCallback();
    this._callbackFunc();
    this.close();
  }

  _setEventListeners () {
  super._setEventListeners();
  this._form.addEventListener('submit', this._submitClose);
}
}