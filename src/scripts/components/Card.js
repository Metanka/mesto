export class Card {
  constructor(link, name, template, onCardClick) {
    this._name = name;
    this._link = link;
    this._template = template;
    this._onCardClick = onCardClick;
    this._handleCardClick = this._handleCardClick.bind(this);
    this._likeActive = this._likeActive.bind(this);
    this._removeCard = this._removeCard.bind(this);
  }

  _handleCardClick() {
    this._onCardClick(this._link, this._name);
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
    this._image.removeEventListener('click', this._handleCardClick);
    this._icon.removeEventListener('click', this._likeActive);
    this._trash.removeEventListener('click', this._removeCard);
    evt.target.parentNode.remove();
  }

  _setEventListeners() {
    this._image.addEventListener('click', this._handleCardClick);
    this._icon.addEventListener('click', this._likeActive);
    this._trash.addEventListener('click', this._removeCard);
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
