export class Card {
  constructor(link, name, likes, owner, _id, template, onCardClick, onDeleteClick, onLikeClick) {
    this._name = name;
    this._link = link;
    this._cardProfileId = owner._id;
    this._template = template;
    this._onCardClick = onCardClick;
    this._onDeleteClick = onDeleteClick;
    this._onLikeClick = onLikeClick;
    this._count = likes;
    this._handleCardClick = this._handleCardClick.bind(this);
    this._likeActive = this._likeActive.bind(this);
    this.removeCard = this.removeCard.bind(this);
    this._handleCardDelete = this._handleCardDelete.bind(this);
    this._handleLikeClick = this._handleLikeClick.bind(this);
  }
  
  _handleLikeClick(evt) {
    this._onLikeClick();
    this._likeActive(evt);
  }

  _handleCardClick() {
    this._onCardClick(this._link, this._name);
  }

  _handleCardDelete() {
    this._onDeleteClick();
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

  removeCard() {
    this._image.removeEventListener('click', this._handleCardClick);
    this._icon.removeEventListener('click', this._handleLikeClick);
    this._trash.removeEventListener('click', this._handleCardDelete);
    this._image.parentNode.remove();
  }

  _setEventListeners() {
    this._image.addEventListener('click', this._handleCardClick);
    this._icon.addEventListener('click', this._handleLikeClick);
    this._trash.addEventListener('click', this._handleCardDelete);
  }

  checkCardId(data) {
    if (this._cardProfileId !== data) {
      this._trash.classList.add('element__trash_hidden');
    }
  }

  setCounterInfo(data) {
    this._counter.textContent = data.length;
  }

  generateCard() {
    this._element = this._getTemplate();
    this._image = this._element.querySelector('.element__image');
    this._counter = this._element.querySelector('.element__counter');
    this._icon = this._element.querySelector('.element__icon');
    this._trash = this._element.querySelector('.element__trash');
    this._element.querySelector('.element__image').src = this._link;
    this._element.querySelector('.element__image').alt = this._name;
    this._element.querySelector('.element__title').textContent = this._name;
    this.setCounterInfo(this._count);
    this._setEventListeners();

    return this._element;
  }
}
