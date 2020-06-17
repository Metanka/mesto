import '../pages/index.css'; 
import {Card} from '../scripts/components/Card.js';
import { FormValidator } from '../scripts/components/FormValidator.js';
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
  initialCards
} from '../scripts/utils/constants.js';
import PopupWithForm from '../scripts/components/PopupWithForm.js';

const showUserInfo = new UserInfo({name: 'profile__title', info: 'profile__subtitle'});

const popupProfileForm = new PopupWithForm ('popup_profile', function (inputValues) {
  showUserInfo.setUserInfo({
    name: inputValues['profile-first'],
    info: inputValues['profile-second'],
  });
  this.close();
});

const popupImgForm = new PopupWithForm ('popup_add-img', function (inputValues) {
  const createCard = new Section({
    items: inputValues,
    renderer: (item) => {
      const card = new Card(item['add-img-second'], item['add-img-first'], cardListSelector, function () {
        const popupWithImg = new PopupWithImage ('popup_view');
        popupWithImg.open(this._link, this._name);
      });
      const cardElement = card.generateCard();
      createCard.addItem(cardElement);
    }
  }, containerSelector);
  createCard.renderItems();
  this.close();
});

const createCards = new Section({
  items: initialCards,
  renderer: (item) => {
    const card = new Card(item.link, item.name, cardListSelector, function () {
      const popupWithImg = new PopupWithImage ('popup_view');
      popupWithImg.open(this._link, this._name);
    });
    const cardElement = card.generateCard();
    createCards.addItem(cardElement);
  }
}, containerSelector);
createCards.renderItems();


const popupProfileValidation = new FormValidator(popupFormProfile, formObject);
popupProfileValidation.enableValidation();

const popupImgValidation = new FormValidator(popupFormImg, formObject);
popupImgValidation.enableValidation();

editButton.addEventListener('click', () => {
  const data = showUserInfo.getUserInfo();
  popupProfileForm.open({
    'profile-first': data.name,
    'profile-second': data.info,
  });
});

addButton.addEventListener('click', () => popupImgForm.open());


