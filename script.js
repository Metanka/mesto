const popup = document.querySelector('.popup');
const editButton = document.querySelector('.edit-button');
const addButton = document.querySelector('.add-button');
const popupForm = popup.querySelector('.popup__container');
const popupClose = popup.querySelector('.popup__close');


editButton.addEventListener('click', function () {
  popup.classList.toggle('popup_hidden');
});

popupClose.addEventListener('click', function() {
  popup.classList.toggle('popup_hidden');
});

function formSubmitHandler (evt) {
    evt.preventDefault(); 

    let nameInput = document.querySelector('.popup__input_type-name');
    let jobInput = document.querySelector('.popup__input_type-job');

    let profileTitle = document.querySelector('.profile__title');
    let profileSubtitle = document.querySelector('.profile__subtitle');
    
    profileTitle.textContent = nameInput.value;
    profileSubtitle.textContent = jobInput.value; 
    popup.classList.toggle('popup_hidden');

}

popupForm.addEventListener('submit', formSubmitHandler);