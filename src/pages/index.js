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
  popupAddImgSelector,
  popupProfileSelector,
  popupViewSelector,
  profileTitle,
  profileSubtitle,
  popupDeleteSelector
} from '../scripts/utils/constants.js';
import PopupWithForm from '../scripts/components/PopupWithForm.js';
import Api from '../scripts/components/api';
import PopupCardDelete from '../scripts/components/PopupCardDelete';

const api = new Api('cohort-12', 'e346800a-2f73-4d6f-bc1a-ba9dbf84295f');
api.fetchAuthorization();

const popupProfileValidation = new FormValidator(popupFormProfile, formObject);
popupProfileValidation.enableValidation();

const popupImgValidation = new FormValidator(popupFormImg, formObject);
popupImgValidation.enableValidation();

const showUserInfo = new UserInfo({name: profileTitle, info: profileSubtitle});
api.getUserInfoServ().then(({name, about, avatar}) => {
  showUserInfo.setUserInfo({name, info: about, avatar});
});

const popupCardDelete = new PopupCardDelete(popupDeleteSelector, function () {
  popupCardDelete.close();
});

const popupProfileForm = new PopupWithForm(popupProfileSelector, function (inputValues) {
  showUserInfo.setUserInfo({
    name: inputValues.name,
    info: inputValues.info,
  });
  api.editProfileInfo(inputValues.name, inputValues.info);
});

const popupWithImg = new PopupWithImage(popupViewSelector);

const createCards = new Section({
  renderer: (data) => {
    const {link, name, likes, owner, _id} = data;
    const card = new Card(link, name, likes, owner, _id, cardListSelector, () => {
      popupWithImg.open(link, name);
    }, () => {
      popupCardDelete.open(() => {
        api.deleteCardServ(_id)
          .then(() => card.removeCard());
      });
    }, () => {
         api.addLikeServ(_id).then((data) => {
           console.log(data.likes);
           card.setCounterInfo(data.likes);
          }); 
    });
    api.getUserInfoServ().then(({_id}) => card.checkCardId(_id));
    const cardElement = card.generateCard();
    createCards.addItem(cardElement);
    return card;
  }
}, containerSelector);
api.getCardsInfo().then(data => createCards.renderItems(data));

const popupImgForm = new PopupWithForm(popupAddImgSelector, function (inputValue) {
  api.addNewCard(inputValue).then(data => createCards.renderItems([data]));
});

editButton.addEventListener('click', () => {
  const data = showUserInfo.getUserInfo();
  popupProfileForm.open({
    'profile-first': data.name,
    'profile-second': data.info,
  });
});

addButton.addEventListener('click', () => popupImgForm.open());
