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

function togglePopup(popup) {
  popup.classList.toggle('popup_hidden');
}

function formProfileSubmit (evt) {
    evt.preventDefault(); 
    profileTitle.textContent = nameInput.value;
    profileSubtitle.textContent = jobInput.value; 
    togglePopup(popupProfile);
}

function editProfile () {
  togglePopup(popupProfile);
  nameInput.value = profileTitle.textContent;
  jobInput.value = profileSubtitle.textContent;
}


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

function likeActive (evt) {
  evt.target.classList.toggle('element__icon_active');
}
//callback для зума картинки
function newCard (evt) {
  const card = evt.target.parentNode;
  const elementTitle = card.querySelector('.element__title');
  viewImg.src = evt.target.src;
  viewName.textContent = elementTitle.textContent;
  togglePopup(popupView);
}

function removeCard (evt) {
  const card = evt.target.parentNode;
  const like = card.querySelector('.element__icon');
  const elementImg = card.querySelector('.element__image');

  like.removeEventListener('click', likeActive);
  elementImg.removeEventListener('click', newCard);

  card.remove();
}

function createCard (name, link) {
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

function addCard (card) {
  const elements = document.querySelector('.elements'); 
  elements.prepend(card);
}

//создание одиночной карточки из формы
function formImgSubmit (evt) {
  evt.preventDefault();
  const name = placeInput.value;
  const link = imgInput.value;
  const card = createCard(name, link);
  addCard(card);
  togglePopup(popupAddImg);
  placeInput.value = '';
  imgInput.value = '';
}
//создание карточек из массива
function initCards () {
  for (let i = 0; i < initialCards.length; i++) {
    const name = initialCards[i].name;
    const link = initialCards[i].link;
    const card = createCard(name, link);
    addCard(card);
  }
}

initCards();

editButton.addEventListener('click', editProfile);
popupCloseProfile.addEventListener('click', () => togglePopup(popupProfile));
popupCloseAddImg.addEventListener('click', () => togglePopup(popupAddImg));
btnCloseView.addEventListener('click', () => togglePopup(popupView));
popupFormProfile.addEventListener('submit', formProfileSubmit);
popupFormImg.addEventListener('submit', formImgSubmit);
addButton.addEventListener('click', function () {
  togglePopup(popupAddImg);
});