

const popupProfile = document.querySelector('.popup_profile');
const popupAddImg = document.querySelector('.popup_add-img');
const editButton = document.querySelector('.edit-button');
const addButton = document.querySelector('.add-button');
const popupFormProfile = document.querySelector('.popup__container_profile');
const popupFormImg = document.querySelector('.popup__container_img');
const popupCloseProfile = popupProfile.querySelector('.btn-close');
const popupCloseAddImg = popupAddImg.querySelector('.btn-close');
const nameInput = document.querySelector('.popup__input_type-name');
const jobInput = document.querySelector('.popup__input_type-job');
const placeInput = document.querySelector('.popup__input_type-place');
const imgInput = document.querySelector('.popup__input_type-img');
const profileTitle = document.querySelector('.profile__title');
const profileSubtitle = document.querySelector('.profile__subtitle');
const popupView = document.querySelector('.popup_view');
const viewImg = document.querySelector('.popup__img');
const viewName = document.querySelector('.popup__name');
const btnCloseView = popupView.querySelector('.btn-close');
const elements = document.querySelector('.elements');

const initialCards = [
  {
    name: 'Архыз',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
  },
  {
    name: 'Челябинская область',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
  },
  {
    name: 'Иваново',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
  },
  {
    name: 'Камчатка',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
  },
  {
    name: 'Холмогорский район',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
  },
  {
    name: 'Байкал',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
  }
];

let openedPopup = null;
let removeOpenPopupListeners = null;

function closePopup() {
  openedPopup.classList.add('popup_hidden');
  removeOpenPopupListeners();
}

function targetOverlay(evt) {
  const target = evt.target;
  if (target.classList.contains('popup')) {
    closePopup();
  }
}

function keyHandler(evt) {
  if (evt.keyCode === 27) {
    closePopup();
  }
}

function openPopup(popup) {
  popup.classList.remove('popup_hidden');
  document.addEventListener('keydown', keyHandler);
  popup.addEventListener('mousedown', targetOverlay);

  openedPopup = popup;
  removeOpenPopupListeners = () => {
    document.removeEventListener('keydown', keyHandler);
    popup.removeEventListener('mousedown', targetOverlay);
    openedPopup = null;
    removeOpenPopupListeners = null;
  };
}

function formProfileSubmit(evt) {
  evt.preventDefault();
  profileTitle.textContent = nameInput.value;
  profileSubtitle.textContent = jobInput.value;
  closePopup(popupProfile);
}

function editProfile() {
  nameInput.setValue(profileTitle.textContent);
  jobInput.setValue(profileSubtitle.textContent);
  openPopup(popupProfile);
}

function likeActive(evt) {
  evt.target.classList.toggle('element__icon_active');
}
//callback для зума картинки
function newCard(evt) {
  const card = evt.target.closest('.element');
  const elementTitle = card.querySelector('.element__title');
  viewImg.src = evt.target.src;
  viewName.textContent = elementTitle.textContent;
  openPopup(popupView);
}

function removeCard(evt) {
  const card = evt.target.closest('.element');
  const like = card.querySelector('.element__icon');
  const elementImg = card.querySelector('.element__image');
  const delCard = card.querySelector('.element__trash');

  like.removeEventListener('click', likeActive);
  elementImg.removeEventListener('click', newCard);
  delCard.removeEventListener('click', removeCard);

  card.remove();
}

function createCard(name, link) {
  const cardTemplate = document.querySelector('#card').content;
  const card = cardTemplate.cloneNode(true);
  const elementTitle = card.querySelector('.element__title');
  const elementImg = card.querySelector('.element__image');
  const like = card.querySelector('.element__icon');
  const delCard = card.querySelector('.element__trash');

  elementTitle.textContent = name;
  elementImg.src = link;
  elementImg.alt = name;
  like.addEventListener('click', likeActive);
  elementImg.addEventListener('click', newCard);
  delCard.addEventListener('click', removeCard);

  return card;
}

function addCard(name, link) {
  const card = createCard(name, link);
  elements.prepend(card);
}

//создание одиночной карточки из формы
function formImgSubmit(evt) {
  evt.preventDefault();
  const name = placeInput.value;
  const link = imgInput.value;
  addCard(name, link);
  openPopup(popupAddImg);
  placeInput.value = '';
  imgInput.value = '';
  closePopup();
}

//создание карточек из массива
function initCards() {
  initialCards.forEach(({name, link}) => {
    addCard(name, link);
  });
}

initCards();

editButton.addEventListener('click', editProfile);
popupCloseProfile.addEventListener('click', () => closePopup(popupProfile));
popupCloseAddImg.addEventListener('click', () => closePopup(popupAddImg));
btnCloseView.addEventListener('click', () => closePopup(popupView));
popupFormProfile.addEventListener('submit', formProfileSubmit);
popupFormImg.addEventListener('submit', formImgSubmit);
addButton.addEventListener('click', () => openPopup(popupAddImg));