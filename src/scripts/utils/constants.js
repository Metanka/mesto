export const viewImg = document.querySelector('.popup__img');
export const viewName = document.querySelector('.popup__name');
export const editButton = document.querySelector('.edit-button');
export const addButton = document.querySelector('.add-button');
export const popupFormProfile = document.querySelector('.popup__container_profile');
export const popupFormImg = document.querySelector('.popup__container_img');
export const cardListSelector = '#card';
export const containerSelector = '.elements';
export const popupProfileSelector = 'popup_profile';
export const popupAddImgSelector = 'popup_add-img';
export const popupViewSelector = 'popup_view';
export const profileTitle = 'profile__title';
export const profileSubtitle = 'profile__subtitle';
export const formObject = {
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__btn',
  inactiveButtonClass: 'popup__btn_inactive',
  inputErrorClass: 'popup__input_error',
  errorClass: 'popup__input_text_error'
};
export const initialCards = [
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