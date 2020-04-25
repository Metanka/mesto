const popupProfile = document.querySelector('.popup_profile');
const popupAddImg = document.querySelector('.popup_add-img');
const editButton = document.querySelector('.edit-button');
const addButton = document.querySelector('.add-button');
const popupForm = document.querySelector('.popup__container');
const popupCloseProfile = popupProfile.querySelector('.popup__close');
const popupCloseAddImg = popupAddImg.querySelector('.popup__close');
const nameInput = document.querySelector('.popup__input_type-name');
const jobInput = document.querySelector('.popup__input_type-job');
const placeInput = document.querySelector('.popup__input_type-place');
const imgInput = document.querySelector('.popup__input_type-img');
const profileTitle = document.querySelector('.profile__title');
const profileSubtitle = document.querySelector('.profile__subtitle');
const elements = document.querySelector('.elements');

function formProfileSubmitHandler (evt) {
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

popupForm.addEventListener('submit', formProfileSubmitHandler);

editButton.addEventListener('click', function () {
  changeClassPopupHidden(popupProfile);
  nameInput.value = profileTitle.textContent;
  jobInput.value = profileSubtitle.textContent;
});

addButton.addEventListener('click', function () {
  changeClassPopupHidden(popupAddImg);
});



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

/*initialCards.forEach(function(item, i, initialCards) {
  addCard();
});*/


const addCard = function(i) {
    const elementTemplate = document.querySelector('#card').content;
    const elementCard = elementTemplate.cloneNode(true);
    const elementTitle = elementCard.querySelector('.element__title');
    const elementImage = elementCard.querySelector('.element__image');  
    elementTitle.textContent = initialCards[i].name;
      elementImage.src = initialCards[i].link;
      elementImage.setAttribute('alt', `Изображение ${i}`); 
    
    console.log({elementCard});
    elements.append(elementCard);
};
for (let i = 0; i < initialCards.length; i++) {
  addCard(i);
}
