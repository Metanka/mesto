import Popup from './Popup.js';

export default class PopupWithImage extends Popup {
  constructor(popupSelector) {
    super(popupSelector);
    this._img = document.querySelector(`.${this._popupSelector}`).querySelector('img');
    this._name = document.querySelector(`.${this._popupSelector}`).querySelector('h2');
  }

  open(link, name) {
    super.open();
    this._img.src = link;
    this._name.textContent = name;
    this._img.alt = name;
  }
}