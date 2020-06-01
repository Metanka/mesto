import {Card, elements} from './Card.js';
import { FormValidator } from './FormValidator.js';

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
const formObject = {
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__btn',
  inactiveButtonClass: 'popup__btn_inactive',
  inputErrorClass: 'popup__input_error',
  errorClass: 'popup__input_text_error'
};

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
  if (evt.key === 'Escape') {
    closePopup();
  }
}

export function openPopup(popup) {
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
  closePopup();
}

function editProfile() {
  nameInput.setValue(profileTitle.textContent);
  jobInput.setValue(profileSubtitle.textContent);
  openPopup(popupProfile);
}

//создание одиночной карточки из формы
function formImgSubmit(evt) {
  evt.preventDefault();
  const card = new Card(imgInput.value, placeInput.value, '#card');
  const cardElement = card.generateCard();
  elements.prepend(cardElement);
  placeInput.value = '';
  imgInput.value = '';
  closePopup();
}

editButton.addEventListener('click', editProfile);
popupCloseProfile.addEventListener('click', () => closePopup(popupProfile));
popupCloseAddImg.addEventListener('click', () => closePopup(popupAddImg));
popupFormProfile.addEventListener('submit', formProfileSubmit);
popupFormImg.addEventListener('submit', formImgSubmit);
addButton.addEventListener('click', () => openPopup(popupAddImg));

initialCards.forEach((item) => {
  const card = new Card(item.link, item.name, '#card');
  const cardElement = card.generateCard();
  elements.prepend(cardElement);
});

const popupProfileValide = new FormValidator(popupFormProfile, formObject);
popupProfileValide.enableValidation();

const popupImgValidate = new FormValidator(popupFormImg, formObject);
popupImgValidate.enableValidation();
