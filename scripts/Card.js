import {openPopup} from './script.js';

const popupView = document.querySelector('.popup_view');
const viewImg = document.querySelector('.popup__img');
const viewName = document.querySelector('.popup__name');

export class Card {
  constructor (link, name, template) {
    this._name = name;
    this._link = link;
    this._template = template;
  }

  _getTemplate() {
    const cardElement = document
    .querySelector(this._template)
    .content
    .cloneNode(true);
    return cardElement;
  }

  _handleOpenPopup() {
    viewImg.src = this._link;
    viewName.textContent = this._name;
    openPopup(popupView);
  }

  _likeActive(evt) {
    evt.target.classList.toggle('element__icon_active');
  }
  
  _removeCard(evt) {
    evt.target.parentNode.remove();
  }
  
  _setEventListeners () {
    this._element.querySelector('.element__image').addEventListener('click', () => {
     this._handleOpenPopup();
    });
    this._element.querySelector('.element__icon').addEventListener('click', (evt) => {
      this._likeActive(evt);
    });
    this._element.querySelector('.element__trash').addEventListener('click', (evt) => {
      this._removeCard(evt);
    });
  }

  generateCard() {
    this._element = this._getTemplate();
    this._element.querySelector('.element__image').src = this._link;
    this._element.querySelector('.element__title').textContent = this._name;
    this._setEventListeners();

    return this._element;
  }
}