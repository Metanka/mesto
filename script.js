const popup = document.querySelector('.popup');
const editButton = document.querySelector('.edit-button');
const addButton = document.querySelector('.add-button');
const popupForm = popup.querySelector('.popup__container');
const popupClose = popup.querySelector('.popup__close');
const nameInput = document.querySelector('.popup__input_type-name');
const jobInput = document.querySelector('.popup__input_type-job');
const profileTitle = document.querySelector('.profile__title');
const profileSubtitle = document.querySelector('.profile__subtitle');
const elements = document.querySelector('.elements');

function formSubmitHandler (evt) {
    evt.preventDefault(); 

    profileTitle.textContent = nameInput.value;
    profileSubtitle.textContent = jobInput.value; 
    changeClassPopupHidden();
}

function changeClassPopupHidden() {
  popup.classList.toggle('popup_hidden')
}

popupClose.addEventListener('click', changeClassPopupHidden);
popupForm.addEventListener('submit', formSubmitHandler);
editButton.addEventListener('click', function () {
  changeClassPopupHidden();
  nameInput.value = profileTitle.textContent;
  jobInput.value = profileSubtitle.textContent;
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
    
    console.log({elementCard})
    elements.append(elementCard);
};
for (let i = 0; i < initialCards.length; i++) {
  addCard(i);
};
