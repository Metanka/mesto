import EventListener from './EventListener';

export class Card extends EventListener {
  constructor(link, name, template, handleCardClick) {
    super();
    this._name = name;
    this._link = link;
    this._template = template;
    this._handleCardClick = handleCardClick;
  }

  _getTemplate() {
    const cardElement = document
      .querySelector(this._template)
      .content
      .cloneNode(true);
    return cardElement;
  }

  _likeActive(evt) {
    evt.target.classList.toggle('element__icon_active');
  }

  _removeCard(evt) {
    this._removeListeners();
    evt.target.parentNode.remove();
  }

  _setEventListeners() {
    this._addListener(this._image, 'click', () => this._handleCardClick());
    this._addListener(this._icon, 'click', (evt) => this._likeActive(evt));
    this._addListener(this._trash, 'click', (evt) => this._removeCard(evt));
  }

  generateCard() {
    this._element = this._getTemplate();
    this._image = this._element.querySelector('.element__image');
    this._icon = this._element.querySelector('.element__icon');
    this._trash = this._element.querySelector('.element__trash');
    this._element.querySelector('.element__image').src = this._link;
    this._element.querySelector('.element__image').alt = this._name;
    this._element.querySelector('.element__title').textContent = this._name;
    this._setEventListeners();

    return this._element;
  }
}
