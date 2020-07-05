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
  popupDeleteSelector,
  popupAvatarSelector,
  editAvatar,
  popupFormAvatar,
  avatar
} from '../scripts/utils/constants.js';
import PopupWithForm from '../scripts/components/PopupWithForm.js';
import Api from '../scripts/components/Api';
import PopupCardDelete from '../scripts/components/PopupCardDelete';

const api = new Api({
  baseUrl: 'https://mesto.nomoreparties.co/v1/cohort-12',
  headers: {
    authorization: 'e346800a-2f73-4d6f-bc1a-ba9dbf84295f',
    'Content-Type': 'application/json'
  }
});
api.fetchAuthorization().then(res => {
  return res;
})
.catch(err => console.log(`Ошибка: ${err}`));

const popupProfileValidation = new FormValidator(popupFormProfile, formObject);
popupProfileValidation.enableValidation();

const popupImgValidation = new FormValidator(popupFormImg, formObject);
popupImgValidation.enableValidation();

const popupAvatarValidation = new FormValidator(popupFormAvatar, formObject);
popupAvatarValidation.enableValidation();

const showUserInfo = new UserInfo({name: profileTitle, info: profileSubtitle}, avatar);
api.getInfoUser().then(({name, about, avatar}) => {
  showUserInfo.setUserInfo({name, info: about});
  showUserInfo.setUserAvatar({avatar});
})
.catch(err => console.log(`Ошибка: ${err}`));

const popupAvatar = new PopupWithForm(popupAvatarSelector, (inputValue) => {
  popupAvatar._renderLoading(true);
  showUserInfo.setUserAvatar(inputValue);
  api.changeAvatar(inputValue).catch(err => console.log(`Ошибка: ${err}`));
});

const popupCardDelete = new PopupCardDelete(popupDeleteSelector, function () {
  popupCardDelete.close();
});

const popupProfileForm = new PopupWithForm(popupProfileSelector, function (inputValues) {
  popupProfileForm._renderLoading(true);
  showUserInfo.setUserInfo({
    name: inputValues.name,
    info: inputValues.info,
  });
  api.editProfileInfo(inputValues.name, inputValues.info)
  .catch(err => console.log(`Ошибка: ${err}`));
});

const popupWithImg = new PopupWithImage(popupViewSelector);

const createCards = new Section({
  renderer: (data) => {
    const {link, name, likes, owner, _id} = data;
    const card = new Card(link, name, likes, owner, _id, cardListSelector, () => {
      popupWithImg.open(link, name);
    }, () => {
      popupCardDelete.open(() => {
        api.deleteCard(_id)
          .then(() => card.removeCard())
          .catch(err => console.log(`Ошибка: ${err}`));
      });
    }, () => {
      api.addLike(_id).then((data) => {
        card.setCounterInfo(data.likes);
      })
      .catch(err => console.log(`Ошибка: ${err}`));
    }, () => {
      api.deleteLike(_id).then((data) => {
        card.setCounterInfo(data.likes);
      })
      .catch(err => console.log(`Ошибка: ${err}`));
    }, api.getInfoUser());
    api.getInfoUser().then(({_id}) => card.checkCardId(_id))
    .catch(err => console.log(`Ошибка: ${err}`));
    const cardElement = card.generateCard();
    createCards.addItem(cardElement);
    return card;
  }
}, containerSelector);
api.getCardsInfo().then(data => createCards.renderItems(data))
.catch(err => console.log(`Ошибка: ${err}`));

const popupImgForm = new PopupWithForm(popupAddImgSelector, function (inputValue) {
  api.addNewCard(inputValue).then(data => createCards.renderItems([data]))
  .catch(err => console.log(`Ошибка: ${err}`));
});

editButton.addEventListener('click', () => {
  const data = showUserInfo.getUserInfo();
  popupProfileForm.open({
    'profile-first': data.name,
    'profile-second': data.info,
  });
});

editAvatar.addEventListener('click', () => popupAvatar.open());

addButton.addEventListener('click', () => popupImgForm.open());
