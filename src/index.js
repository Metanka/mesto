import '../pages/index.css'; 
import {Card} from '../scripts/components/Card.js';
import { FormValidator } from '../scripts/components/FormValidator.js';
import Section from '../scripts/components/Section.js';
import {
  profileTitle,
  profileSubtitle,
  nameInput,
  jobInput,
  popupProfile,
  imgInput,
  placeInput,
  elements,
  editButton,
  popupCloseView,
  popupCloseProfile,
  popupCloseAddImg,
  popupFormProfile,
  popupFormImg,
  addButton,
  formObject,
  popupView,
  popupAddImg,
  cardListSelector,
  containerSelector
} from '../scripts/utils/constants.js';

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
popupCloseView.addEventListener('click', () => closePopup(popupView));
popupFormProfile.addEventListener('submit', formProfileSubmit);
popupFormImg.addEventListener('submit', formImgSubmit);
addButton.addEventListener('click', () => openPopup(popupAddImg));

/*initialCards.forEach((item) => {
  const card = new Card(item.link, item.name, '#card');
  const cardElement = card.generateCard();
  elements.prepend(cardElement);
});*/

//изменения тут
const createCards = new Section({
  items: initialCards,
  renderer: (item) => {
    const card = new Card(item.link, item.name, cardListSelector);
    const cardElement = card.generateCard();
    createCards.addItem(cardElement);
  }
}, containerSelector);
createCards.renderItems();

const popupProfileValidation = new FormValidator(popupFormProfile, formObject);
popupProfileValidation.enableValidation();

const popupImgValidation = new FormValidator(popupFormImg, formObject);
popupImgValidation.enableValidation();
