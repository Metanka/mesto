import './index.css';
import {Card} from '../scripts/components/Card';
import {FormValidator} from '../scripts/components/FormValidator.js';
import Section from '../scripts/components/Section.js';
import PopupWithImage from '../scripts/components/PopupWithImage.js';
import UserInfo from '../scripts/components/UserInfo.js';
import {
  editButton,
  popupFormProfile,
  popupFormImg,
  addButton,
  formObject,
  cardListSelector,
  containerSelector,
  initialCards,
  popupAddImgSelector,
  popupProfileSelector,
  popupViewSelector,
  profileTitle,
  profileSubtitle
} from '../scripts/utils/constants.js';
import PopupWithForm from '../scripts/components/PopupWithForm.js';

const popupProfileValidation = new FormValidator(popupFormProfile, formObject);
popupProfileValidation.enableValidation();

const popupImgValidation = new FormValidator(popupFormImg, formObject);
popupImgValidation.enableValidation();

const showUserInfo = new UserInfo({name: profileTitle, info: profileSubtitle});

const popupProfileForm = new PopupWithForm(popupProfileSelector, function (inputValues) {
  showUserInfo.setUserInfo({
    name: inputValues.name,
    info: inputValues.info,
  });
});

const popupWithImg = new PopupWithImage(popupViewSelector);

const createCards = new Section({
  renderer: ({link, name}) => {
    const card = new Card(link, name, cardListSelector, function () {
      popupWithImg.open(link, name);
    });
    const cardElement = card.generateCard();
    createCards.addItem(cardElement);
  }
}, containerSelector);
createCards.renderItems(initialCards);

const popupImgForm = new PopupWithForm(popupAddImgSelector, function (inputValue) {
  createCards.renderItems([inputValue]);
});

editButton.addEventListener('click', () => {
  const data = showUserInfo.getUserInfo();
  popupProfileForm.open({
    'profile-first': data.name,
    'profile-second': data.info,
  });
});

addButton.addEventListener('click', () => popupImgForm.open());
