export const popupView = document.querySelector('.popup_view');
export const viewImg = document.querySelector('.popup__img');
export const viewName = document.querySelector('.popup__name');
export const elements = document.querySelector('.elements');
export const popupProfile = document.querySelector('.popup_profile');
export const popupAddImg = document.querySelector('.popup_add-img');
export const editButton = document.querySelector('.edit-button');
export const addButton = document.querySelector('.add-button');
export const popupFormProfile = document.querySelector('.popup__container_profile');
export const popupFormImg = document.querySelector('.popup__container_img');
export const popupCloseProfile = popupProfile.querySelector('.btn-close');
export const popupCloseAddImg = popupAddImg.querySelector('.btn-close');
export const popupCloseView = document.querySelector('.btn-close_place-view');
export const nameInput = document.querySelector('.popup__input_type-name');
export const jobInput = document.querySelector('.popup__input_type-job');
export const placeInput = document.querySelector('.popup__input_type-place');
export const imgInput = document.querySelector('.popup__input_type-img');
export const profileTitle = document.querySelector('.profile__title');
export const profileSubtitle = document.querySelector('.profile__subtitle');
export const cardListSelector = '#card';
export const containerSelector = '.elements';
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