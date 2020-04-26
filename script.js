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


function formProfileSubmit (evt) {
    evt.preventDefault(); 
    profileTitle.textContent = nameInput.value;
    profileSubtitle.textContent = jobInput.value; 
    changeClassPopupHidden(popupProfile);
}

function changeClassPopupHidden(popup) {
  popup.classList.toggle('popup_hidden');
}

popupCloseProfile.addEventListener('click', () => changeClassPopupHidden(popupProfile));
popupCloseAddImg.addEventListener('click', () => changeClassPopupHidden(popupAddImg));
popupFormProfile.addEventListener('submit', formProfileSubmit);

editButton.addEventListener('click', function () {
  changeClassPopupHidden(popupProfile);
  nameInput.value = profileTitle.textContent;
  jobInput.value = profileSubtitle.textContent;
});

addButton.addEventListener('click', function () {
  changeClassPopupHidden(popupAddImg);
});

function formImgSubmit (evt) {
  evt.preventDefault();
  const name = placeInput.value;
  const link = imgInput.value;
  addCard(name, link);
  changeClassPopupHidden(popupAddImg);
  placeInput.value = '';
  imgInput.value = '';
}

popupFormImg.addEventListener('submit', formImgSubmit);

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

function addCard (name, link) {
  const cardTemplate = document.querySelector('#card').content;
  const card = cardTemplate.cloneNode(true);
  const elementTitle = card.querySelector('.element__title');
  const elementImg = card.querySelector('.element__image');
  const like = card.querySelector('.element__icon');
  const elements = document.querySelector('.elements');
  const delCard = card.querySelector('.element__trash');
  elementTitle.textContent = name;
  elementImg.src = link;
  like.addEventListener('click', (evt) => evt.target.classList.toggle('element__icon_active'));
  delCard.addEventListener('click', (evt) => evt.target.parentNode.remove());
  elements.prepend(card);
}

for (let i = 0; i < initialCards.length; i++) {
  const name = initialCards[i].name;
  const link = initialCards[i].link;
  addCard(name, link);
}